// src/components/Header.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiLogOut, FiMenu, FiX, FiHeart, FiShoppingBag } from 'react-icons/fi';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">HB</span>
            </div>
            <span className="text-xl font-bold text-gray-800">HotelBooker</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary transition">
              Home
            </Link>
            <Link to="/hotels" className="text-gray-700 hover:text-primary transition">
              Hotels
            </Link>
            <Link to="/deals" className="text-gray-700 hover:text-primary transition">
              Deals
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary transition">
              Contact
            </Link>
          </nav>

          {/* User Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/favorites"
                  className="p-2 text-gray-700 hover:text-primary transition"
                  title="Favorites"
                >
                  <FiHeart className="w-6 h-6" />
                </Link>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {user.first_name?.[0] || user.email[0].toUpperCase()}
                      </span>
                    </div>
                    <span className="text-gray-800 font-medium">
                      {user.first_name || user.email.split('@')[0]}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50">
                      <Link
                        to="/profile"
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 transition"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <FiUser className="w-5 h-5" />
                        <span>Profile</span>
                      </Link>
                      <Link
                        to="/bookings"
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 transition"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <FiShoppingBag className="w-5 h-5" />
                        <span>My Bookings</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-red-600 hover:bg-gray-100 transition"
                      >
                        <FiLogOut className="w-5 h-5" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-700 hover:text-primary transition font-semibold"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-xl font-semibold hover:shadow-lg transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-700"
          >
            {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                Home
              </Link>
              <Link to="/hotels" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                Hotels
              </Link>
              <Link to="/deals" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                Deals
              </Link>
              <Link to="/contact" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                Contact
              </Link>

              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/bookings"
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    My Bookings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-left text-red-600 hover:bg-gray-100 rounded-lg"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 bg-primary text-white hover:bg-pink-600 rounded-lg text-center"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
