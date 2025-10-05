import { useState } from "react";
import { motion } from "framer-motion";

function KisaanSeva() {
  const [language, setLanguage] = useState("en");
  const [selectedCity, setSelectedCity] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const translations = {
    en: {
      title: "Kisaan Seva Kendra Locator",
      selectCity: "Select Your City",
      selectCityOption: "Select a city",
      nearestKsk: "Nearest Kisaan Seva Kendra",
      kskName: "KSK Name",
      helpline: "Helpline",
      distance: "Approx. Distance",
      openMaps: "Open in Google Maps",
      feedbackLabel: "Your Feedback",
      feedbackPlaceholder: "Please share your feedback or suggestions",
      submitFeedback: "Submit Feedback",
      feedbackSuccess: "Thank you for your feedback!"
    },
    hi: {
      title: "किसान सेवा केंद्र लोकेटर",
      selectCity: "अपना शहर चुनें",
      selectCityOption: "शहर चुनें",
      nearestKsk: "निकटतम किसान सेवा केंद्र",
      kskName: "केएसके नाम",
      helpline: "हेल्पलाइन",
      distance: "लगभग दूरी",
      openMaps: "गूगल मैप्स में खोलें",
      feedbackLabel: "आपकी प्रतिक्रिया",
      feedbackPlaceholder: "कृपया अपनी प्रतिक्रिया या सुझाव साझा करें",
      submitFeedback: "प्रतिक्रिया सबमिट करें",
      feedbackSuccess: "आपकी प्रतिक्रिया के लिए धन्यवाद!"
    },
    ta: {
      feedbackLabel: "உங்கள் கருத்து",
      feedbackPlaceholder: "தயவு செய்து உங்கள் கருத்து அல்லது பரிந்துரைகளை பகிரவும்",
      submitFeedback: "கருத்து சமர்ப்பிக்கவும்",
      feedbackSuccess: "உங்கள் கருத்துக்கு நன்றி!"
    },
    te: {
      feedbackLabel: "మీ అభిప్రాయం",
      feedbackPlaceholder: "దయచేసి మీ అభిప్రాయం లేదా సూచనలను పంచుకోండి",
      submitFeedback: "అభిప్రాయం సమర్పించండి",
      feedbackSuccess: "మీ అభిప్రాయానికి ధన్యవాదాలు!"
    },
    mr: {
      feedbackLabel: "तुमचा अभिप्राय",
      feedbackPlaceholder: "कृपया तुमचा अभिप्राय किंवा सूचना शेअर करा",
      submitFeedback: "अभिप्राय सबमिट करा",
      feedbackSuccess: "तुमच्या अभिप्रायाबद्दल धन्यवाद!"
    }
  };

  const dummyKskLocations = {
    en: [
      { city: "Bhagalpur", ksk: "Nearest: KSK Patna", helpline: "1800-123-4577", distance: "250 km", nearest: "Patna" },
      { city: "Patna", ksk: "KSK Central Patna", helpline: "1800-123-4577", distance: "0 km", nearest: "Patna" },
      { city: "Gaya", ksk: "Nearest: KSK Patna", helpline: "1800-123-4577", distance: "100 km", nearest: "Patna" },
      { city: "Muzaffarpur", ksk: "Nearest: KSK Patna", helpline: "1800-123-4577", distance: "70 km", nearest: "Patna" },
      { city: "Darbhanga", ksk: "Nearest: KSK Patna", helpline: "1800-123-4577", distance: "120 km", nearest: "Patna" },
      { city: "Aurangabad", ksk: "Nearest: KSK Patna", helpline: "1800-123-4577", distance: "130 km", nearest: "Patna" },
      { city: "Nalanda", ksk: "Nearest: KSK Patna", helpline: "1800-123-4577", distance: "80 km", nearest: "Patna" },
      { city: "Ranchi", ksk: "Nearest: KSK Ranchi", helpline: "1800-123-4577", distance: "0 km", nearest: "Ranchi" },
      { city: "Dhanbad", ksk: "Nearest: KSK Ranchi", helpline: "1800-123-4577", distance: "160 km", nearest: "Ranchi" },
      { city: "Jamshedpur", ksk: "Nearest: KSK Ranchi", helpline: "1800-123-4577", distance: "130 km", nearest: "Ranchi" },
      { city: "Varanasi", ksk: "Nearest: KSK Lucknow", helpline: "1800-123-4577", distance: "300 km", nearest: "Lucknow" },
      { city: "Lucknow", ksk: "KSK Lucknow", helpline: "1800-123-4577", distance: "0 km", nearest: "Lucknow" },
      { city: "Kanpur", ksk: "Nearest: KSK Lucknow", helpline: "1800-123-4577", distance: "90 km", nearest: "Lucknow" },
      { city: "Allahabad", ksk: "Nearest: KSK Lucknow", helpline: "1800-123-4577", distance: "200 km", nearest: "Lucknow" },
      { city: "Gorakhpur", ksk: "Nearest: KSK Lucknow", helpline: "1800-123-4577", distance: "270 km", nearest: "Lucknow" },
      { city: "Agra", ksk: "Nearest: KSK Delhi", helpline: "1800-123-4577", distance: "220 km", nearest: "Delhi" },
      { city: "Delhi", ksk: "KSK Delhi", helpline: "1800-123-4577", distance: "0 km", nearest: "Delhi" },
      { city: "Noida", ksk: "Nearest: KSK Delhi", helpline: "1800-123-4577", distance: "20 km", nearest: "Delhi" },
      { city: "Gurgaon", ksk: "Nearest: KSK Delhi", helpline: "1800-123-4577", distance: "25 km", nearest: "Delhi" },
      { city: "Faridabad", ksk: "Nearest: KSK Delhi", helpline: "1800-123-4577", distance: "30 km", nearest: "Delhi" },
      { city: "Mumbai", ksk: "KSK Mumbai", helpline: "1800-123-4577", distance: "0 km", nearest: "Mumbai" },
      { city: "Pune", ksk: "Nearest: KSK Mumbai", helpline: "1800-123-4577", distance: "150 km", nearest: "Mumbai" },
      { city: "Nagpur", ksk: "Nearest: KSK Mumbai", helpline: "1800-123-4577", distance: "800 km", nearest: "Mumbai" },
      { city: "Nashik", ksk: "Nearest: KSK Mumbai", helpline: "1800-123-4577", distance: "170 km", nearest: "Mumbai" },
      { city: "Kolkata", ksk: "KSK Kolkata", helpline: "1800-123-4577", distance: "0 km", nearest: "Kolkata" },
      { city: "Howrah", ksk: "Nearest: KSK Kolkata", helpline: "1800-123-4577", distance: "10 km", nearest: "Kolkata" },
      { city: "Asansol", ksk: "Nearest: KSK Kolkata", helpline: "1800-123-4577", distance: "200 km", nearest: "Kolkata" },
      { city: "Siliguri", ksk: "Nearest: KSK Kolkata", helpline: "1800-123-4577", distance: "600 km", nearest: "Kolkata" },
      { city: "Chennai", ksk: "KSK Chennai", helpline: "1800-123-4577", distance: "0 km", nearest: "Chennai" },
      { city: "Coimbatore", ksk: "Nearest: KSK Chennai", helpline: "1800-123-4577", distance: "500 km", nearest: "Chennai" },
      { city: "Bengaluru", ksk: "KSK Bengaluru", helpline: "1800-123-4577", distance: "0 km", nearest: "Bengaluru" },
      { city: "Mysuru", ksk: "Nearest: KSK Bengaluru", helpline: "1800-123-4577", distance: "150 km", nearest: "Bengaluru" },
      { city: "Hyderabad", ksk: "KSK Hyderabad", helpline: "1800-123-4577", distance: "0 km", nearest: "Hyderabad" },
      { city: "Vijayawada", ksk: "Nearest: KSK Hyderabad", helpline: "1800-123-4577", distance: "275 km", nearest: "Hyderabad" },
      { city: "Ahmedabad", ksk: "KSK Ahmedabad", helpline: "1800-123-4577", distance: "0 km", nearest: "Ahmedabad" },
      { city: "Surat", ksk: "Nearest: KSK Ahmedabad", helpline: "1800-123-4577", distance: "270 km", nearest: "Ahmedabad" },
      { city: "Rajkot", ksk: "Nearest: KSK Ahmedabad", helpline: "1800-123-4577", distance: "250 km", nearest: "Ahmedabad" },
      { city: "Amritsar", ksk: "Nearest: KSK Chandigarh", helpline: "1800-123-4577", distance: "230 km", nearest: "Chandigarh" },
      { city: "Ludhiana", ksk: "Nearest: KSK Chandigarh", helpline: "1800-123-4577", distance: "110 km", nearest: "Chandigarh" },
      { city: "Chandigarh", ksk: "KSK Chandigarh", helpline: "1800-123-4577", distance: "0 km", nearest: "Chandigarh" },
      { city: "Jaipur", ksk: "KSK Jaipur", helpline: "1800-123-4577", distance: "0 km", nearest: "Jaipur" },
      { city: "Udaipur", ksk: "Nearest: KSK Jaipur", helpline: "1800-123-4577", distance: "400 km", nearest: "Jaipur" },
      { city: "Jodhpur", ksk: "Nearest: KSK Jaipur", helpline: "1800-123-4577", distance: "350 km", nearest: "Jaipur" },
      { city: "Kochi", ksk: "KSK Kochi", helpline: "1800-123-4577", distance: "0 km", nearest: "Kochi" },
      { city: "Thiruvananthapuram", ksk: "Nearest: KSK Kochi", helpline: "1800-123-4577", distance: "220 km", nearest: "Kochi" },
      { city: "Kozhikode", ksk: "Nearest: KSK Kochi", helpline: "1800-123-4577", distance: "190 km", nearest: "Kochi" },
    ]
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    setSelectedCity(""); // Reset city selection when language changes
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (feedback.trim()) {
      setFeedbackSubmitted(true);
      setFeedback("");
      // In a real app, you would send feedback to a server here
      setTimeout(() => setFeedbackSubmitted(false), 3000); // Hide success message after 3 seconds
    }
  };

  const getNearestKsk = () => {
    if (!selectedCity) return null;
    return dummyKskLocations[language].find(loc => loc.city === selectedCity) || null;
  };

  const nearestKsk = getNearestKsk();

  // Free Google Maps Embed (no API key)
  const getMapUrl = () => {
    if (!nearestKsk) return null;
    const origin = encodeURIComponent(selectedCity);
    const destination = encodeURIComponent(nearestKsk.nearest || "Patna");
    return `https://www.google.com/maps?q=${origin}+to+${destination}&output=embed`;
  };

  // Direct Google Maps Link (opens app or browser tab)
  const getMapsLink = () => {
    if (!nearestKsk) return null;
    const origin = encodeURIComponent(selectedCity);
    const destination = encodeURIComponent(nearestKsk.nearest || "Patna");
    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-teal-900 to-blue-900 text-white flex flex-col items-center px-6 py-12">
      <motion.h2 className="text-3xl md:text-4xl font-bold text-yellow-300 mb-6 text-center">
        🌾 {translations[language].title}
      </motion.h2>

      {/* Language Selector */}
      <div className="w-full max-w-md mb-6">
        <label className="block mb-2">Select Language</label>
        <select
          value={language}
          onChange={handleLanguageChange}
          className="w-full p-2 bg-gray-800 rounded text-white"
        >
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
          <option value="ta">தமிழ்</option>
          <option value="te">తెలుగు</option>
          <option value="mr">मराठी</option>
        </select>
      </div>

      {/* City Selector */}
      <div className="w-full max-w-md mb-6">
        <label className="block mb-2">{translations[language].selectCity}</label>
        <select
          value={selectedCity}
          onChange={handleCityChange}
          className="w-full p-2 bg-gray-800 rounded text-white"
        >
          <option value="">{translations[language].selectCityOption}</option>
          {dummyKskLocations[language]?.map((loc, index) => (
            <option key={index} value={loc.city}>{loc.city}</option>
          ))}
        </select>
      </div>

      {/* KSK Info */}
      {nearestKsk && (
        <motion.div className="w-full max-w-md bg-gray-900/70 p-6 rounded-xl shadow-xl mb-6">
          <h3 className="font-semibold text-yellow-300 text-xl mb-2">
            {translations[language].nearestKsk}
          </h3>
          <p><strong>{translations[language].kskName}:</strong> {nearestKsk.ksk}</p>
          <p><strong>{translations[language].helpline}:</strong> {nearestKsk.helpline}</p>
          <p><strong>{translations[language].distance}:</strong> {nearestKsk.distance}</p>
        </motion.div>
      )}

      
      {nearestKsk && (
        <div className="w-full max-w-4xl h-96 mb-4">
          <iframe
            title="Google Maps Directions"
            src={getMapUrl()}
            width="100%"
            height="100%"
            allowFullScreen
            loading="lazy"
            className="rounded-xl shadow-lg"
          ></iframe>
        </div>
      )}

    
      {nearestKsk && (
        <a
          href={getMapsLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow-lg hover:bg-yellow-300 transition mb-6"
        >
          📍 {translations[language].openMaps}
        </a>
      )}

      
      <motion.div className="w-full max-w-md bg-gray-900/70 p-6 rounded-xl shadow-xl">
        <h3 className="font-semibold text-yellow-300 text-xl mb-2">
          {translations[language].feedbackLabel}
        </h3>
        {feedbackSubmitted ? (
          <p className="text-green-400">{translations[language].feedbackSuccess}</p>
        ) : (
          <form onSubmit={handleFeedbackSubmit}>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder={translations[language].feedbackPlaceholder}
              className="w-full p-2 bg-gray-800 rounded text-white mb-4"
              rows="4"
            ></textarea>
            <button
              type="submit"
              className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow-lg hover:bg-yellow-300 transition"
            >
              {translations[language].submitFeedback}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}

export default KisaanSeva;