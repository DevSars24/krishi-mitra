import { useState } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import farmerHero from "../assets/farmer-hero.jpg";

const content = {
  en: {
    title: "Welcome Farmers of India 🌱",
    tagline: "An all-in-one assistant for agricultural growth, smart water management, government schemes, training programs, and AI-powered chatbot support.",
    goalsTitle: "🌟 Our Goals",
    goals: [
      "Empower farmers with modern digital tools",
      "Provide easy access to government schemes",
      "Encourage sustainable farming practices",
      "Bridge the gap between farmers and technology"
    ],
    objectivesTitle: "🎯 Our Objectives",
    objectives: [
      "Provide real-time weather and water management tips",
      "Offer training & skill development programs",
      "Enable AI-powered consultation for farming solutions",
      "Support women and young farmers with special initiatives"
    ]
  },
  hi: {
    title: "भारत के किसानों का स्वागत है 🌱",
    tagline: "कृषि विकास, स्मार्ट जल प्रबंधन, सरकारी योजनाएं, प्रशिक्षण कार्यक्रम और AI-समर्थित चैटबॉट समर्थन के लिए एक संपूर्ण सहायक।",
    goalsTitle: "🌟 हमारे लक्ष्य",
    goals: [
      "आधुनिक डिजिटल उपकरणों के साथ किसानों को सशक्त बनाना",
      "सरकारी योजनाओं तक आसान पहुँच प्रदान करना",
      "सतत कृषि प्रथाओं को प्रोत्साहित करना",
      "किसानों और प्रौद्योगिकी के बीच की खाई को पाटना"
    ],
    objectivesTitle: "🎯 हमारे उद्देश्य",
    objectives: [
      "वास्तविक समय मौसम और जल प्रबंधन सुझाव प्रदान करना",
      "प्रशिक्षण और कौशल विकास कार्यक्रम प्रदान करना",
      "कृषि समाधानों के लिए AI-समर्थित परामर्श सक्षम करना",
      "महिला और युवा किसानों के लिए विशेष पहल में समर्थन देना"
    ]
  }
};

function Home() {
  const [language, setLanguage] = useState("en");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-950 to-emerald-900 text-gray-100 flex flex-col items-center px-6 py-12">
      
      {/* Language Selector */}
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${language === "en" ? "bg-green-400 text-gray-900" : "bg-gray-700"}`}
          onClick={() => setLanguage("en")}
        >
          English
        </button>
        <button
          className={`px-4 py-2 rounded ${language === "hi" ? "bg-green-400 text-gray-900" : "bg-gray-700"}`}
          onClick={() => setLanguage("hi")}
        >
          हिन्दी
        </button>
      </div>

      {/* Title */}
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-teal-300 to-cyan-400 drop-shadow-lg"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        {content[language].title}
      </motion.h1>

      {/* Hero Image */}
      <motion.img
        src={farmerHero}
        alt="Farmer Hero"
        className="mx-auto rounded-2xl shadow-2xl mb-8 w-1/3 md:w-1/4 lg:w-1/5 border-4 border-green-700/50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Tagline */}
      <motion.p
        className="text-lg md:text-xl text-gray-300 max-w-2xl text-center leading-relaxed mb-12"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        {content[language].tagline}
      </motion.p>

      {/* Goals & Objectives Section */}
      <motion.div
        className="max-w-5xl grid md:grid-cols-2 gap-8 text-left"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        {/* Goals */}
        <div className="bg-gradient-to-tr from-green-800 to-emerald-700 p-6 rounded-2xl shadow-xl hover:scale-105 transition transform duration-300">
          <h2 className="text-2xl font-bold mb-4 text-green-200">{content[language].goalsTitle}</h2>
          <ul className="space-y-3 text-gray-100">
            {content[language].goals.map((goal, idx) => (
              <li key={idx}>✅ {goal}</li>
            ))}
          </ul>
        </div>

        {/* Objectives */}
        <div className="bg-gradient-to-tr from-green-800 to-emerald-700 p-6 rounded-2xl shadow-xl hover:scale-105 transition transform duration-300">
          <h2 className="text-2xl font-bold mb-4 text-green-200">{content[language].objectivesTitle}</h2>
          <ul className="space-y-3 text-gray-100">
            {content[language].objectives.map((obj, idx) => (
              <li key={idx}>✅ {obj}</li>
            ))}
          </ul>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
}

export default Home;
