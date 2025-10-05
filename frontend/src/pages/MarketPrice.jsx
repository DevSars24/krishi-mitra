
import { useState } from "react";
import { motion } from "framer-motion";
import cropPhoto from "../assets/cropphoto.jpg";

const translations = {
  en: {
    title: "🌾 Real-Time Market Prices",
    selectState: "Select State",
    selectCrop: "Select Crop",
    button: "Get Prices",
    noData:
      "No data available. It's not an issue from our side; it may not be updated on the government site, for more info visit",
  },
  hi: {
    title: "🌾 वास्तविक समय बाजार भाव",
    selectState: "राज्य चुनें",
    selectCrop: "फसल चुनें",
    button: "भाव देखें",
    noData:
      "कोई डेटा उपलब्ध नहीं। हमारी कोई गलती नहीं है; यह सरकारी साइट पर अपडेट नहीं हुआ हो सकता है। अधिक जानकारी के लिए देखें",
  },
  bn: {
    title: "🌾 রিয়েল-টাইম বাজার দর",
    selectState: "রাজ্য নির্বাচন করুন",
    selectCrop: "শস্য নির্বাচন করুন",
    button: "মূল্য দেখুন",
    noData:
      "কোনো তথ্য নেই। আমাদের দোষ নয়; এটি সরকারি সাইটে আপডেট না হতে পারে। আরও তথ্যের জন্য দেখুন",
  },
  ta: {
    title: "🌾 நேரடி சந்தை விலை",
    selectState: "மாநிலத்தை தேர்ந்தெடுக்கவும்",
    selectCrop: "பயிரை தேர்ந்தெடுக்கவும்",
    button: "விலை பார்க்க",
    noData:
      "தரவு இல்லை। இது எங்கள் பிழை அல்ல; அரசு தளத்தில் புதுப்பிக்கப்படாமல் இருக்கலாம். மேலும் தகவலுக்கு பாருங்கள்",
  },
  te: {
    title: "🌾 తక్షణ మార్కెట్ ధరలు",
    selectState: "రాష్ట్రాన్ని ఎంచుకోండి",
    selectCrop: "పంటను ఎంచుకోండి",
    button: "ధరలు చూడండి",
    noData:
      "డేటా అందుబాటులో లేదు. ఇది మన తప్పు కాదు; ప్రభుత్వ సైట్‌లో అప్డేట్ కావడం లేదు కావచ్చు. మరిన్ని వివరాలకు చూడండి",
  },
  mr: {
    title: "🌾 वास्तविक वेळ बाजार भाव",
    selectState: "राज्य निवडा",
    selectCrop: "पिक निवडा",
    button: "भाव पाहा",
    noData:
      "डेटा उपलब्ध नाही। ही आमची चूक नाही; सरकारी साइटवर अद्यतनित नसेल. अधिक माहितीसाठी पहा",
  },
  gu: {
    title: "🌾 રિયલ-ટાઇમ બજાર ભાવ",
    selectState: "રાજ્ય પસંદ કરો",
    selectCrop: "પાક પસંદ કરો",
    button: "ભાવ જુઓ",
    noData:
      "કોઈ ડેટા ઉપલબ્ધ નથી. અમારી કોઈ ભૂલ નથી; તે સરકારની સાઇટ પર અપડેટ ન થયો હોઈ શકે છે. વધુ માહિતી માટે જુઓ",
  },
  pa: {
    title: "🌾 ਅਸਲੀ ਸਮੇਂ ਮੰਡੀ ਭਾਅ",
    selectState: "ਰਾਜ ਚੁਣੋ",
    selectCrop: "ਫਸਲ ਚੁਣੋ",
    button: "ਭਾਅ ਵੇਖੋ",
    noData:
      "ਕੋਈ ਡਾਟਾ ਉਪਲਬਧ ਨਹੀਂ। ਇਹ ਸਾਡੀ ਗਲਤੀ ਨਹੀਂ ਹੈ; ਸਰਕਾਰੀ ਸਾਈਟ 'ਤੇ ਅੱਪਡੇਟ ਨਹੀਂ ਹੋਇਆ ਹੋ ਸਕਦਾ। ਹੋਰ ਜਾਣਕਾਰੀ ਲਈ ਵੇਖੋ",
  },
  kn: {
    title: "🌾 ನೈಜ ಸಮಯದ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು",
    selectState: "ರಾಜ್ಯವನ್ನು ಆರಿಸಿ",
    selectCrop: "ಬೆಳೆ ಆರಿಸಿ",
    button: "ಬೆಲೆ ನೋಡಿ",
    noData:
      "ಡೇಟಾ ಲಭ್ಯವಿಲ್ಲ. ಇದು ನಮ್ಮ ದೋಷವಲ್ಲ; ಸರ್ಕಾರದ ತಾಣದಲ್ಲಿ ಹಂಚಿಕೆ ಮಾಡಲಾಗಿಲ್ಲ. ಹೆಚ್ಚಿನ ಮಾಹಿತಿಗಾಗಿ ನೋಡಿ",
  },
  ur: {
    title: "🌾 اصل وقت کی منڈی کی قیمتیں",
    selectState: "ریاست منتخب کریں",
    selectCrop: "فصل منتخب کریں",
    button: "قیمت دیکھیں",
    noData:
      "کوئی ڈیٹا دستیاب نہیں۔ یہ ہماری غلطی نہیں ہے؛ یہ حکومت کی سائٹ پر اپڈیٹ نہیں ہو سکتا۔ مزید معلومات کے لیے دیکھیں",
  },
};

const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

const crops = ["Paddy", "Rice", "Wheat", "Maize", "Soyabean", "Sugarcane", "Cotton", "Barley", "Mustard", "Millets"];

function MarketPrice() {
  const [state, setState] = useState("Bihar");
  const [crop, setCrop] = useState("Paddy");
  const [data, setData] = useState(null);
  const [lang, setLang] = useState("hi");

  const fetchPrices = async () => {
    setData(null);
    try {
      const response = await fetch(
        `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd00000176333d05eb09419d7908555c87118055&format=json&filters[state]=${state}&filters[commodity]=${crop}`
      );
      const result = await response.json();
      setData(result.records && result.records.length > 0 ? result.records : "no-data");
    } catch (error) {
      setData("no-data");
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-green-50 to-emerald-100 min-h-screen">
      {/* Header Image */}
      <motion.img
        src={cropPhoto}
        alt="Market Price"
        className="mx-auto mb-6 w-full max-w-md rounded-2xl shadow-xl border-2 border-white/50"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Language Switcher */}
      <div className="flex justify-end mb-4">
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="border rounded px-2 py-1"
        >
          {Object.keys(translations).map((key) => (
            <option key={key} value={key}>
              {key.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <h1 className="text-3xl font-bold text-green-800 mb-6 flex items-center gap-2">
        {translations[lang].title}
      </h1>

      {/* State + Crop Dropdowns */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <select
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="border rounded px-4 py-2 w-1/3"
        >
          {states.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          value={crop}
          onChange={(e) => setCrop(e.target.value)}
          className="border rounded px-4 py-2 w-1/3"
        >
          {crops.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <button
          onClick={fetchPrices}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {translations[lang].button}
        </button>
      </div>

      {/* Data Display */}
      {data === "no-data" && (
        <p className="text-red-600">
          {translations[lang].noData}{" "}
          <a
            href="https://www.data.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            https://www.data.gov.in/
          </a>
        </p>
      )}

      {Array.isArray(data) && (
        <div className="bg-white rounded-lg shadow p-4">
          {data.map((item, index) => (
            <div key={index} className="border-b p-2">
              <p>
                <strong>{item.market}</strong> – {item.min_price} to {item.max_price} ₹/qtl
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MarketPrice;
