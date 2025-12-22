// src/components/Header.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiUser, FiHeart } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white shadow-md sticky top-0 z-50"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">HB</span>
            </div>
            <span className="text-2xl font-bold text-dark">HotelBooker</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary transition font-medium">
              Home
            </Link>
            <Link to="/hotels" className="text-gray-700 hover:text-primary transition font-medium">
              Hotels
            </Link>
            <Link to="/deals" className="text-gray-700 hover:text-primary transition font-medium">
              Deals
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary transition font-medium">
              Contact
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition">
              <FiHeart className="w-5 h-5" />
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border-2 border-gray-300 rounded-full hover:shadow-md transition">
              <FiMenu className="w-4 h-4" />
              <FiUser className="w-5 h-5" />
            </button>
            <button className="px-6 py-2 bg-gradient-to-r from-primary to-pink-600 text-white rounded-full hover:shadow-lg transition transform hover:scale-105">
              List Property
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden p-2"
          >
            {mobileMenu ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pb-4"
            >
              <Link to="/" className="block py-2 text-gray-700 hover:text-primary">Home</Link>
              <Link to="/hotels" className="block py-2 text-gray-700 hover:text-primary">Hotels</Link>
              <Link to="/deals" className="block py-2 text-gray-700 hover:text-primary">Deals</Link>
              <Link to="/contact" className="block py-2 text-gray-700 hover:text-primary">Contact</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;
