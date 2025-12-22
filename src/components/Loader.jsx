// src/components/Loader.jsx - Alternative Style
import { motion } from 'framer-motion';

const Loader = ({ fullScreen = true }) => {
  if (fullScreen) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="relative">
          {/* Outer Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-gray-200 border-t-primary rounded-full"
          />
          
          {/* Center Logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">HB</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Inline Loader (for buttons, cards etc)
  return (
    <div className="inline-flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-6 h-6 border-2 border-gray-200 border-t-primary rounded-full"
      />
    </div>
  );
};

export default Loader;
