import schemeImg from "../assets/scheme.jpg";
import { motion } from "framer-motion";

const schemes = [
  {
    name: "PM-Kisan Samman Nidhi 🌾",
    description: "Provides ₹6,000/year to small and marginal farmers in 3 installments directly to their bank accounts.",
    eligibility: "Landholding farmers with cultivable land up to 2 hectares.",
    tip: "Ensure your bank account and Aadhaar are linked for seamless payment.",
  },
  {
    name: "Pradhan Mantri Fasal Bima Yojana (PMFBY) 🌱",
    description: "Crop insurance scheme to protect farmers from losses due to natural calamities, pests, and diseases.",
    eligibility: "All farmers growing insurable crops in notified areas.",
    tip: "Enroll before sowing season; maintain records of crop area and inputs.",
  },
  {
    name: "Kisan Credit Card (KCC) 💳",
    description: "Provides farmers with timely credit for crop production, working capital, and allied activities at low interest rates.",
    eligibility: "Small, marginal, and large farmers with a valid land record.",
    tip: "Use the credit responsibly for farm inputs and avoid over-borrowing.",
  },
  {
    name: "Soil Health Card Scheme 🌱",
    description: "Helps farmers understand soil nutrients and improve soil fertility for higher crop yield.",
    eligibility: "All farmers in India.",
    tip: "Test soil regularly and follow the fertilizer recommendations provided.",
  },
  {
    name: "National Agriculture Market (eNAM) 💻",
    description: "Digital platform to sell agricultural produce at competitive prices across states.",
    eligibility: "Farmers registered with notified mandis and eNAM platform.",
    tip: "List crops online for better pricing and transparent transactions.",
  },
];

function Schemes() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-teal-800 text-white flex flex-col items-center px-6 py-12">
      
      {/* Hero Image */}
      <motion.img
        src={schemeImg}
        alt="Schemes"
        className="mx-auto mb-6 rounded-lg shadow-2xl w-2/5 md:w-1/4 border-2 border-yellow-400"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Title */}
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-yellow-300 mb-4 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        📢 Government Schemes & Alerts for Farmers
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        className="mt-2 text-gray-200 text-center max-w-3xl mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        Stay informed about subsidies, insurance, credit, and welfare programs. These schemes help improve income, reduce risk, and ensure sustainable farming.
      </motion.p>

      {/* Scheme Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        {schemes.map((scheme, index) => (
          <motion.div
            key={index}
            className="bg-green-900/70 p-6 rounded-xl shadow-xl hover:scale-105 transition-transform duration-300"
          >
            <h3 className="font-bold text-yellow-300 text-xl mb-2">{scheme.name}</h3>
            <p className="text-gray-200 mb-2">{scheme.description}</p>
            <p className="text-gray-300 mb-2"><span className="font-semibold">Eligibility:</span> {scheme.eligibility}</p>
            <p className="text-gray-400"><span className="font-semibold">Tip:</span> {scheme.tip}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer Note */}
      <motion.p
        className="mt-12 text-gray-300 text-center max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        🌱 Pro Tip: Keep track of deadlines and documents for each scheme. Utilize these programs to maximize productivity and income from your farm.
      </motion.p>
    </div>
  );
}

export default Schemes;
