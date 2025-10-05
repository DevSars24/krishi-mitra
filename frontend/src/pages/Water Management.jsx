import { useState } from "react";
import { motion } from "framer-motion";
import waterImg from "../assets/water.jpg";
import loamyImg from "../assets/loamy.jpg";
import sandyImg from "../assets/sandy.jpg";

const advisoryData = {
  en: [
    { soil: "Loamy", advice: "Moderate irrigation weekly.", tip: "Retains moisture well; avoid overwatering.", img: loamyImg },
    { soil: "Sandy", advice: "Frequent light irrigation.", tip: "Drains quickly; use drip irrigation.", img: sandyImg },
    { soil: "Clay", advice: "Less frequent but deep irrigation.", tip: "Retains water; avoid waterlogging.", img: waterImg },
  ],
  hi: [
    { soil: "दुर्बल मिट्टी (Loamy)", advice: "मध्यम सिंचाई (साप्ताहिक)।", tip: "जड़ सड़न से बचें।", img: loamyImg },
    { soil: "रेतीली मिट्टी (Sandy)", advice: "बार-बार हल्की सिंचाई।", tip: "जल कुशलता के लिए ड्रिप सिंचाई।", img: sandyImg },
    { soil: "मिट्टी (Clay)", advice: "कम लेकिन गहरी सिंचाई।", tip: "जल जमाव से बचें।", img: waterImg },
  ],
  mr: [
    { soil: "माती (Loamy)", advice: "मध्यम पाणी द्या (आठवड्यातून).", tip: "ओव्हरवॉटरिंग टाळा.", img: loamyImg },
    { soil: "वाळूची माती (Sandy)", advice: "वारंवार हलके पाणी द्या.", tip: "ड्रिप सिंचन वापरा.", img: sandyImg },
    { soil: "चिकणमाती (Clay)", advice: "कमी पण खोल पाणी द्या.", tip: "जलजमाव टाळा.", img: waterImg },
  ],
};

function Water() {
  const [language, setLanguage] = useState("en");

  // Manual inputs
  const [soilType, setSoilType] = useState("loamy");
  const [cropType, setCropType] = useState("rice");
  const [temperature, setTemperature] = useState(25);
  const [humidity, setHumidity] = useState(60);
  const [location, setLocation] = useState("");

  // Predictions & errors
  const [predictions, setPredictions] = useState(null);
  const [error, setError] = useState(null);

  // ---------- Dummy rule-based fallback ----------
  const dummyPredict = ({ soilType, cropType, temperature, humidity }) => {
    let waterNeed = 500;
    if (soilType === "sandy") waterNeed += 200;
    if (temperature > 30) waterNeed += 100;
    if (humidity < 50) waterNeed += 150;
    if (cropType.toLowerCase() === "rice") waterNeed *= 1.5;

    return {
      waterNeed: `${waterNeed} liters/acre`,
      frequency: "Every 3-5 days",
      alert: temperature > 35 ? "High temp alert: Increase watering" : "Normal conditions",
    };
  };

  // ---------- Predict from location only ----------
  const handlePredictFromLocation = async () => {
    setError(null);
    setPredictions(null);
    if (!location) {
      setError("Please enter location.");
      return;
    }
    try {
      const res = await fetch("http://localhost:8000/api/irrigation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location }),
      });
      if (!res.ok) throw new Error("Backend failed");
      const data = await res.json();
      setPredictions(data);
    } catch (err) {
      console.warn("Fallback to dummy:", err.message);
      setPredictions(dummyPredict({ soilType, cropType, temperature, humidity }));
      setError("Using local dummy prediction (backend not available).");
    }
  };

  // ---------- Predict from manual inputs ----------
  const handlePredictManual = async () => {
    setError(null);
    setPredictions(null);
    try {
      const res = await fetch("http://localhost:8000/api/irrigation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ soilType, cropType, temperature, humidity, location }),
      });
      if (!res.ok) throw new Error("Backend failed");
      const data = await res.json();
      setPredictions(data);
    } catch (err) {
      console.warn("Fallback to dummy:", err.message);
      setPredictions(dummyPredict({ soilType, cropType, temperature, humidity }));
      setError("Using local dummy prediction (backend not available).");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-teal-900 to-green-900 text-white flex flex-col items-center px-6 py-12 relative">
      <motion.img
        src={waterImg}
        alt="Water Management"
        className="mx-auto mb-6 w-2/5 md:w-1/4 rounded-2xl shadow-2xl border-2 border-teal-400"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.h2 className="text-3xl md:text-4xl font-bold text-yellow-300 mb-4 text-center" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        💧 AI Irrigation Advisor
      </motion.h2>

      {/* Language selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Select Language:</label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full max-w-xs px-4 py-2 border rounded-lg bg-gray-800 text-white">
          {Object.keys(advisoryData).map((lang) => (
            <option key={lang} value={lang}>{lang.toUpperCase()}</option>
          ))}
        </select>
      </div>

      {/* Two cards */}
      <div className="grid md:grid-cols-2 gap-6 w-full max-w-6xl">
        {/* Card 1: Location only */}
        <div className="bg-gray-900/80 p-6 rounded-2xl shadow-xl">
          <h3 className="text-xl font-semibold mb-4">Location Only</h3>
          <label className="block mb-2">Village / Zip Code:</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full p-2 mb-4 rounded bg-gray-800" placeholder="Enter location" />
          <button onClick={handlePredictFromLocation} className="bg-teal-600 px-4 py-2 rounded hover:bg-teal-500 w-full">Predict Irrigation</button>
        </div>

        {/* Card 2: Manual input */}
        <div className="bg-gray-900/80 p-6 rounded-2xl shadow-xl">
          <h3 className="text-xl font-semibold mb-4">Manual Input</h3>
          <div className="grid gap-4">
            <label>
              Soil Type:
              <select value={soilType} onChange={(e) => setSoilType(e.target.value)} className="w-full p-2 rounded bg-gray-800">
                <option value="loamy">Loamy</option>
                <option value="sandy">Sandy</option>
                <option value="clay">Clay</option>
              </select>
            </label>
            <label>
              Crop Type:
              <input type="text" value={cropType} onChange={(e) => setCropType(e.target.value)} className="w-full p-2 rounded bg-gray-800" placeholder="e.g., Rice" />
            </label>
            <label>
              Temperature (°C):
              <input type="number" value={temperature} onChange={(e) => setTemperature(e.target.value)} className="w-full p-2 rounded bg-gray-800" />
            </label>
            <label>
              Humidity (%):
              <input type="number" value={humidity} onChange={(e) => setHumidity(e.target.value)} className="w-full p-2 rounded bg-gray-800" />
            </label>
          </div>
          <button onClick={handlePredictManual} className="mt-4 bg-teal-600 px-4 py-2 rounded hover:bg-teal-500 w-full">Predict Irrigation</button>
        </div>
      </div>

      {/* Prediction output */}
      {predictions && (
        <motion.div className="w-full max-w-4xl bg-gray-900/80 p-6 rounded-2xl shadow-xl mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h3 className="text-xl font-semibold mb-4">Predicted Irrigation Needs</h3>
          <p><strong>Water Required:</strong> {predictions.waterNeed}</p>
          <p><strong>Frequency:</strong> {predictions.frequency}</p>
          <p><strong>Alert:</strong> {predictions.alert}</p>
        </motion.div>
      )}

      {/* Advisory cards */}
      <motion.div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-6xl">
        {advisoryData[language].map((item, index) => (
          <motion.div key={index} className="bg-gray-900/80 p-6 rounded-2xl shadow-xl hover:scale-105 transition" whileHover={{ y: -5 }}>
            <img src={item.img} alt={item.soil} className="rounded-xl w-full h-32 object-cover mb-4" />
            <h3 className="font-semibold text-teal-400 text-xl">{`Soil: ${item.soil}`}</h3>
            <p className="text-gray-200 mt-2">{item.advice}</p>
            <div className="mt-2 text-sm text-gray-400">{item.tip}</div>
          </motion.div>
        ))}
      </motion.div>

      {error && <p className="text-red-300 mt-4">{error}</p>}
    </div>
  );
}

export default Water;
