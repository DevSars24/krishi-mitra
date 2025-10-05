import { useState } from "react";
import { motion } from "framer-motion";

const programsData = {
  en: [
    {
      title: "📘 Special Training",
      desc: "Hands-on workshops to learn advanced farming methods, organic practices, and business skills.",
      tip: "Focus on sustainable farming, crop rotation, soil health, and modern equipment usage.",
      resources: [
        { name: "MKSP Scheme", link: "https://rural.nic.in/en/programmes/mksp" },
        { name: "NABARD Training", link: "https://www.nabard.org/" },
      ]
    },
    {
      title: "🛒 Market Access",
      desc: "Connecting women farmers with local and digital marketplaces to sell their produce.",
      tip: "Learn pricing strategies, packaging, marketing, and online sales platforms.",
      resources: [
        { name: "e-NAM Portal", link: "https://enam.gov.in/" },
        { name: "SEWA Market Support", link: "https://www.sewa.org/" },
      ]
    },
    {
      title: "🤝 Mentorship",
      desc: "Guidance from successful women farmers to improve productivity and entrepreneurship.",
      tip: "Personalized mentoring, goal-setting, and building farming networks.",
      resources: [
        { name: "Kudumbashree Mentorship", link: "https://www.kudumbashree.org/" },
        { name: "Mahila Kisan Sashaktikaran", link: "https://rural.nic.in/" },
      ]
    },
    {
      title: "🌱 Sustainable Practices",
      desc: "Training in water conservation, organic fertilizers, and eco-friendly pest control.",
      tip: "Promote environmental sustainability and reduce farming costs.",
      resources: [
        { name: "Organic Farming Guide", link: "https://ncoindia.nic.in/" },
        { name: "Water Conservation Tips", link: "https://jalshakti-dowr.gov.in/" },
      ]
    },
    {
      title: "💡 Financial Literacy",
      desc: "Understanding subsidies, loans, crop insurance, and government schemes.",
      tip: "Helps in better planning, risk management, and maximizing profits.",
      resources: [
        { name: "PM-Kisan Scheme", link: "https://pmkisan.gov.in/" },
        { name: "Crop Insurance Portal", link: "https://pmfby.gov.in/" },
      ]
    }
  ],
  hi: [
    {
      title: "📘 विशेष प्रशिक्षण",
      desc: "उन्नत कृषि विधियाँ, जैविक अभ्यास और व्यवसाय कौशल सीखने के लिए हैंड्स-ऑन कार्यशालाएँ।",
      tip: "सतत खेती, फसल चक्रीकरण, मिट्टी की गुणवत्ता, और आधुनिक उपकरणों का उपयोग।",
      resources: [
        { name: "एमकेएसपी योजना", link: "https://rural.nic.in/en/programmes/mksp" },
        { name: "नाबार्ड प्रशिक्षण", link: "https://www.nabard.org/" },
      ]
    },
    {
      title: "🛒 बाज़ार पहुँच",
      desc: "महिला किसानों को स्थानीय और डिजिटल बाज़ारों से जोड़कर उनकी उपज बेचने में मदद।",
      tip: "मूल्य निर्धारण, पैकेजिंग, विपणन और ऑनलाइन बिक्री प्लेटफ़ॉर्म।",
      resources: [
        { name: "ई-एनएएम पोर्टल", link: "https://enam.gov.in/" },
        { name: "सेवा बाज़ार समर्थन", link: "https://www.sewa.org/" },
      ]
    },
    {
      title: "🤝 मार्गदर्शन",
      desc: "सफल महिला किसानों से मार्गदर्शन, उत्पादकता और उद्यमिता में सुधार।",
      tip: "व्यक्तिगत मेंटरिंग, लक्ष्य निर्धारित करना, और कृषि नेटवर्क बनाना।",
      resources: [
        { name: "कुडुम्बश्री मार्गदर्शन", link: "https://www.kudumbashree.org/" },
        { name: "महिला किसान सशक्तिकरण", link: "https://rural.nic.in/" },
      ]
    },
    {
      title: "🌱 सतत प्रथाएँ",
      desc: "जल संरक्षण, जैविक उर्वरक और पर्यावरण के अनुकूल कीट नियंत्रण में प्रशिक्षण।",
      tip: "पर्यावरणीय स्थिरता बढ़ाएँ और खेती की लागत कम करें।",
      resources: [
        { name: "जैविक खेती गाइड", link: "https://ncoindia.nic.in/" },
        { name: "जल संरक्षण टिप्स", link: "https://jalshakti-dowr.gov.in/" },
      ]
    },
    {
      title: "💡 वित्तीय साक्षरता",
      desc: "सब्सिडी, ऋण, फसल बीमा और सरकारी योजनाओं को समझना।",
      tip: "बेहतर योजना, जोखिम प्रबंधन और अधिकतम लाभ।",
      resources: [
        { name: "पीएम-किसान योजना", link: "https://pmkisan.gov.in/" },
        { name: "फसल बीमा पोर्टल", link: "https://pmfby.gov.in/" },
      ]
    }
  ]
};

const successStories = {
  en: [
    { name: "Radha Devi", story: "From Rajasthan, doubled her income through organic farming and MKSP scheme.", source: "SEWA Organization Report" },
    { name: "Lakshmi Patel", story: "In Tamil Nadu, used financial literacy to get loans and expand her farm.", source: "NABARD Success Story" },
    { name: "Sita Kumari", story: "Led a women's cooperative in Bihar, increasing yield by 30% with mentorship.", source: "Kudumbashree Model" },
  ],
  hi: [
    { name: "राधा देवी", story: "राजस्थान से, जैविक खेती और एमकेएसपी योजना से आय दोगुनी की।", source: "सेवा संगठन रिपोर्ट" },
    { name: "लक्ष्मी पटेल", story: "तमिलनाडु में, वित्तीय साक्षरता से ऋण लेकर खेत विस्तार किया।", source: "नाबार्ड सफलता कथा" },
    { name: "सीता कुमारी", story: "बिहार में महिलाओं के सहकारी का नेतृत्व किया, मार्गदर्शन से पैदावार 30% बढ़ाई।", source: "कुडुम्बश्री मॉडल" },
  ]
};

const ngos = {
  en: [
    { name: "SEWA (Self Employed Women's Association)", contact: "info@sewa.org", link: "https://www.sewa.org/" },
    { name: "Kudumbashree (Kerala)", contact: "kudumbashree@gmail.com", link: "https://www.kudumbashree.org/" },
    { name: "Mahila Mandal (Uttar Pradesh)", contact: "upmahila@ngo.in", link: "https://upgov.in/women-ngo" },
  ],
  hi: [
    { name: "सेवा (स्वरोजगार महिला संघ)", contact: "info@sewa.org", link: "https://www.sewa.org/" },
    { name: "कुडुम्बश्री (केरल)", contact: "kudumbashree@gmail.com", link: "https://www.kudumbashree.org/" },
    { name: "महिला मंडल (उत्तर प्रदेश)", contact: "upmahila@ngo.in", link: "https://upgov.in/women-ngo" },
  ]
};

function Women() {
  const [language, setLanguage] = useState("en");
  const [formData, setFormData] = useState({ name: "", email: "", village: "", story: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Submission failed. Please try again.");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white flex flex-col items-center px-6 py-12">
      
      {/* Title */}
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-pink-300 mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        👩‍🌾 {language === "en" ? "Women Farmers Empowerment" : "महिला किसानों का सशक्तिकरण"}
      </motion.h2>

      {/* Language Selector */}
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${language === "en" ? "bg-pink-400 text-white" : "bg-gray-700"}`}
          onClick={() => setLanguage("en")}
        >
          English
        </button>
        <button
          className={`px-4 py-2 rounded ${language === "hi" ? "bg-pink-400 text-white" : "bg-gray-700"}`}
          onClick={() => setLanguage("hi")}
        >
          हिन्दी
        </button>
      </div>

      {/* Programs Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        {programsData[language].map((item, index) => (
          <motion.div
            key={index}
            className="bg-gray-900/70 p-6 rounded-xl shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="font-semibold text-pink-400 text-xl">{item.title}</h3>
            <p className="text-gray-200 mt-2">{item.desc}</p>
            <p className="text-gray-400 mt-1 text-sm italic">{item.tip}</p>
            <div className="mt-4">
              <h4 className="text-sm font-bold">{language === "en" ? "Resources:" : "संसाधन:"}</h4>
              <ul className="list-disc list-inside text-gray-300 text-sm">
                {item.resources.map((res, i) => (
                  <li key={i}>
                    <a href={res.link} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">{res.name}</a>
                  </li>
                ))}
              </ul>
            </div>
            <button className="mt-4 bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-400">
              {language === "en" ? "Sign Up" : "साइन अप करें"}
            </button>
          </motion.div>
        ))}
      </motion.div>

      {/* Success Stories */}
      <div className="w-full max-w-5xl mb-12">
        <h3 className="text-2xl font-bold text-pink-300 mb-4 text-center">{language === "en" ? "Success Stories" : "सफलता की कहानियाँ"}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {successStories[language].map((story, index) => (
            <div key={index} className="bg-gray-900/70 p-6 rounded-xl shadow-xl">
              <h4 className="font-semibold text-pink-400">{story.name}</h4>
              <p className="text-gray-200 mt-2">{story.story}</p>
              <p className="text-gray-400 mt-1 text-sm italic">Source: {story.source}</p>
            </div>
          ))}
        </div>
      </div>

      {/* NGO Contacts */}
      <div className="w-full max-w-5xl mb-12">
        <h3 className="text-2xl font-bold text-pink-300 mb-4 text-center">{language === "en" ? "Connect with NGOs" : "एनजीओ से जुड़ें"}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {ngos[language].map((ngo, index) => (
            <div key={index} className="bg-gray-900/70 p-6 rounded-xl shadow-xl">
              <h4 className="font-semibold text-pink-400">{ngo.name}</h4>
              <p className="text-gray-200 mt-2">Contact: {ngo.contact}</p>
              <a href={ngo.link} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">Visit Website</a>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback Form */}
      <div className="w-full max-w-md bg-gray-900/70 p-6 rounded-xl shadow-xl mb-8">
        <h3 className="text-xl font-semibold mb-4 text-center">{language === "en" ? "Share Your Story or Feedback" : "अपनी कहानी या फीडबैक साझा करें"}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={language === "en" ? "Name" : "नाम"}
            className="w-full mb-4 p-2 bg-gray-800 rounded text-white"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={language === "en" ? "Email" : "ईमेल"}
            className="w-full mb-4 p-2 bg-gray-800 rounded text-white"
            required
          />
          <input
            type="text"
            name="village"
            value={formData.village}
            onChange={handleChange}
            placeholder={language === "en" ? "Village" : "गाँव"}
            className="w-full mb-4 p-2 bg-gray-800 rounded text-white"
            required
          />
          <textarea
            name="story"
            value={formData.story}
            onChange={handleChange}
            placeholder={language === "en" ? "Your Story or Feedback" : "आपकी कहानी या फीडबैक"}
            className="w-full mb-4 p-2 bg-gray-800 rounded text-white"
            rows="4"
            required
          />
          <button type="submit" className="w-full bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-400">
            {language === "en" ? "Submit" : "जमा करें"}
          </button>
        </form>
        {submitted && <p className="text-green-300 mt-4 text-center">{language === "en" ? "Thank you for sharing!" : "साझा करने के लिए धन्यवाद!"}</p>}
      </div>

      {/* Empowerment Message */}
      <div className="text-center max-w-2xl mb-12">
        <h3 className="text-2xl font-bold text-pink-300 mb-4">{language === "en" ? "Empowerment Pledge" : "सशक्तिकरण प्रतिज्ञा"}</h3>
        <p className="text-gray-200">
          {language === "en"
            ? "We stand with women farmers. Share your story, join a community, and let's grow together for a better future."
            : "हम महिला किसानों के साथ खड़े हैं। अपनी कहानी साझा करें, समुदाय में शामिल हों, और बेहतर भविष्य के लिए साथ बढ़ें।"}
        </p>
      </div>
    </div>
  );
}

export default Women;