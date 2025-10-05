import { motion } from "framer-motion";

function Footer() {
  return (
    <motion.footer
      className="bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 text-white text-center py-4 mt-10 shadow-inner"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, type: 'spring' }}
    >
      © 2025 Smart Farmer Project | SIH Demo 🌌
    </motion.footer>
  );
}

export default Footer;
