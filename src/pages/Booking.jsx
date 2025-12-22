// src/pages/Booking.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { FiCheck, FiCreditCard, FiUser, FiMail, FiPhone } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Booking = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      // Process payment and confirm booking
      setBookingConfirmed(true);
    }
  };

  if (bookingConfirmed) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-3xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 shadow-2xl text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCheck className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Booking Confirmed!
            </h1>
            <p className="text-gray-600 mb-2">
              Booking ID: <span className="font-semibold">HB{Date.now()}</span>
            </p>
            <p className="text-gray-600 mb-8">
              A confirmation email has been sent to {formData.email}
            </p>
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="font-semibold mb-4">Booking Details</h3>
              <div className="space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-gray-600">Guest Name:</span>
                  <span className="font-semibold">{formData.firstName} {formData.lastName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-semibold">{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-semibold">{formData.phone}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl font-semibold hover:bg-gray-300 transition"
              >
                Back to Home
              </button>
              <button className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-pink-600 transition">
                View Booking
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center ${step >= 1 ? 'text-primary' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                step >= 1 ? 'bg-primary text-white' : 'bg-gray-200'
              }`}>
                1
              </div>
              <span className="ml-2 hidden sm:inline">Guest Details</span>
            </div>
            <div className="w-16 h-1 bg-gray-300"></div>
            <div className={`flex items-center ${step >= 2 ? 'text-primary' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                step >= 2 ? 'bg-primary text-white' : 'bg-gray-200'
              }`}>
                2
              </div>
              <span className="ml-2 hidden sm:inline">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <form onSubmit={handleSubmit}>
                {step === 1 ? (
                  <>
                    <h2 className="text-2xl font-bold mb-6">Guest Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">First Name *</label>
                        <div className="relative">
                          <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition"
                            placeholder="John"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Last Name *</label>
                        <div className="relative">
                          <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition"
                            placeholder="Doe"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-semibold mb-2">Email *</label>
                      <div className="relative">
                        <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition"
                          placeholder="john.doe@example.com"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-semibold mb-2">Phone Number *</label>
                      <div className="relative">
                        <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-semibold mb-2">Special Requests (Optional)</label>
                      <textarea
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition"
                        placeholder="Any special requests or preferences..."
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold mb-6">Payment Information</h2>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-semibold mb-2">Card Number *</label>
                      <div className="relative">
                        <FiCreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          required
                          maxLength="19"
                          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-semibold mb-2">Cardholder Name *</label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition"
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Expiry Date *</label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          required
                          placeholder="MM/YY"
                          maxLength="5"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">CVV *</label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          required
                          maxLength="3"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition"
                          placeholder="123"
                        />
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                      <p className="text-sm text-blue-800">
                        <strong>Secure Payment:</strong> Your payment information is encrypted and secure. We never store your card details.
                      </p>
                    </div>
                  </>
                )}

                <div className="flex gap-4">
                  {step === 2 && (
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 py-4 bg-gray-200 text-gray-800 rounded-xl font-semibold hover:bg-gray-300 transition"
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="submit"
                    className="flex-1 py-4 bg-gradient-to-r from-primary to-pink-600 text-white rounded-xl font-semibold hover:shadow-xl transition transform hover:scale-105"
                  >
                    {step === 1 ? 'Continue to Payment' : 'Confirm Booking'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl p-6 shadow-lg sticky top-24"
            >
              <h3 className="text-xl font-bold mb-4">Booking Summary</h3>
              
              <div className="mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
                  alt="Hotel"
                  className="w-full h-40 object-cover rounded-xl mb-3"
                />
                <h4 className="font-semibold text-lg">The Grand Palace Hotel</h4>
                <p className="text-gray-600 text-sm">Deluxe Room</p>
              </div>

              <div className="space-y-3 py-4 border-t border-b mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Check-in:</span>
                  <span className="font-semibold">25 Dec 2025</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Check-out:</span>
                  <span className="font-semibold">27 Dec 2025</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Guests:</span>
                  <span className="font-semibold">2 Adults</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Nights:</span>
                  <span className="font-semibold">2</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">₹3,500 × 2 nights</span>
                  <span>₹7,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service fee</span>
                  <span>₹700</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes</span>
                  <span>₹770</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold pt-4 border-t">
                <span>Total</span>
                <span className="text-primary">₹8,470</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
