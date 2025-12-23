// src/components/Header.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  FiMenu, FiX, FiUser, FiHeart, FiShoppingCart,
  FiSearch, FiChevronDown, FiLogOut, FiSettings,
  FiHome, FiGrid, FiTag, FiMail
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(); // Sample count
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home', icon: <FiHome /> },
    { path: '/hotels', label: 'Hotels', icon: <FiGrid /> },
    { path: '/deals', label: 'Deals', icon: <FiTag /> },
    { path: '/contact', label: 'Contact', icon: <FiMail /> }
  ];

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg' 
          : 'bg-gradient-to-r from-primary/90 to-pink-600/90 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg transition-all ${
                isScrolled 
                  ? 'bg-gradient-to-br from-primary to-pink-600 text-white' 
                  : 'bg-white text-primary'
              }`}
            >
              HB
            </motion.div>
            <div className="hidden md:block">
              <h1 className={`text-2xl font-bold transition-colors ${
                isScrolled ? 'text-gray-800' : 'text-white drop-shadow-lg'
              }`}>
                HotelBooker
              </h1>
              <p className={`text-xs transition-colors ${
                isScrolled ? 'text-gray-600' : 'text-white/90'
              }`}>
                Find Your Perfect Stay
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                  isActive(link.path)
                    ? isScrolled
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-white text-primary shadow-lg'
                    : isScrolled
                    ? 'text-gray-700 hover:bg-gray-100'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                <span className="text-lg">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/search')}
              className={`hidden md:block p-2.5 rounded-xl transition-all ${
                isScrolled
                  ? 'hover:bg-gray-100 text-gray-700'
                  : 'hover:bg-white/20 text-white'
              }`}
            >
              <FiSearch className="w-5 h-5" />
            </motion.button>

            {/* Wishlist Icon with Badge */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/wishlist')}
              className={`relative p-2.5 rounded-xl transition-all ${
                isScrolled
                  ? 'hover:bg-gray-100 text-gray-700'
                  : 'hover:bg-white/20 text-white'
              }`}
            >
              <FiHeart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg"
                >
                  {wishlistCount}
                </motion.span>
              )}
            </motion.button>

            {/* User Account */}
            <div className="relative">
              {isLoggedIn ? (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-semibold transition-all shadow-lg ${
                      isScrolled
                        ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        : 'bg-white text-primary hover:bg-white/90'
                    }`}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      JD
                    </div>
                    <span className="hidden md:inline">Account</span>
                    <FiChevronDown className={`w-4 h-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                  </motion.button>

                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl py-2 border border-gray-100"
                      >
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="font-semibold text-gray-800">John Doe</p>
                          <p className="text-sm text-gray-600">john@example.com</p>
                        </div>
                        <Link
                          to="/profile"
                          className="flex items-center space-x-2 px-4 py-2.5 hover:bg-gray-50 transition text-gray-700"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <FiUser className="w-4 h-4" />
                          <span>My Profile</span>
                        </Link>
                        <Link
                          to="/wishlist"
                          className="flex items-center space-x-2 px-4 py-2.5 hover:bg-gray-50 transition text-gray-700"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <FiHeart className="w-4 h-4" />
                          <span>Wishlist</span>
                        </Link>
                        <Link
                          to="/bookings"
                          className="flex items-center space-x-2 px-4 py-2.5 hover:bg-gray-50 transition text-gray-700"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <FiShoppingCart className="w-4 h-4" />
                          <span>My Bookings</span>
                        </Link>
                        <Link
                          to="/settings"
                          className="flex items-center space-x-2 px-4 py-2.5 hover:bg-gray-50 transition text-gray-700"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <FiSettings className="w-4 h-4" />
                          <span>Settings</span>
                        </Link>
                        <div className="border-t border-gray-100 mt-2 pt-2">
                          <button
                            onClick={handleLogout}
                            className="flex items-center space-x-2 px-4 py-2.5 hover:bg-red-50 transition text-red-600 w-full"
                          >
                            <FiLogOut className="w-4 h-4" />
                            <span>Logout</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg ${
                      isScrolled
                        ? 'bg-primary text-white hover:bg-pink-600'
                        : 'bg-white text-primary hover:bg-white/90'
                    }`}
                  >
                    <FiUser className="w-5 h-5" />
                    <span className="hidden md:inline">Account</span>
                  </motion.button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-2.5 rounded-xl transition-all ${
                isScrolled
                  ? 'hover:bg-gray-100 text-gray-700'
                  : 'hover:bg-white/20 text-white'
              }`}
            >
              {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-200 shadow-lg"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                    isActive(link.path)
                      ? 'bg-primary text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-xl">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              ))}
              
              <Link
                to="/wishlist"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-xl font-semibold text-gray-700 hover:bg-gray-100 transition-all"
              >
                <div className="flex items-center space-x-3">
                  <FiHeart className="text-xl" />
                  <span>Wishlist</span>
                </div>
                {wishlistCount > 0 && (
                  <span className="w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {!isLoggedIn && (
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-primary to-pink-600 text-white rounded-xl font-semibold shadow-lg">
                    <FiUser className="w-5 h-5" />
                    <span>Login / Sign Up</span>
                  </button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
