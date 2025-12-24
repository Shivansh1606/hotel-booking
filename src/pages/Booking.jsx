// src/pages/Booking.jsx
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  FiUser, FiMail, FiPhone, FiCreditCard, FiCalendar,
  FiMapPin, FiStar, FiCheck, FiAlertCircle, FiArrowLeft,
  FiLock, FiShield
} from 'react-icons/fi';
import { allHotels } from '../data/hotelData';

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hotelId = location.state?.hotelId || 1;
  const hotel = allHotels.find((h) => h.id === hotelId);

  const [bookingData, setBookingData] = useState({
    // Guest Details
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
    
    // Booking Details
    checkIn: '',
    checkOut: '',
    guests: 2,
    rooms: 1,
    
    // Payment Details
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    paymentMethod: 'card'
  });

  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Calculate nights and total
  const calculateNights = () => {
    if (bookingData.checkIn && bookingData.checkOut) {
      const start = new Date(bookingData.checkIn);
      const end = new Date(bookingData.checkOut);
      const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      return nights > 0 ? nights : 0;
    }
    return 0;
  };

  const nights = calculateNights();
  const roomTotal = hotel.price * nights * bookingData.rooms;
  const taxesAndFees = roomTotal * 0.18; // 18% GST
  const totalAmount = roomTotal + taxesAndFees;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData({ ...bookingData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!agreedToTerms) {
      alert('Please accept terms and conditions');
      return;
    }

    // Navigate to confirmation page
    navigate('/booking-confirmation', {
      state: {
        bookingData,
        hotel,
        nights,
        totalAmount
      }
    });
  };

  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Hotel Not Found</h2>
          <button
            onClick={() => navigate('/hotels')}
            className="px-6 py-3 bg-primary text-white rounded-xl font-semibold"
          >
            Back to Hotels
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-primary mb-6 transition"
          >
            <FiArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back to Hotel Details</span>
          </button>

          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Complete Your Booking
            </h1>
            <p className="text-gray-600">Please fill in your details to confirm your reservation</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Left Column - Forms */}
              <div className="lg:col-span-2 space-y-6">
                {/* Guest Information */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                    <FiUser className="w-6 h-6 mr-3 text-primary" />
                    Guest Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={bookingData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition"
                        placeholder="John"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={bookingData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition"
                        placeholder="Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={bookingData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={bookingData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      name="specialRequests"
                      value={bookingData.specialRequests}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition resize-none"
                      placeholder="Any special requirements or preferences..."
                    />
                  </div>
                </div>

                {/* Booking Details */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                    <FiCalendar className="w-6 h-6 mr-3 text-primary" />
                    Booking Details
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Check-in Date *
                      </label>
                      <input
                        type="date"
                        name="checkIn"
                        value={bookingData.checkIn}
                        onChange={handleInputChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Check-out Date *
                      </label>
                      <input
                        type="date"
                        name="checkOut"
                        value={bookingData.checkOut}
                        onChange={handleInputChange}
                        required
                        min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Number of Guests *
                      </label>
                      <select
                        name="guests"
                        value={bookingData.guests}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition"
                      >
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Number of Rooms *
                      </label>
                      <select
                        name="rooms"
                        value={bookingData.rooms}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition"
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Room' : 'Rooms'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                    <FiCreditCard className="w-6 h-6 mr-3 text-primary" />
                    Payment Information
                  </h2>

                  {/* Payment Method Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <button
                      type="button"
                      onClick={() => setBookingData({ ...bookingData, paymentMethod: 'card' })}
                      className={`p-4 border-2 rounded-xl transition ${
                        bookingData.paymentMethod === 'card'
                          ? 'border-primary bg-pink-50'
                          : 'border-gray-200 hover:border-primary'
                      }`}
                    >
                      <FiCreditCard className="w-6 h-6 mx-auto mb-2 text-primary" />
                      <p className="font-semibold text-sm">Credit/Debit Card</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setBookingData({ ...bookingData, paymentMethod: 'upi' })}
                      className={`p-4 border-2 rounded-xl transition ${
                        bookingData.paymentMethod === 'upi'
                          ? 'border-primary bg-pink-50'
                          : 'border-gray-200 hover:border-primary'
                      }`}
                    >
                      <FiShield className="w-6 h-6 mx-auto mb-2 text-primary" />
                      <p className="font-semibold text-sm">UPI Payment</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setBookingData({ ...bookingData, paymentMethod: 'hotel' })}
                      className={`p-4 border-2 rounded-xl transition ${
                        bookingData.paymentMethod === 'hotel'
                          ? 'border-primary bg-pink-50'
                          : 'border-gray-200 hover:border-primary'
                      }`}
                    >
                      <FiMapPin className="w-6 h-6 mx-auto mb-2 text-primary" />
                      <p className="font-semibold text-sm">Pay at Hotel</p>
                    </button>
                  </div>

                  {/* Card Details (only if card payment selected) */}
                  {bookingData.paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Card Number *
                        </label>
                        <div className="relative">
                          <FiCreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            name="cardNumber"
                            value={bookingData.cardNumber}
                            onChange={handleInputChange}
                            required={bookingData.paymentMethod === 'card'}
                            maxLength={19}
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition"
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Cardholder Name *
                        </label>
                        <input
                          type="text"
                          name="cardName"
                          value={bookingData.cardName}
                          onChange={handleInputChange}
                          required={bookingData.paymentMethod === 'card'}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition"
                          placeholder="JOHN DOE"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Expiry Date *
                          </label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={bookingData.expiryDate}
                            onChange={handleInputChange}
                            required={bookingData.paymentMethod === 'card'}
                            maxLength={5}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition"
                            placeholder="MM/YY"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            CVV *
                          </label>
                          <div className="relative">
                            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                              type="text"
                              name="cvv"
                              value={bookingData.cvv}
                              onChange={handleInputChange}
                              required={bookingData.paymentMethod === 'card'}
                              maxLength={3}
                              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition"
                              placeholder="123"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {bookingData.paymentMethod === 'upi' && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        UPI ID *
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition"
                        placeholder="yourname@upi"
                      />
                    </div>
                  )}

                  {bookingData.paymentMethod === 'hotel' && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                      <div className="flex items-start space-x-3">
                        <FiAlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-blue-800 mb-1">Pay at Hotel</p>
                          <p className="text-sm text-blue-700">
                            You can pay directly at the hotel during check-in. Please carry a valid ID proof.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Terms & Conditions */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="w-5 h-5 accent-primary rounded mt-0.5"
                    />
                    <span className="text-sm text-gray-700">
                      I agree to the{' '}
                      <a href="/terms" className="text-primary hover:underline font-semibold">
                        Terms & Conditions
                      </a>{' '}
                      and{' '}
                      <a href="/privacy" className="text-primary hover:underline font-semibold">
                        Privacy Policy
                      </a>
                      . I understand the cancellation policy and payment terms.
                    </span>
                  </label>
                </div>
              </div>

              {/* Right Column - Booking Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Booking Summary</h2>

                  {/* Hotel Info */}
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <img
                      src={hotel.images[0]}
                      alt={hotel.name}
                      className="w-full h-40 object-cover rounded-xl mb-4"
                    />
                    <h3 className="font-bold text-lg text-gray-800 mb-2">{hotel.name}</h3>
                    <div className="flex items-start text-gray-600 text-sm mb-2">
                      <FiMapPin className="w-4 h-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                      <span>{hotel.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center bg-primary text-white px-2 py-1 rounded-lg text-sm">
                        <FiStar className="w-3 h-3 fill-current mr-1" />
                        <span className="font-semibold">{hotel.rating}</span>
                      </div>
                      <span className="text-sm text-gray-600">({hotel.reviewCount} reviews)</span>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Check-in</span>
                      <span className="font-semibold text-gray-800">
                        {bookingData.checkIn || 'Select date'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Check-out</span>
                      <span className="font-semibold text-gray-800">
                        {bookingData.checkOut || 'Select date'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Guests</span>
                      <span className="font-semibold text-gray-800">{bookingData.guests}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Rooms</span>
                      <span className="font-semibold text-gray-800">{bookingData.rooms}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Nights</span>
                      <span className="font-semibold text-gray-800">{nights || 0}</span>
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        ₹{hotel.price} × {nights || 0} nights × {bookingData.rooms} room(s)
                      </span>
                      <span className="font-semibold text-gray-800">₹{roomTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Taxes & Fees (18%)</span>
                      <span className="font-semibold text-gray-800">
                        ₹{taxesAndFees.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-bold text-gray-800">Total Amount</span>
                    <span className="text-2xl font-bold text-primary">
                      ₹{totalAmount.toLocaleString()}
                    </span>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!agreedToTerms}
                    className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition ${
                      agreedToTerms
                        ? 'bg-gradient-to-r from-primary to-pink-600 text-white hover:shadow-xl'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Confirm Booking
                  </motion.button>

                  <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-gray-600">
                    <FiShield className="w-4 h-4 text-green-600" />
                    <span>Secure Payment • SSL Encrypted</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Booking;
