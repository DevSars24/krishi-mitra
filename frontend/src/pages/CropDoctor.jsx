import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import trainingImg from "../assets/cropdoctor.jpg";

const trainingModules = {
  en: [
    { title: "🌾 Organic Farming Basics", desc: "Learn eco-friendly crop techniques." },
    { title: "💧 Efficient Water Usage", desc: "Save water while maximizing yield." },
    { title: "🚜 Smart Use of Fertilizers", desc: "Use fertilizers effectively." },
  ],
  hi: [
    { title: "🌾 जैविक खेती की बुनियाद", desc: "पर्यावरण-अनुकूल फसल तकनीकें सीखें।" },
    { title: "💧 जल का कुशल उपयोग", desc: "उत्पादकता बढ़ाते हुए पानी बचाएँ।" },
    { title: "🚜 उर्वरकों का स्मार्ट उपयोग", desc: "उर्वरकों का प्रभावी उपयोग सीखें।" },
  ],
  mr: [
    { title: "🌾 सेंद्रिय शेतीची मूलतत्त्वे", desc: "पर्यावरणपूरक पद्धती शिकवा." },
    { title: "💧 जलाचा कार्यक्षम वापर", desc: "पाणी वाचवताना उत्पादन वाढवा." },
    { title: "🚜 खतांचा स्मार्ट वापर", desc: "खतांचा प्रभावी वापर शिका." },
  ],
  as: [
    { title: "🌾 জৰায়ু চাৰিৰ ভিত্তি", desc: "পৰিৱেশ-বান্ধৱ ফসল প্ৰযুক্তি শিকক।" },
    { title: "💧 পানীৰ কাৰ্যক্ষম ব্যৱহাৰ", desc: "উৎপাদন বাঢ়াই পানী বাঁচাক।" },
    { title: "🚜 সারৰ চমু ব্যৱহাৰ", desc: "সাৰক কাৰ্যক্ষমভাৱে ব্যৱহাৰ কৰক।" },
  ],
  bn: [
    { title: "🌾 জৈব কৃষি প্রাথমিক", desc: "পরিবেশবান্ধব ফসল পদ্ধতি শিখুন।" },
    { title: "💧 পানির কার্যকর ব্যবহার", desc: "উৎপাদন বাড়িয়ে পানি বাঁচান।" },
    { title: "🚜 সারের চালাক ব্যবহার", desc: "সার ব্যবহার কার্যকরভাবে করুন।" },
  ],
  brx: [
    { title: "🌾 जौलौ फार्मिन थाखौ", desc: "जौलौ फसल थाखौ थिना।" },
    { title: "💧 जलौ सांवदो बे", desc: "जलौ सांवदो गिदि बे फसल।" },
    { title: "🚜 सांरौ थाखौ", desc: "सांरौ थाखौ बे सिथि।" },
  ],
  doi: [
    { title: "🌾 ऑर्गैनिक खेती दा आधार", desc: "परीसरी फसल तकनीक सीखो।" },
    { title: "💧 पानी दा हिकमती इस्तेमाल", desc: "उत्पादन वड्डदे पानी बचाओ।" },
    { title: "🚜 खाद दा चतुर इस्तेमाल", desc: "खाद दा हिकमती इस्तेमाल करो।" },
  ],
  gu: [
    { title: "🌾 ઓર્ગેનિક ખેતીનાં મૂળભૂત", desc: "પર્યાવરણપ્રિય પાક ટેકનીક્સ શીખો।" },
    { title: "💧 પાણીનો કારગત ઉપયોગ", desc: "ઉત્પાદન વધારીને પાણી બચાવો।" },
    { title: "🚜 ખાતરનો સ્માર્ટ ઉપયોગ", desc: "ખાતરનો અસરકારક ઉપયોગ કરો।" },
  ],
  kn: [
    { title: "🌾 ಸಾವಯವ ಕೃಷಿ ಮೂಲಭೂತ", desc: "ಪರಿಸರ ಸ್ನೇಹಿ ಬೆಳೆ ತಂತ್ರಗಳನ್ನು ಕಲಿಯಿರಿ।" },
    { title: "💧 ನೀರಿನ ಪರಿಣಾಮಕಾರಿ ಬಳಕೆ", desc: "ಉತ್ಪಾದನೆಯನ್ನು ಹೆಚ್ಚಿಸಿ ನೀರನ್ನು ಉಳಿಸಿ।" },
    { title: "🚜 ಗೊಬ್ಬರದ ಸ್ಮಾರ್ಟ್ ಬಳಕೆ", desc: "ಗೊಬ್ಬರವನ್ನು ಪರಿಣಾಮಕಾರಿಯಾಗಿ ಬಳಸಿ।" },
  ],
  ks: [
    { title: "🌾 ارگانیک کِشی دی بنیاد", desc: "ماحول دوست فصل تکنیک سیکھو۔" },
    { title: "💧 پانی دی عقلمند استعمال", desc: "پیداوار وادھ کر پانی بچاؤ۔" },
    { title: "🚜 کھاد دی سمارٹ استعمال", desc: "کھاد دی عقلمند استعمال کرو۔" },
  ],
  mai: [
    { title: "🌾 जैविक खेती के मूल", desc: "पर्यावरण-स्नेही फसल तकनीक सीखू।" },
    { title: "💧 पानी के कुशल प्रयोग", desc: "उत्पादन बढ़ाई के पानी बचाओ।" },
    { title: "🚜 खाद के चतुर प्रयोग", desc: "खाद के प्रभावी प्रयोग करू।" },
  ],
  ml: [
    { title: "🌾 ഓർഗാനിക് കൃഷിയുടെ അടിസ്ഥാനം", desc: "പരിസ്ഥിതി സൗഹൃദ വിള ടെക്‌നിക്കുകൾ പഠിക്കുക。" },
    { title: "💧 ജലത്തിന്റെ ഫലപ്രദമായ ഉപയോഗം", desc: "ഉൽ‌പാദനം വർധിപ്പിച്ച് ജലം ലാഭിക്കുക。" },
    { title: "🚜 ഗോബർ ഉപയോഗത്തിന്റെ സ്മാർട്ട്", desc: "ഗോബർ ഫലപ്രദമായി ഉപയോഗിക്കുക。" },
  ],
  mni: [
    { title: "🌾 ꯑꯣꯔꯒꯥꯅꯤꯛ ꯀ꯭ꯔꯤꯁꯤꯡ ꯑꯃꯥꯏꯅꯥ", desc: "ꯑꯣꯔꯒꯥꯅꯤꯛ ꯑꯃꯥ ꯇꯦꯛꯅꯤꯛ ꯊꯥꯕꯥꯅꯤ।" },
    { title: "💧 ꯄꯥꯅꯤ ꯀꯝꯕꯥꯡ ꯑꯌꯨꯝꯅꯥ", desc: "ꯑꯣꯏꯅꯥ ꯋꯥꯔꯤꯅꯥ ꯄꯥꯅꯤ ꯁꯥꯕꯥ।" },
    { title: "🚜 ꯈꯥꯗ ꯇꯥꯝꯅꯥ", desc: "ꯈꯥꯗ ꯑꯌꯨꯝꯅꯥ ꯁꯥꯕꯥ।" },
  ],
  ne: [
    { title: "🌾 जैविक खेतीको आधार", desc: "पर्यावरणमैत्री फसल प्रविधि सिक्नुहोस्।" },
    { title: "💧 पानीको प्रभावकारी प्रयोग", desc: "उत्पादन बढाएर पानी बचत गर्नुहोस्।" },
    { title: "🚜 मलको चतुर प्रयोग", desc: "मलको प्रभावकारी प्रयोग गर्नुहोस्।" },
  ],
  or: [
    { title: "🌾 ଓର୍ଗାନିକ ଖେତିର ଆଧାର", desc: "ପରିବେଶ-ସନ୍ଧାନ ଫସଲ ପଦ୍ଧତି ଶିଖନ୍ତୁ।" },
    { title: "💧 ଜଳର କାର୍ଯ୍ୟକୁଶଳ ବ୍ୟବହାର", desc: "ଉତ୍ପାଦନ ବୃଦ୍ଧି କରି ଜଳ ସଞ୍ଚୟ କରନ୍ତୁ।" },
    { title: "🚜 ଖାଦ୍ୟର ସ୍ମାର୍ଟ ବ୍ୟବହାର", desc: "ଖାଦ୍ୟର ପ୍ରଭାବଶାଳୀ ବ୍ୟବହାର କରନ୍ତୁ।" },
  ],
  pa: [
    { title: "🌾 ਆਰਗੈਨਿਕ ਖੇਤੀ ਦੇ ਬੁਨਿਆਦ", desc: "ਪਰਿਪੇਰਕ ਸਹਿਯੋਗੀ ਫਸਲ ਤਕਨੀਕ ਸਿੱਖੋ।" },
    { title: "💧 ਪਾਣੀ ਦਾ ਸੁਚਾਰੂ ਇਸਤੇਮਾਲ", desc: "ਉਤਪਾਦਨ ਵਧਾਉਂਦੇ ਹੋਏ ਪਾਣੀ ਬਚਾਓ।" },
    { title: "🚜 ਖਾਦ ਦਾ ਸਮਾਰਟ ਇਸਤੇਮਾਲ", desc: "ਖਾਦ ਦਾ ਪ੍ਰਭਾਵੀ ਇਸਤੇਮਾਲ ਕਰੋ।" },
  ],
  sat: [
    { title: "🌾 ᱡᱤᱵ ᱠᱷᱮᱛᱤ ᱨᱮᱱᱟᱜ", desc: "ᱯᱟᱨᱤᱵᱮᱥᱟᱱᱫᱷᱟᱵ ᱯᱟᱠ ᱛᱟᱠᱱᱤᱠ ᱥᱤᱠᱦᱚ।" },
    { title: "💧 ᱯᱟᱱᱤᱨ ᱠᱟᱨᱭᱟᱠᱥᱟᱢ ᱵᱮᱭᱟᱨ", desc: "ᱳᱛᱯᱟᱫᱱ ᱵᱟᱰᱟᱭ ᱯᱟᱱᱤ ᱥᱟᱵᱟᱹ।" },
    { title: "🚜 ᱠᱷᱟᱫ ᱥᱢᱟᱨᱛ ᱵᱮᱭᱟᱨ", desc: "ᱠᱷᱟᱫ ᱠᱟᱨᱭᱟᱠᱥᱟᱢ ᱵᱮᱭᱟᱨ ᱠᱚᱲᱟ।" },
  ],
  sd: [
    { title: "🌾 ارگينڪ ڪرسيءَ جو بنياد", desc: "ماحول دوست فصل طريقا سکيو۔" },
    { title: "💧 پاڻيءَ جو موثر استعمال", desc: "پيداوار وڌائي پاڻي بچايو۔" },
    { title: "🚜 کپڙيءَ جو چالاڪ استعمال", desc: "کپڙيءَ جو موثر استعمال ڪريو۔" },
  ],
  si: [
    { title: "🌾 ජෛව ගොවිතැන ආධාර", desc: "පරිසර හිතකාමී බන්ද්‍ර තාක්ෂණය ඉගෙන ගන්න。" },
    { title: "💧 ජලයේ කාර්යක්ෂම භාවිතය", desc: "උපයෝගීතාවය වැඩි කර ජලය ඉතිරි කරන්න。" },
    { title: "🚜 පොහොර භාවිතයේ රහස්", desc: "පොහොර ඵලදායී ලෙස භාවිතා කරන්න。" },
  ],
  ta: [
    { title: "🌾 ஒர்கானிக் விவசாய அடிப்படை", desc: "சுற்றுச்சூழல் நட்பு பயிர் தொழில்நுட்பங்களை கற்கவும்。" },
    { title: "💧 நீரின் பயனுள்ள பயன்பாடு", desc: "உற்பத்தியை அதிகரித்து நீரை சேமிக்கவும்。" },
    { title: "🚜 உரத்தின் ஸ்மார்ட் பயன்பாடு", desc: "உரத்தை பயனுள்ள முறையில் பயன்படுத்தவும்。" },
  ],
};

function CropDoctor() {
  const [language, setLanguage] = useState("en");
  const [searchTerm, setSearchTerm] = useState("");
  const [completed, setCompleted] = useState({});
  const [soilType, setSoilType] = useState("loamy");
  const [season, setSeason] = useState("kharif");
  const [area, setArea] = useState(1);
  const [prevCrop, setPrevCrop] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);

  const modules =
    language && trainingModules[language]
      ? trainingModules[language].filter((mod) =>
          mod.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

  const toggleComplete = (title) => {
    setCompleted((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  useEffect(() => {
    document.title = "Crop Doctor - AI Farming Tools";
  }, []);

  const ruleBasedRecommend = ({ soilType, season, area, prevCrop }) => {
    const recs = [];
    if (season === "kharif") {
      if (soilType === "loamy" || soilType === "alluvial") {
        recs.push({ name: "Rice (धान)", reason: "Loamy soil + Kharif season", expectedYield: "4-5 t/ha" });
      } else {
        recs.push({ name: "Maize (मकई)", reason: "Tolerant to varied soils", expectedYield: "3-4 t/ha" });
      }
    } else if (season === "rabi") {
      if (soilType === "black") {
        recs.push({ name: "Wheat (गेहूँ)", reason: "Black soil holds moisture", expectedYield: "3-4 t/ha" });
      } else {
        recs.push({ name: "Gram (चना)", reason: "Low water requirement", expectedYield: "0.6-1 t/ha" });
      }
    } else {
      recs.push({ name: "Pulses (दालें)", reason: "Good for crop rotation", expectedYield: "Varies" });
    }

    if (prevCrop && prevCrop.toLowerCase().includes("rice")) {
      recs.push({ name: "Vegetables (सब्ज़ियाँ)", reason: "Rotation after paddy", expectedYield: "Varies" });
    }

    if (area <= 0.5) recs.push({ name: "Vegetables / Herbs", reason: "Small area: high-value crops", expectedYield: "High (per small area)" });

    return recs;
  };

  const handleRecommend = async () => {
    setError(null);
    setRecommendations([]);
    try {
      const payload = { soilType, season, area, prevCrop };
      const res = await fetch("http://localhost:8000/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Backend recommend failed, using local rules.");
      const data = await res.json();
      if (data?.recommendedCrops) setRecommendations(data.recommendedCrops);
      else throw new Error("Invalid response from /api/recommend");
    } catch (err) {
      console.warn("Recommend fallback:", err.message);
      const recs = ruleBasedRecommend({ soilType, season, area, prevCrop });
      setRecommendations(recs);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 text-gray-800 flex flex-col items-center px-4 py-8 relative overflow-hidden">
      <motion.img
        src={trainingImg}
        alt="Crop Doctor"
        className="mx-auto mb-6 w-1/3 md:w-1/4 lg:w-1/5 rounded-2xl shadow-xl border-2 border-white/50 z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.h2
        className="text-3xl md:text-4xl font-extrabold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        🎓 Crop Doctor - AI Farming Hub
      </motion.h2>

      <div className="mb-6 z-10">
        <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">Select Language:</label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full max-w-xs px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          {Object.keys(trainingModules).map((lang) => (
            <option key={lang} value={lang}>{lang.toUpperCase()}</option>
          ))}
        </select>
      </div>

      <input
        type="text"
        placeholder="Search training modules..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 px-4 py-2 rounded-full w-full max-w-md focus:outline-none border-2 border-gray-400 z-10"
      />

      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-6 z-10">
        <div className="bg-white p-5 rounded-xl shadow-lg">
          <h3 className="font-semibold text-lg mb-4">Training Modules</h3>
          {modules.length === 0 && <p className="text-gray-600">No modules found</p>}
          {modules.map((mod, idx) => (
            <motion.div
              key={idx}
              className={`p-4 rounded-md mb-4 flex justify-between items-center cursor-pointer ${
                completed[mod.title] ? "border-2 border-green-500 bg-green-50" : "border border-gray-200"
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => toggleComplete(mod.title)}
            >
              <div>
                <h4 className="font-medium">{mod.title}</h4>
                <p className="text-sm text-gray-600">{mod.desc}</p>
              </div>
              {completed[mod.title] && <span className="text-green-600 font-bold">✔</span>}
            </motion.div>
          ))}
        </div>

        <div className="bg-white p-5 rounded-xl shadow-lg">
          <h3 className="font-semibold text-lg mb-4">Crop Recommendation</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm">
              Soil Type
              <select
                className="w-full mt-2 p-2 border rounded-lg"
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
              >
                <option value="loamy">Loamy</option>
                <option value="alluvial">Alluvial</option>
                <option value="black">Black (Regur)</option>
                <option value="sandy">Sandy</option>
                <option value="laterite">Laterite</option>
              </select>
            </label>
            <label className="text-sm">
              Season
              <select
                className="w-full mt-2 p-2 border rounded-lg"
                value={season}
                onChange={(e) => setSeason(e.target.value)}
              >
                <option value="kharif">Kharif</option>
                <option value="rabi">Rabi</option>
                <option value="zaid">Zaid</option>
              </select>
            </label>
            <label className="text-sm">
              Area (acres)
              <input
                type="number"
                min="0"
                step="0.1"
                value={area}
                onChange={(e) => setArea(parseFloat(e.target.value || 0))}
                className="w-full mt-2 p-2 border rounded-lg"
              />
            </label>
            <label className="text-sm">
              Previous Crop (optional)
              <input
                type="text"
                value={prevCrop}
                onChange={(e) => setPrevCrop(e.target.value)}
                placeholder="e.g. Rice"
                className="w-full mt-2 p-2 border rounded-lg"
              />
            </label>
          </div>
          <div className="mt-4 flex gap-3">
            <button
              onClick={handleRecommend}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition"
            >
              Recommend Crops
            </button>
            <button
              onClick={() => { setRecommendations([]); setError(null); }}
              className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Clear
            </button>
          </div>
          {recommendations.length === 0 && !error && <p className="text-gray-500 mt-3">No recommendations yet.</p>}
          {recommendations.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border p-3 rounded-lg mb-3 bg-gray-50"
            >
              <div className="flex justify-between">
                <strong>{r.name}</strong>
                <span className="text-sm text-gray-600">{r.expectedYield || ""}</span>
              </div>
              <p className="text-sm text-gray-700">{r.reason}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CropDoctor;