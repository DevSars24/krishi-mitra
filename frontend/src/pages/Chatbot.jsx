import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const uiContent = {
  en: {
    title: "🤖 AI Assistant for Farmers",
    placeholder: "Select a language...",
    sendBtn: "Send",
    helper: "You can ask questions in Hindi, Marathi, Maithili, English, or any local language. The AI will respond accordingly.",
    typing: "Typing...",
    error: "⚠️ Error fetching response. Try again later.",
    noResponse: "⚠️ No response from AI. Please try again."
  },
  hi: {
    title: "🤖 किसानों के लिए AI सहायक",
    placeholder: "भाषा चुनें...",
    sendBtn: "भेजें",
    helper: "आप हिंदी, मराठी, मैथिली, अंग्रेज़ी या किसी भी स्थानीय भाषा में प्रश्न पूछ सकते हैं। AI उसी भाषा में उत्तर देगा।",
    typing: "टाइप कर रहा है...",
    error: "⚠️ उत्तर लाने में त्रुटि। बाद में पुनः प्रयास करें।",
    noResponse: "⚠️ AI से कोई उत्तर नहीं मिला। कृपया पुनः प्रयास करें।"
  },
  as: {
    title: "🤖 কৃষকৰ বাবে AI সহায়ক",
    placeholder: "ভাষা নিৰ্বাচন কৰক...",
    sendBtn: "পঠিয়াও",
    helper: "আপুনি হিন্দী, মৰাঠী, মৈথিলী, ইংৰাজী অথবা কোনো স্থানীয় ভাষাত প্ৰশ্ন জিজ্ঞাসা কৰিব পাৰে। AI সেই ভাষাত উত্তৰ দিব।",
    typing: "টাইপ কৰি আছে...",
    error: "⚠️ উত্তৰ আনিবলৈ ত্ৰুটি। পৰে আবাৰ চেষ্টা কৰক।",
    noResponse: "⚠️ AI ৰ পৰা কোনো উত্তৰ পোৱা নগল। দয়া কৰি আবাৰ চেষ্টা কৰক।"
  },
  bn: {
    title: "🤖 কৃষকদের জন্য AI সহকারী",
    placeholder: "ভাষা নির্বাচন করুন...",
    sendBtn: "পাঠান",
    helper: "আপনি হিন্দি, মরাঠি, মৈথিলি, ইংরেজি বা কোনো স্থানীয় ভাষায় প্রশ্ন জিজ্ঞাসা করতে পারেন। AI তা উক্ত ভাষায় উত্তর দেবে।",
    typing: "টাইপ করা হচ্ছে...",
    error: "⚠️ উত্তর আনতে ত্রুটি। পরে আবার চেষ্টা করুন।",
    noResponse: "⚠️ AI থেকে কোনো উত্তর পাওয়া যায়নি। দয়া করে আবার চেষ্টা করুন।"
  },
  brx: {
    title: "🤖 खालांनिफwrनै AI साहाय",
    placeholder: "बिब्लाँ निफwrनै...",
    sendBtn: "बिजौ",
    helper: "आपुनि हिन्दी, मराठी, मैथिली, इंग्लिश आरनि कनो सिथानि भाषाखौ प्रश्न मwnखौ सांथाय सायो। AI सेथायो भाषाखौ उत्तर दंखौ।",
    typing: "टाइप खालांनो...",
    error: "⚠️ उत्तर आनोनि थांथाय। फर आबोर सायखौ।",
    noResponse: "⚠️ AI सेबा कनो उत्तर नोंखौ। दंखौ आबोर सायखौ।"
  },
  doi: {
    title: "🤖 डोगरा कस्सान लेई AI सहाय",
    placeholder: "भाशा चनो...",
    sendBtn: "भेजो",
    helper: "तू हिन्दी, मराठी, मैथिली, अंग्रेजी आओ कोई ठैरी भाषा च प्रश्न पुच्छ सकदा ऐ। AI ओही भाषा च उत्तर दंदा ऐ।",
    typing: "टाइप करदा ऐ...",
    error: "⚠️ उत्तर लैण च गलती। बाद च दोबारा सुझाव दियो।",
    noResponse: "⚠️ AI नूं कुझ उत्तर नईं। कृपया दोबारा सुझाव दियो।"
  },
  gu: {
    title: "🤖 ખેડૂતો માટે AI સહાયક",
    placeholder: "ભાષા પસંદ કરો...",
    sendBtn: "મોકલો",
    helper: "આપ હિન્દી, મરાઠી, મૈથિલી, ઇંગ્લિશ અથવા કોઈ સ્થાનિક ભાષામાં પ્રશ્ન પૂછી શકો છો। AI તે ભાષામાં જવાબ આપશે。",
    typing: "ટાઇપ કરી રહ્યું છે...",
    error: "⚠️ જવાબ મેળવવામાં ભૂલ। પછીથી ફરી પ્રયત્ન કરો。",
    noResponse: "⚠️ AI થી કોઈ જવાબ મળ્યો નથી। કૃપા કરીને ફરી પ્રયત્ન કરો。"
  },
  kn: {
    title: "🤖 ರೈತರಿಗಾಗಿ AI ಸಹಾಯಕ",
    placeholder: "ಭಾಷೆ ಆಯ್ಕೆ ಮಾಡಿ...",
    sendBtn: "ಕಳುಹಿಸು",
    helper: "ನೀವು ಹಿಂದಿ, ಮರಾಠಿ, ಮೈಥಿಲಿ, ಇಂಗ್ಲೀಷ್ ಅಥವಾ ಯಾವುದೇ ಸ್ಥಳೀಯ ಭಾಷೆಯಲ್ಲಿ ಪ್ರಶ್ನೆ ಕೇಳಬಹುದು. AI ಅದಕ್ಕೆ ತಕ್ಕ ಭಾಷೆಯಲ್ಲಿ ಉತ್ತರಿಸುತ್ತದೆ.",
    typing: "ಟೈಪ್ ಮಾಡುತ್ತಿದೆ...",
    error: "⚠️ ಉತ್ತರ ತೆಗೆಯುವಲ್ಲಿ ದೋಷ. ನಂತರ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    noResponse: "⚠️ AI ಇಂದ ಯಾವುದೇ ಉತ್ತರ ಲಭ್ಯವಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ."
  },
  ks: {
    title: "🤖 کسانوں کے لیے AI مددگار",
    placeholder: "زبان منتخب کریں...",
    sendBtn: "بھیجیں",
    helper: "آپ ہندی، مراٹھی، مئی تھیلی، انگریزی یا کسی مقامی زبان میں سوال پوچھ سکتے ہیں۔ AI اسی زبان میں جواب دے گا۔",
    typing: "ٹائپ ہو رہا ہے...",
    error: "⚠️ جواب حاصل کرنے میں غلطی۔ بعد میں دوبارہ کوشش کریں۔",
    noResponse: "⚠️ AI سے کوئی جواب نہیں ملا۔ براہ کرم دوبارہ کوشش کریں۔"
  },
  kok: {
    title: "🤖 शेतकऱ्यांसाठी AI सहाय्यक",
    placeholder: "भाषा निवडा...",
    sendBtn: "पाठवा",
    helper: "तुम्ही हिंदी, मराठी, मैथिली, इंग्रजी किंवा कोणत्याही स्थानिक भाषेत प्रश्न विचारू शकता. AI त्या भाषेत उत्तर देईल.",
    typing: "टायपिंग चालू आहे...",
    error: "⚠️ उत्तर मिळवण्यात त्रुटी. नंतर पुन्हा प्रयत्न करा.",
    noResponse: "⚠️ AI कडून कोणतेही उत्तर मिळाले नाही. कृपया पुन्हा प्रयत्न करा."
  },
  mai: {
    title: "🤖 किसानखे बर AI सहायक",
    placeholder: "भाषा चुनू...",
    sendBtn: "भेजू",
    helper: "तँ हिंदी, मराठी, मैथिली, अंग्रेजी या कवनो स्थानीय भाषा मँ प्रश्न पूछ सकत बानी. AI ओही भाषा मँ जवाब देब.",
    typing: "टाइप करैत बानी...",
    error: "⚠️ जवाब लएत बेरा त्रुटि. बाद मँ फिर कोसिस करू.",
    noResponse: "⚠️ AI सँ कवनो जवाब नहि मिलल. कृप्या फिर कोसिस करू."
  },
  ml: {
    title: "🤖 കർഷകർക്കായുള്ള AI സഹായി",
    placeholder: "ഭാഷ തിരഞ്ഞെടുക്കുക...",
    sendBtn: "അയക്കുക",
    helper: "നിങ്ങൾ ഹിന്ദി, മറാഠി, മൈഥിലി, ഇംഗ്ലീഷ് അല്ലെങ്കിൽ ഏതെങ്കിലും സ്ഥലീയ ഭാഷയിൽ ചോദ്യങ്ങൾ ചോദിക്കാം. AI അതിനനുസരിച്ച് ഭാഷയിൽ മറുപടി നൽകും.",
    typing: "ടൈപ്പ് ചെയ്യുന്നു...",
    error: "⚠️ മറുപടി ലഭിക്കുന്നതിൽ പിശക്. പിന്നീട് വീണ്ടും ശ്രമിക്കുക.",
    noResponse: "⚠️ AI നിന്ന് മറുപടി ലഭിച്ചില്ല. ദയവായി വീണ്ടും ശ്രമിക്കുക."
  },
  mni: {
    title: "🤖 ꯃꯤꯇꯦꯝꯁꯤꯡꯗꯥ AI ꯁꯥꯍꯥꯏ",
    placeholder: "ꯂꯣꯟꯅꯥ ꯑꯣꯏꯅꯥ...",
    sendBtn: "ꯂꯣꯌꯥꯏ",
    helper: "ꯅꯥꯕꯥ ꯍꯤꯟꯗꯤ, ꯃꯔꯥꯠꯤ, ꯃꯥꯏꯊꯤꯂꯤ, ꯏꯉ꯭ꯂꯤꯁ ꯆꯥꯡꯗꯥ ꯃꯃꯨꯡ ꯂꯣꯟꯅꯥ ꯌꯥꯕꯤꯌꯥꯛꯤꯏ. AI ꯑꯣꯏꯅꯥ ꯌꯥꯕꯤꯌꯥꯛꯤꯏ ꯃꯔꯣꯟꯅꯥ.",
    typing: "ꯇꯥꯏꯄꯤꯡ ꯈꯨꯝꯅꯥ...",
    error: "⚠️ ꯃꯔꯣꯟ ꯂꯣꯌꯥꯏꯅꯥ ꯑꯣꯏꯅꯥ ꯈꯣꯡꯗꯥ. ꯃꯥꯈꯤ ꯂꯣꯌꯥꯏꯅꯥ.",
    noResponse: "⚠️ AI ꯑꯣꯏꯅꯥ ꯃꯔꯣꯟ ꯂꯣꯏꯅꯥ ꯀꯝꯃꯥꯏ. ꯀꯥꯏꯅꯥ ꯂꯣꯌꯥꯏꯅꯥ."
  },
  mr: {
    title: "🤖 शेतकऱ्यांसाठी AI सहाय्यक",
    placeholder: "भाषा निवडा...",
    sendBtn: "पाठवा",
    helper: "तुम्ही हिंदी, मराठी, मैथिली, इंग्रजी किंवा कोणत्याही स्थानिक भाषेत प्रश्न विचारू शकता. AI त्या भाषेत उत्तर देईल.",
    typing: "टायपिंग चालू आहे...",
    error: "⚠️ उत्तर मिळवण्यात त्रुटी. नंतर पुन्हा प्रयत्न करा.",
    noResponse: "⚠️ AI कडून कोणतेही उत्तर मिळाले नाही. कृपया पुन्हा प्रयत्न करा."
  },
  ne: {
    title: "🤖 किसानका लागि AI सहायक",
    placeholder: "भाषा छान्नुहोस्...",
    sendBtn: "पठाउनुहोस्",
    helper: "तपाईं हिन्दी, मराठी, मैथिली, अंग्रेजी वा कुनै स्थानीय भाषामा प्रश्न सोध्न सक्नुहुन्छ। AI त्यही भाषामा जवाफ दिनेछ।",
    typing: "टाइप गर्दैछ...",
    error: "⚠️ जवाफ ल्याउँदा त्रुटि। पछि फेरि प्रयास गर्नुहोस्।",
    noResponse: "⚠️ AI बाट कुनै जवाफ प्राप्त भएन। कृपया फेरि प्रयास गर्नुहोस्।"
  },
  or: {
    title: "🤖 କୃଷକମାନଙ୍କ ପାଇଁ AI ସହାୟକ",
    placeholder: "ଭାଷା ଚୟନ କରନ୍ତୁ...",
    sendBtn: "ପଠାନ୍ତୁ",
    helper: "ଆପଣ ହିନ୍ଦୀ, ମରାଠୀ, ମୈଥିଲୀ, ଇଂଲିଶ କିମ୍ବା କୌଣସି ସ୍ଥାନୀୟ ଭାଷାରେ ପ୍ରଶ୍ନ ପଚାରି ପାରିବେ। AI ସେହି ଭାଷାରେ ଉତ୍ତର ଦେବ।",
    typing: "ଟାଇପ୍ କରୁଛି...",
    error: "⚠️ ଉତ୍ତର ଆଣିବାରେ ତ୍ରୁଟି। ପରେ ପୁନର୍ବାର ଚେଷ୍ଟା କରନ୍ତୁ।",
    noResponse: "⚠️ AI ରୁ କୌଣସି ଉତ୍ତର ମିଳିଲା ନାହିଁ। ଦୟାକରି ପୁନର୍ବାର ଚେଷ୍ଟା କରନ୍ତୁ।"
  },
  pa: {
    title: "🤖 ਕਿਸਾਨਾਂ ਲਈ AI ਸਹਾਇਕ",
    placeholder: "ਭਾਸ਼ਾ ਚੁਣੋ...",
    sendBtn: "ਭੇਜੋ",
    helper: "ਤੁਸੀਂ ਹਿੰਦੀ, ਮਰਾਠੀ, ਮੈਥਿਲੀ, ਅੰਗਰੇਜ਼ੀ ਜਾਂ ਕਿਸੇ ਸਥਾਨਕ ਭਾਸ਼ਾ ਵਿੱਚ ਪ੍ਰਸ਼ਨ ਪੁੱਛ ਸਕਦੇ ਹੋ। AI ਉਸੇ ਭਾਸ਼ਾ ਵਿੱਚ ਜਵਾਬ ਦੇਵੇਗਾ।",
    typing: "ਟਾਈਪ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ...",
    error: "⚠️ ਜਵਾਬ ਲੈਣ ਵਿੱਚ ਗਲਤੀ। ਬਾਅਦ ਵਿੱਚ ਫਿਰ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
    noResponse: "⚠️ AI ਤੋਂ ਕੋਈ ਜਵਾਬ ਨਹੀਂ ਮਿਲਿਆ। ਕਿਰਪਾ ਕਰਕੇ ਫਿਰ ਕੋਸ਼ਿਸ਼ ਕਰੋ।"
  },
  sat: {
    title: "🤖 ᱠᱤᱥᱟᱱ ᱥᱮᱨᱮᱠᱟᱠᱟ AI ᱥᱟᱦᱟᱭ",
    placeholder: "ᱯᱷᱟᱥᱟ ᱪᱤᱱᱟᱹᱠᱤ...",
    sendBtn: "ᱥᱮᱞᱮᱫ",
    helper: "ᱟᱯᱳ ᱦᱤᱱᱫᱤ, ᱢᱟᱨᱟᱛᱤ, ᱢᱟᱭᱛᱤᱞᱤ, ᱤᱱᱜᱨᱮᱡᱤ ᱨᱮᱭᱟᱜ ᱯᱷᱟᱥᱟ ᱨᱮᱠᱟᱠ ᱯᱨᱥᱱ ᱯᱩᱪᱷᱟᱹ ᱥᱟᱱᱛᱟᱭ ᱥᱟᱢᱟᱣ। AI ᱮᱱᱟᱜ ᱯᱷᱟᱥᱟ ᱨᱮᱭᱟᱜ ᱪᱤᱛᱟᱹ ᱫᱟᱹᱲᱟᱣ।",
    typing: "ᱛᱟᱤᱯ ᱠᱟᱱᱟ...",
    error: "⚠️ ᱪᱤᱛᱟᱹ ᱪᱤᱱᱟᱹᱠᱤ ᱨᱮᱱᱟᱜ ᱠᱟᱹᱢᱤ। ᱦᱟᱹᱵᱤ ᱪᱤᱱᱟᱹᱠᱤ ᱥᱮᱞᱮᱫ।",
    noResponse: "⚠️ AI ᱨᱮᱱᱟᱜ ᱪᱤᱛᱟᱹ ᱠᱟᱱᱟ ᱱᱟᱦᱟᱵᱮ। ᱠᱟᱹᱢᱤ ᱪᱤᱱᱟᱹᱠᱤ ᱥᱮᱞᱮᱫ।"
  },
  sd: {
    title: "🤖 کسانن لاءِ AI مددگار",
    placeholder: "زبان چونڊيو...",
    sendBtn: "سندو",
    helper: "توھان هندي، مراٺي، ميٿيلي، انگريزي يا ھر ڪنھن ھڪ محلي ٻوليءَ ۾ سوال پوچھي سگھو ٿا. AI اھا ٻوليءَ ۾ جواب ڏيندو.",
    typing: "ٽائپ ڪيو پئي وڃي...",
    error: "⚠️ جواب حاصل ڪرڻ ۾ غلطي. بعد ۾ ٻيهر ڪوشش ڪريو.",
    noResponse: "⚠️ AI کان ڪوبه جواب نه مليو. مهرباني ڪري ٻيهر ڪوشش ڪريو."
  },
  si: {
    title: "🤖 ගොවීන් සඳහා AI උපකාරක",
    placeholder: "භාෂාව තෝරන්න...",
    sendBtn: "යවන්න",
    helper: "ඔබට හින්දි, මරාති, මයිතිලි, ඉංග්රීසි හෝ ඕනෑම ජනප්රිය භාෂාවකින් ප්රශ්න ඇසිය හැක. AI එම භාෂාවෙන් පිළිතුරු ලබාදෙනු ඇත.",
    typing: "ටයිප් කරමින්...",
    error: "⚠️ පිළිතුර ලබා ගැනීමේදී දෝෂයකි. පසුව යලි උත්සාහ කරන්න.",
    noResponse: "⚠️ AI හිටපු යම් පිළිතුරක් නොලැබුණි. යලි උත්සාහ කරන්න."
  },
  ta: {
    title: "🤖 விவசாயிகளுக்கான AI உதவியாளர்",
    placeholder: "மொழியை தேர்ந்தெடுக்கவும்...",
    sendBtn: "அனுப்பு",
    helper: "நீங்கள் இந்தி, மராத்தி, மைத்திலி, ஆங்கிலம் அல்லது ஏதேனும் உள்ளூர் மொழியில் கேள்வி கேட்கலாம். AI அதற்கேற்ப மொழியில் பதிலளிக்கும்.",
    typing: "டைப் செய்கிறது...",
    error: "⚠️ பதில் பெறுவதில் பிழை. பிறகு மீண்டும் முயற்சிக்கவும்.",
    noResponse: "⚠️ AI இலிருந்து எந்த பதிலும் இல்லை. தயவு செய்து மீண்டும் முயற்சிக்கவும்."
  },
  te: {
    title: "🤖 రైతుల కోసం AI సహాయకుడు",
    placeholder: "భాషను ఎంచుకోండి...",
    sendBtn: "పంపండి",
    helper: "నీవు హిందీ, మరాఠీ, మైథిలీ, ఇంగ్లీష్ లేదా ఏదైనా స్థానిక భాషలో ప్రశ్నలు అడగవచ్చు. AI అందుకు అనుగుణంగా భాషలో సమాధానం ఇస్తుంది.",
    typing: "టైప్ చేస్తున్నారు...",
    error: "⚠️ సమాధానం పొందుటలో లోపం. తర్వాత మళ్లీ ప్రయత్నించండి.",
    noResponse: "⚠️ AI నుండి ఎటువంటి సమాధానం లేదు. దయచేసి మళ్లీ ప్రయత్నించండి."
  },
  ur: {
    title: "🤖 کسانوں کے لیے AI معاون",
    placeholder: "زبان منتخب کریں...",
    sendBtn: "بھیجیں",
    helper: "آپ ہندی، مراٹھی، مئی تھیلی، انگریزی یا کسی مقامی زبان میں سوال پوچھ سکتے ہیں۔ AI اسی زبان میں جواب دے گا۔",
    typing: "ٹائپ ہو رہا ہے...",
    error: "⚠️ جواب حاصل کرنے میں غلطی۔ بعد میں دوبارہ کوشش کریں۔",
    noResponse: "⚠️ AI سے کوئی جواب نہیں ملا۔ براہ کرم دوبارہ کوشش کریں۔"
  }
};

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("en");
  const [error, setError] = useState(null);

  const languageOptions = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिन्दी (Hindi)" },
    { code: "as", name: "অসমীয়া (Assamese)" },
    { code: "bn", name: "বাংলা (Bengali)" },
    { code: "brx", name: "बड़ो (Bodo)" },
    { code: "doi", name: "डोगरी (Dogri)" },
    { code: "gu", name: "ગુજરાતી (Gujarati)" },
    { code: "kn", name: "ಕನ್ನಡ (Kannada)" },
    { code: "ks", name: "کٲشُر (Kashmiri)" },
    { code: "kok", name: "कोंकणी (Konkani)" },
    { code: "mai", name: "मैथिली (Maithili)" },
    { code: "ml", name: "മലയാളം (Malayalam)" },
    { code: "mni", name: "ꯃꯤꯇꯩ (Manipuri)" },
    { code: "mr", name: "मराठी (Marathi)" },
    { code: "ne", name: "नेपाली (Nepali)" },
    { code: "or", name: "ଓଡ଼ିଆ (Odia)" },
    { code: "pa", name: "ਪੰਜਾਬੀ (Punjabi)" },
    { code: "sat", name: "ᱥᱟᱱᱛᱟᱞᱤ (Santali)" },
    { code: "sd", name: "سنڌي (Sindhi)" },
    { code: "si", name: "සිංහල (Sinhala)" },
    { code: "ta", name: "தமிழ் (Tamil)" },
    { code: "te", name: "తెలుగు (Telugu)" },
    { code: "ur", name: "اردو (Urdu)" }
  ];

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log("API Response:", data);
      
      const botMessage = {
        sender: "bot",
        text: data?.output || uiContent[language].noResponse,
      };
      

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Chatbot error:", err);
      setError(uiContent[language].error);
      const errorMessage = { sender: "bot", text: uiContent[language].error };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  useEffect(() => {
    console.log("Current messages:", messages);
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white flex flex-col items-center px-6 py-12">
      {/* Language Selector */}
      <div className="flex gap-4 mb-6">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="px-4 py-2 rounded bg-gray-700 text-white focus:outline-none"
        >
          {languageOptions.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      {/* Title */}
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-yellow-300 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {uiContent[language].title}
      </motion.h2>

      {/* Chat Box */}
      <div className="w-full max-w-md bg-gray-900/80 p-4 rounded-xl shadow-xl mb-4">
        <div className="h-64 overflow-y-auto mb-4 space-y-2">
          {messages.map((msg, idx) => (
            <p
              key={idx}
              className={`px-3 py-1 rounded-lg ${
                msg.sender === "user"
                  ? "bg-green-700 text-white text-right ml-auto max-w-[80%]"
                  : "bg-yellow-700 text-black text-left mr-auto max-w-[80%]"
              }`}
            >
              {msg.text}
            </p>
          ))}
          {loading && (
            <p className="text-left text-yellow-300">{uiContent[language].typing}</p>
          )}
          {error && <p className="text-left text-red-500">{error}</p>}
        </div>

        {/* Input */}
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={uiContent[language].placeholder}
            className="flex-grow border border-gray-700 rounded-l px-3 py-2 bg-gray-800 text-white focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="bg-teal-600 text-white px-4 rounded-r hover:bg-teal-500 transition duration-300"
          >
            {uiContent[language].sendBtn}
          </button>
        </div>
      </div>

      {/* Multi-lingual helper */}
      <p className="mt-2 text-gray-300 text-sm text-center max-w-md">
        {uiContent[language].helper}
      </p>
    </div>
  );
}

export default Chatbot;