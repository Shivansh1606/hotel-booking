// src/pages/BookingConfirmation.jsx
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  FiCheckCircle, FiMapPin, FiCalendar, FiUsers,
  FiMail, FiPhone, FiDownload, FiPrinter,
  FiHome, FiArrowRight, FiCreditCard, FiClock
} from 'react-icons/fi';

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookingData, hotel, nights, totalAmount } = location.state || {};

  // Generate random booking ID
  const bookingId = `HB${Date.now().toString().slice(-8)}`;

  useEffect(() => {
    // Redirect if no booking data
    if (!bookingData || !hotel) {
      navigate('/');
      return;
    }

    // Trigger confetti animation
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, [bookingData, hotel, navigate]);

  const handleDownload = () => {
    alert('Booking confirmation will be downloaded as PDF');
  };

  const handlePrint = () => {
    window.print();
  };

  if (!bookingData || !hotel) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <Header />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-block"
            >
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <FiCheckCircle className="w-14 h-14 text-white" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-3"
            >
              Booking Confirmed! 🎉
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-600 mb-2"
            >
              Your reservation has been successfully confirmed
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-white rounded-full shadow-lg"
            >
              <span className="text-sm font-semibold text-gray-600">Booking ID:</span>
              <span className="text-lg font-bold text-primary">{bookingId}</span>
            </motion.div>
          </motion.div>

          {/* Main Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-6"
          >
            {/* Hotel Information */}
            <div className="p-6 sm:p-8 border-b border-gray-200">
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={hotel.images[0]}
                  alt={hotel.name}
                  className="w-full md:w-48 h-48 object-cover rounded-2xl"
                />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{hotel.name}</h2>
                  <div className="flex items-start text-gray-600 mb-4">
                    <FiMapPin className="w-5 h-5 mr-2 mt-1 text-primary flex-shrink-0" />
                    <span>{hotel.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold">
                      {hotel.propertyType || 'Resort'}
                    </span>
                    {hotel.featured && (
                      <span className="px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-semibold">
                        ⭐ Featured
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div className="p-6 sm:p-8 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Booking Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FiCalendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Check-in</p>
                    <p className="font-bold text-gray-800">
                      {new Date(bookingData.checkIn).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                    <p className="text-sm text-gray-600">After 2:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FiCalendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Check-out</p>
                    <p className="font-bold text-gray-800">
                      {new Date(bookingData.checkOut).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                    <p className="text-sm text-gray-600">Before 11:00 AM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FiUsers className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Guests</p>
                    <p className="font-bold text-gray-800">
                      {bookingData.guests} Guest{bookingData.guests > 1 ? 's' : ''}
                    </p>
                    <p className="text-sm text-gray-600">
                      {bookingData.rooms} Room{bookingData.rooms > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FiClock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Duration</p>
                    <p className="font-bold text-gray-800">
                      {nights} Night{nights > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Guest Information */}
            <div className="p-6 sm:p-8 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Guest Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Name</p>
                  <p className="font-semibold text-gray-800">
                    {bookingData.firstName} {bookingData.lastName}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Email</p>
                  <p className="font-semibold text-gray-800 flex items-center">
                    <FiMail className="w-4 h-4 mr-2 text-primary" />
                    {bookingData.email}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Phone</p>
                  <p className="font-semibold text-gray-800 flex items-center">
                    <FiPhone className="w-4 h-4 mr-2 text-primary" />
                    {bookingData.phone}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Payment Method</p>
                  <p className="font-semibold text-gray-800 flex items-center">
                    <FiCreditCard className="w-4 h-4 mr-2 text-primary" />
                    {bookingData.paymentMethod === 'card' ? 'Credit/Debit Card' : 
                     bookingData.paymentMethod === 'upi' ? 'UPI Payment' : 'Pay at Hotel'}
                  </p>
                </div>
              </div>

              {bookingData.specialRequests && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-1">Special Requests</p>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                    {bookingData.specialRequests}
                  </p>
                </div>
              )}
            </div>

            {/* Payment Summary */}
            <div className="p-6 sm:p-8 bg-gray-50">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Payment Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>
                    ₹{hotel.price} × {nights} night{nights > 1 ? 's' : ''} × {bookingData.rooms} room{bookingData.rooms > 1 ? 's' : ''}
                  </span>
                  <span className="font-semibold">
                    ₹{(hotel.price * nights * bookingData.rooms).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Taxes & Fees (18%)</span>
                  <span className="font-semibold">
                    ₹{(totalAmount - (hotel.price * nights * bookingData.rooms)).toLocaleString()}
                  </span>
                </div>
                <div className="pt-3 border-t-2 border-gray-300 flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-800">Total Amount</span>
                  <span className="text-2xl font-bold text-primary">
                    ₹{totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              {bookingData.paymentMethod === 'hotel' && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <p className="text-sm text-blue-800">
                    <strong>Payment Due:</strong> Pay directly at the hotel during check-in
                  </p>
                </div>
              )}

              {bookingData.paymentMethod !== 'hotel' && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                  <p className="text-sm text-green-800">
                    <strong>Payment Status:</strong> Successfully Paid
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDownload}
              className="flex items-center justify-center space-x-2 px-6 py-4 bg-white text-gray-800 rounded-xl font-semibold shadow-lg hover:shadow-xl transition border-2 border-gray-200"
            >
              <FiDownload className="w-5 h-5" />
              <span>Download PDF</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePrint}
              className="flex items-center justify-center space-x-2 px-6 py-4 bg-white text-gray-800 rounded-xl font-semibold shadow-lg hover:shadow-xl transition border-2 border-gray-200"
            >
              <FiPrinter className="w-5 h-5" />
              <span>Print</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/')}
              className="flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-primary to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition"
            >
              <FiHome className="w-5 h-5" />
              <span>Back to Home</span>
            </motion.button>
          </motion.div>

          {/* Important Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-2xl shadow-lg p-6 sm:p-8"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">What's Next?</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <FiMail className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">Confirmation Email</p>
                  <p className="text-sm text-gray-600">
                    A confirmation email has been sent to {bookingData.email} with all booking details
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <FiCheckCircle className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">Prepare for Check-in</p>
                  <p className="text-sm text-gray-600">
                    Please carry a valid government ID and this booking confirmation
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <FiPhone className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">Need Help?</p>
                  <p className="text-sm text-gray-600">
                    Contact us at support@hotelbooker.com or call +91 98765 43210
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center">
                Free cancellation available up to 48 hours before check-in
              </p>
            </div>
          </motion.div>

          {/* Explore More */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-600 mb-4">Looking for more amazing stays?</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/hotels')}
              className="inline-flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-primary to-pink-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition"
            >
              <span>Explore More Hotels</span>
              <FiArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookingConfirmation;
