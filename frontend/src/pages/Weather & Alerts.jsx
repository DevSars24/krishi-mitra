import { useState } from "react";
import { motion } from "framer-motion";
import calendarImg from "../assets/calendar.jpg";

function Calendar() {
  const [language, setLanguage] = useState("en");
  const [soilType, setSoilType] = useState("loamy");
  const [cropType, setCropType] = useState("rice");
  const [location, setLocation] = useState("");
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState(null);

  // Dummy planning logic (replace with backend API later)
  const generatePlan = (inputs) => {
    const plans = {
      en: {
        rice: {
          sowing: "Jun–Jul",
          harvest: "Oct–Nov",
          water: "Heavy irrigation needed",
          alert: "Monitor rainfall; avoid waterlogging.",
        },
        wheat: {
          sowing: "Nov–Dec",
          harvest: "Mar–Apr",
          water: "Moderate irrigation every 10–12 days",
          alert: "Ensure well-drained soil.",
        },
      },
      hi: {
        rice: {
          sowing: "जून–जुलाई",
          harvest: "अक्टूबर–नवंबर",
          water: "भारी सिंचाई की आवश्यकता",
          alert: "वर्षा की निगरानी करें; जलभराव से बचें।",
        },
        wheat: {
          sowing: "नवंबर–दिसंबर",
          harvest: "मार्च–अप्रैल",
          water: "हर 10–12 दिन मध्यम सिंचाई",
          alert: "अच्छी जल निकासी वाली मिट्टी सुनिश्चित करें।",
        },
      },
    };

    return plans[language][inputs.cropType.toLowerCase()] || {
      sowing: "TBD",
      harvest: "TBD",
      water: "Check soil and weather",
      alert: "No data available for this crop.",
    };
  };

  const handlePlan = async () => {
    setError(null);
    setPlan(null);

    try {
      const payload = { soilType, cropType, location };
      const response = await fetch("http://localhost:8000/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Planning failed");
      const data = await response.json();
      setPlan(data);
    } catch (err) {
      console.warn("Fallback to dummy:", err.message);
      const dummyPlan = generatePlan({ soilType, cropType, location });
      setPlan(dummyPlan);
      setError("Using local dummy plan (backend not available).");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-teal-900 text-white flex flex-col items-center px-6 py-12">
      {/* Language Selector */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setLanguage("en")}
          className={`px-3 py-1 rounded ${language === "en" ? "bg-green-400 text-gray-900" : "bg-gray-700"}`}
        >
          English
        </button>
        <button
          onClick={() => setLanguage("hi")}
          className={`px-3 py-1 rounded ${language === "hi" ? "bg-green-400 text-gray-900" : "bg-gray-700"}`}
        >
          हिन्दी
        </button>
      </div>

      {/* Hero Image */}
      <motion.img
        src={calendarImg}
        alt="Crop Planner"
        className="mx-auto mb-6 w-2/5 md:w-1/4 rounded-lg shadow-2xl border-2 border-teal-400"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Title */}
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-yellow-300 mb-2 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {language === "en" ? "📅 AI Crop Planner" : "📅 एआई फ़सल योजना"}
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        className="mt-2 text-gray-300 text-center max-w-3xl mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        {language === "en"
          ? "Get personalized crop planning based on soil, location, and weather. Optimize sowing, irrigation, and harvest schedules with AI-driven insights."
          : "मिट्टी, स्थान और मौसम के आधार पर व्यक्तिगत फ़सल योजना प्राप्त करें। एआई-चालित अंतर्दृष्टि के साथ बोने, सिंचाई और कटाई की अनुकूलित समय-सारणी।"}
      </motion.p>

      {/* Input Form */}
      <div className="w-full max-w-md bg-gray-900/70 p-6 rounded-xl shadow-xl mb-8">
        <h3 className="text-xl font-semibold mb-4">{language === "en" ? "Enter Details" : "विवरण दर्ज करें"}</h3>
        <div className="grid gap-4">
          <label>
            {language === "en" ? "Soil Type" : "मिट्टी का प्रकार"}
            <select value={soilType} onChange={(e) => setSoilType(e.target.value)} className="w-full p-2 bg-gray-800 rounded">
              <option value="loamy">Loamy</option>
              <option value="sandy">Sandy</option>
              <option value="clay">Clay</option>
            </select>
          </label>
          <label>
            {language === "en" ? "Crop Type" : "फसल का प्रकार"}
            <input type="text" value={cropType} onChange={(e) => setCropType(e.target.value)} className="w-full p-2 bg-gray-800 rounded" placeholder={language === "en" ? "e.g., Rice" : "जैसे, चावल"} />
          </label>
          <label>
            {language === "en" ? "Location (Village/Zip)" : "स्थान (गाँव/पिन कोड)"}
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full p-2 bg-gray-800 rounded" />
          </label>
        </div>
        <button onClick={handlePlan} className="mt-4 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-500">
          {language === "en" ? "Generate Plan" : "योजना बनाएँ"}
        </button>
        {error && <p className="text-red-300 mt-2">{error}</p>}
      </div>

      {/* Plan Output */}
      {plan && (
        <motion.div
          className="w-full max-w-4xl bg-gray-900/70 p-6 rounded-xl shadow-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h3 className="text-xl font-semibold mb-4">{language === "en" ? "Your Crop Plan" : "आपकी फ़सल योजना"}</h3>
          <p><strong>{language === "en" ? "Sowing Date" : "बोने की तारीख"}:</strong> {plan.sowing}</p>
          <p><strong>{language === "en" ? "Harvest Date" : "कटाई की तारीख"}:</strong> {plan.harvest}</p>
          <p><strong>{language === "en" ? "Water Needs" : "पानी की आवश्यकता"}:</strong> {plan.water}</p>
          <p><strong>{language === "en" ? "Alert" : "चेतावनी"}:</strong> {plan.alert}</p>
        </motion.div>
      )}
    </div>
  );
}

export default Calendar;