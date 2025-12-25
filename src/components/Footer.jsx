// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">HB</span>
              </div>
              <span className="text-2xl font-bold text-white">HotelBooker</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted partner for finding the perfect accommodation worldwide. Book with confidence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary rounded-full flex items-center justify-center transition">
                <FiFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary rounded-full flex items-center justify-center transition">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary rounded-full flex items-center justify-center transition">
                <FiInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary rounded-full flex items-center justify-center transition">
                <FiLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-primary transition">Home</Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-primary transition">Search Hotels</Link>
              </li>
              <li>
                <Link to="/deals" className="hover:text-primary transition">Special Deals</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="hover:text-primary transition">Help Center</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-primary transition">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-primary transition">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/cancellation" className="hover:text-primary transition">Cancellation Policy</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-primary transition">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FiMapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span>123 Hotel Street, New Delhi, India 110001</span>
              </li>
              <li className="flex items-center space-x-3">
                <FiPhone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:+911112345678" className="hover:text-primary transition">
                  +91 11 1234 5678
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FiMail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="mailto:support@hotelbooker.com" className="hover:text-primary transition">
                  support@hotelbooker.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-center md:text-left">
              © {currentYear} HotelBooker. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" alt="Mastercard" className="h-8 opacity-70 hover:opacity-100 transition" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-8 opacity-70 hover:opacity-100 transition" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="Amex" className="h-8 opacity-70 hover:opacity-100 transition" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
