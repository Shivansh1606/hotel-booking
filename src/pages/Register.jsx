// src/pages/Register.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiMail, FiLock, FiUser, FiEye, FiEyeOff,
  FiArrowRight, FiPhone, FiArrowLeft
} from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (!acceptTerms) {
      alert('Please accept terms and conditions');
      return;
    }

    console.log('Register:', formData);
    navigate('/login');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
      {/* Background Blur Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-pink-500/10 to-transparent rounded-full blur-3xl"
        />
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left Side - Branding */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:flex flex-col h-full"
        >
          {/* Top bar with back button + logo */}
          <div className="flex items-center justify-between mb-10">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/70 hover:bg-white shadow-md text-gray-700 font-medium transition"
            >
              <FiArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <Link to="/" className="inline-flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-pink-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-xl">
                HB
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">HotelBooker</h1>
                <p className="text-xs text-gray-600">Find Your Perfect Stay</p>
              </div>
            </Link>
          </div>

          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Join Us Today! 🎉
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Create an account and unlock exclusive benefits.
            </p>

            <div className="space-y-4">
              {[
                { icon: '🎁', text: 'Exclusive Member Discounts' },
                { icon: '📱', text: 'Easy Booking Management' },
                { icon: '💎', text: 'Loyalty Rewards Program' },
                { icon: '🔔', text: 'Personalized Recommendations' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center space-x-3 text-gray-700"
                >
                  <span className="text-3xl">{item.icon}</span>
                  <span className="text-lg font-semibold">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mini footer */}
          <div className="mt-8 text-xs text-gray-500">
            © {new Date().getFullYear()} HotelBooker. All rights reserved.
          </div>
        </motion.div>

        {/* Right Side - Register Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-10"
        >
          {/* Top bar for mobile: back + logo */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center space-x-2 px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition"
            >
              <FiArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <Link to="/" className="inline-flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-pink-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-md">
                HB
              </div>
            </Link>
          </div>

          <div className="text-center lg:text-left mb-6">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Create Account
            </h3>
            <p className="text-gray-600">
              Sign up to start booking your dream stays.
            </p>
          </div>

          {/* Social Register */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button className="flex items-center justify-center space-x-2 px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-primary hover:bg-gray-50 transition font-semibold text-sm">
              <FcGoogle className="w-5 h-5" />
              <span>Google</span>
            </button>
            <button className="flex items-center justify-center space-x-2 px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-primary hover:bg-gray-50 transition font-semibold text-sm">
              <FaFacebook className="w-5 h-5 text-blue-600" />
              <span>Facebook</span>
            </button>
          </div>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-white text-gray-500 font-semibold">
                Or register with email
              </span>
            </div>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition"
                >
                  {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition"
                >
                  {showConfirmPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <label className="flex items-start space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="w-4 h-4 accent-primary rounded mt-0.5"
              />
              <span className="text-xs sm:text-sm text-gray-700">
                I agree to the{' '}
                <Link to="/terms" className="text-primary hover:text-pink-600 font-semibold">
                  Terms & Conditions
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-primary hover:text-pink-600 font-semibold">
                  Privacy Policy
                </Link>.
              </span>
            </label>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center space-x-2 px-6 py-3.5 bg-gradient-to-r from-primary to-pink-600 text-white rounded-xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition"
            >
              <span>Create Account</span>
              <FiArrowRight className="w-5 h-5" />
            </motion.button>
          </form>

          <p className="text-center mt-5 text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-primary hover:text-pink-600 font-semibold"
            >
              Login
            </Link>
          </p>

          {/* Bottom mini footer */}
          <div className="mt-6 text-[11px] text-gray-400 text-center">
            © {new Date().getFullYear()} HotelBooker ·
            <span className="mx-1">•</span>
            <Link to="/terms" className="hover:text-primary">
              Terms
            </Link>
            <span className="mx-1">•</span>
            <Link to="/privacy" className="hover:text-primary">
              Privacy
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
