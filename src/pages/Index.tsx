import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-green-400 via-green-500 to-yellow-200 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl bg-white/30 backdrop-blur-xl rounded-xl shadow-lg p-6 sm:p-10 text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent mb-4"
        >
          🌱 Krishi Sakhi
        </motion.h1>
        <div className="space-y-1 mb-6">
          <p className="font-bold text-foreground text-lg">Your Smart Farming Assistant</p>
          <p className="font-bold text-foreground text-lg">Helping Farmers with Crop Guidance, Market Prices, and Alerts</p>
          <p className="font-bold text-foreground text-lg">Designed for both Smartphone and Non-Smartphone users</p>
        </div>
        <div className="space-y-1 mb-8">
          <p className="italic text-foreground/90">നിങ്ങളുടെ സ്മാർട്ട് കൃഷി സഹായി</p>
          <p className="italic text-foreground/90">വിള മാർഗ്ഗനിർദ്ദേശം, മാർക്കറ്റ് വിലകൾ, മുന്നറിയിപ്പുകൾ</p>
          <p className="italic text-foreground/90">സ്മാർട്ട്‌ഫോൺ ഉള്ളവർക്കും ഇല്ലാത്തവർക്കും</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/login')}
          className="px-6 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-green-500 to-lime-500 shadow-md"
        >
          Login to get started
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Index;
