from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import hashlib
import os
import logging
import google.generativeai as genai
import requests
from dotenv import load_dotenv

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# MongoDB setup
MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    logger.error("MONGO_URI not found in environment variables")
client = MongoClient(MONGO_URI)

db = client['user_db']
users_collection = db['users']

# Google Gemini AI setup
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    logger.error("GEMINI_API_KEY not found in environment variables")
genai.configure(api_key=GEMINI_API_KEY)

# OpenWeather API setup
OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")
if not OPENWEATHER_API_KEY:
    logger.error("OPENWEATHER_API_KEY not found in environment variables")
WEATHER_API_URL = "http://api.openweathermap.org/data/2.5/weather"

# ------------------- User Authentication Endpoints -------------------

@app.route('/register', methods=['POST'])
def register():
    """
    Register a new user with username, email, and password.
    Returns success message or error if user exists or fields are missing.
    """
    try:
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        if not all([username, email, password]):
            return jsonify({'detail': 'Missing username, email, or password'}), 400

        if users_collection.find_one({'email': email}):
            return jsonify({'detail': 'User with this email already exists'}), 400

        hashed_password = hashlib.sha256(password.encode()).hexdigest()
        user = {'username': username, 'email': email, 'password': hashed_password}
        result = users_collection.insert_one(user)
        logger.info(f"User registered: {result.inserted_id}")

        return jsonify({'msg': 'Registered successfully', 'user': {'username': username, 'email': email}}), 201

    except Exception as e:
        logger.error(f"Register error: {str(e)}")
        return jsonify({'detail': 'Internal server error'}), 500

@app.route('/login', methods=['POST'])
def login():
    """
    Authenticate a user with email and password.
    Returns success message with user details or error for invalid credentials.
    """
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not all([email, password]):
            return jsonify({'detail': 'Missing email or password'}), 400

        hashed_password = hashlib.sha256(password.encode()).hexdigest()
        user = users_collection.find_one({'email': email, 'password': hashed_password})

        if user:
            return jsonify({'msg': 'Login successful', 'user': {'username': user['username'], 'email': user['email']}}), 200
        else:
            return jsonify({'detail': 'Invalid email or password'}), 401

    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        return jsonify({'detail': 'Internal server error'}), 500

# ------------------- Chat Endpoint -------------------

@app.route('/api/chat', methods=['POST'])
def chat():
    """
    Handle chat requests using Google Gemini AI model.
    Returns AI-generated response or error if prompt is missing.
    """
    try:
        data = request.get_json()
        prompt = data.get("prompt", "")

        if not prompt:
            return jsonify({"error": "Prompt is required"}), 400

        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt)
        bot_text = response.text if hasattr(response, "text") else ""

        return jsonify({"output": bot_text}), 200

    except Exception as e:
        logger.error(f"Chat API error: {str(e)}")
        return jsonify({"error": str(e)}), 500

# ------------------- Weather Endpoint -------------------

@app.route('/api/weather', methods=['POST'])
def get_weather():
    """
    Fetch real-time weather data for a given location using OpenWeatherMap API.
    Returns temperature, humidity, and weather description.
    """
    try:
        data = request.get_json()
        location = data.get('location', '')

        if not location:
            return jsonify({"error": "Location is required"}), 400

        params = {'q': location, 'appid': OPENWEATHER_API_KEY, 'units': 'metric'}
        response = requests.get(WEATHER_API_URL, params=params)
        response.raise_for_status()
        weather_data = response.json()

        temp = weather_data['main']['temp']
        humidity = weather_data['main']['humidity']
        weather_desc = weather_data['weather'][0]['description']

        return jsonify({'temperature': temp, 'humidity': humidity, 'description': weather_desc}), 200

    except Exception as e:
        logger.error(f"Weather API error: {str(e)}")
        return jsonify({"error": "Failed to fetch weather data"}), 500

# ------------------- Irrigation Prediction Endpoint -------------------

@app.route('/api/irrigation', methods=['POST'])
def predict_irrigation():
    """
    Predict irrigation needs based on soil type, crop type, location, and weather.
    Uses real-time weather data if location is provided, otherwise defaults.
    """
    try:
        data = request.get_json()
        soil_type = data.get('soilType', 'loamy')
        crop_type = data.get('cropType', 'rice')
        location = data.get('location', '')
        temperature = data.get('temperature', 25)
        humidity = data.get('humidity', 60)

        # Fetch real-time weather if location provided
        weather_data = {'temperature': temperature, 'humidity': humidity}
        if location:
            weather_response = requests.get(WEATHER_API_URL, params={
                'q': location,
                'appid': OPENWEATHER_API_KEY,
                'units': 'metric'
            })
            if weather_response.status_code == 200:
                weather_data = weather_response.json()['main']

        # Simple rule-based logic
        water_need = 500  # Base liters per acre
        if soil_type == "sandy": water_need += 200
        if weather_data['temperature'] > 30: water_need += 100
        if weather_data['humidity'] < 50: water_need += 150
        if crop_type.lower() == "rice": water_need *= 1.5

        alert_msg = "High temp alert: Increase watering" if weather_data['temperature'] > 35 else "Normal conditions"

        prediction = {
            'waterNeed': f"{water_need} liters/acre",
            'frequency': "Every 3-5 days",
            'alert': alert_msg,
        }

        return jsonify(prediction), 200

    except Exception as e:
        logger.error(f"Irrigation prediction error: {str(e)}")
        return jsonify({"error": "Prediction failed"}), 500
    

@app.route('/api/plan', methods=['POST'])
def predict_plan():
    try:
        data = request.get_json()
        soil_type = data.get('soilType', 'loamy')
        crop_type = data.get('cropType', 'rice')
        location = data.get('location', '')

        # Fetch weather if location provided
        weather_data = {'temperature': 25, 'humidity': 60}
        if location:
            weather_response = requests.get(WEATHER_API_URL, params={
                'q': location,
                'appid': OPENWEATHER_API_KEY,
                'units': 'metric'
            })
            if weather_response.status_code == 200:
                weather_data = weather_response.json()['main']


        plans = {
            'rice': {'sowing': 'Jun–Jul', 'harvest': 'Oct–Nov', 'water': 'Heavy irrigation', 'alert': 'Monitor rainfall'},
            'wheat': {'sowing': 'Nov–Dec', 'harvest': 'Mar–Apr', 'water': 'Moderate irrigation', 'alert': 'Ensure drainage'},
        }
        base_plan = plans.get(crop_type.lower(), {'sowing': 'TBD', 'harvest': 'TBD', 'water': 'Check weather', 'alert': 'No data'})

        return jsonify(base_plan), 200
    except Exception as e:
        logger.error(f"Plan prediction error: {str(e)}")
        return jsonify({"error": "Planning failed"}), 500
    


@app.route('/api/feedback', methods=['POST'])
def feedback():
    try:
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        village = data.get('village')
        story = data.get('story')

        if not all([name, email, village, story]):
            return jsonify({"error": "Missing fields"}), 400

        # Save to MongoDB (in a new collection)
        feedback_collection = db['feedback']
        feedback_collection.insert_one({'name': name, 'email': email, 'village': village, 'story': story})

        return jsonify({"msg": "Feedback submitted successfully"}), 200
    except Exception as e:
        logger.error(f"Feedback error: {str(e)}")
        return jsonify({"error": "Submission failed"}), 500




# ------------------- Main Execution -------------------

if __name__ == "__main__":
    logger.info("Starting Flask server on port 8000")
    app.run(debug=True, port=8000)
