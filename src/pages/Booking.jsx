// src/pages/Booking.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  FiUser, FiMail, FiPhone, FiCalendar,
  FiMapPin, FiUsers, FiAlertCircle
} from 'react-icons/fi';

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  
  const hotelData = location.state?.hotel;
  const initialAdults = location.state?.adults || 2;
  const initialChildren = location.state?.children || 0;
  const initialRooms = location.state?.rooms || 1;

  useEffect(() => {
    if (!user) {
      navigate('/login', { 
        state: { from: location },
        replace: true 
      });
    }
  }, [user, navigate, location]);

  const [bookingData, setBookingData] = useState({
    hotel_name: hotelData?.name || 'Grand Hotel',
    hotel_location: hotelData?.location || 'Mumbai, India',
    hotel_image: hotelData?.image || '',
    room_type: 'Deluxe Room',
    
    check_in: '',
    check_out: '',
    adults: initialAdults,
    children: initialChildren,
    rooms: initialRooms,
    nights: 0,
    
    price_per_night: hotelData?.price || 5000,
    total_amount: 0,
    
    guest_first_name: user?.first_name || '',
    guest_last_name: user?.last_name || '',
    guest_email: user?.email || '',
    guest_phone: user?.phone || '',
    special_requests: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Calculate nights
  const calculateNights = () => {
    if (bookingData.check_in && bookingData.check_out) {
      const start = new Date(bookingData.check_in);
      const end = new Date(bookingData.check_out);
      const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      return nights > 0 ? nights : 0;
    }
    return 0;
  };

  // Update total when dates change
  useEffect(() => {
    const nights = calculateNights();
    const roomTotal = bookingData.price_per_night * nights * bookingData.rooms;
    const taxesAndFees = roomTotal * 0.18;
    const total = roomTotal + taxesAndFees;
    
    setBookingData(prev => ({
      ...prev,
      nights,
      total_amount: total
    }));
  }, [bookingData.check_in, bookingData.check_out, bookingData.rooms, bookingData.price_per_night]);

  const updateCount = (type, action) => {
    setBookingData(prev => {
      const newValue = action === 'increment' 
        ? prev[type] + 1 
        : Math.max(type === 'adults' ? 1 : type === 'rooms' ? 1 : 0, prev[type] - 1);
      
      return { ...prev, [type]: newValue };
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData({ ...bookingData, [name]: value });
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    // Validate dates
    if (!bookingData.check_in || !bookingData.check_out) {
      setErrors({ general: 'Please select check-in and check-out dates' });
      setLoading(false);
      return;
    }

    const nights = calculateNights();
    if (nights <= 0) {
      setErrors({ general: 'Check-out date must be after check-in date' });
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/bookings/create/', {
        ...bookingData,
        nights: nights,
        total_amount: bookingData.total_amount.toFixed(2)
      });
      
      navigate('/booking-confirmation', {
        state: {
          booking: response.data.booking
        }
      });
    } catch (error) {
      console.error('Booking error:', error);
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: error.response?.data?.message || 'Booking failed. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  const nights = calculateNights();
  const roomTotal = bookingData.price_per_night * nights * bookingData.rooms;
  const taxesAndFees = roomTotal * 0.18;
  const totalAmount = roomTotal + taxesAndFees;

  // Get today's date for min date validation
  const today = new Date().toISOString().split('T')[0];

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Complete Your Booking
            </h1>
            <p className="text-gray-600">Please fill in your details to confirm your reservation</p>
          </div>

          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-2">
              <FiAlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <span className="text-red-600">{errors.general}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Left Column */}
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
                        name="guest_first_name"
                        value={bookingData.guest_first_name}
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
                        name="guest_last_name"
                        value={bookingData.guest_last_name}
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
                          name="guest_email"
                          value={bookingData.guest_email}
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
                          name="guest_phone"
                          value={bookingData.guest_phone}
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
                      name="special_requests"
                      value={bookingData.special_requests}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition resize-none"
                      placeholder="Any special requirements..."
                    />
                  </div>
                </div>

                {/* Booking Details */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                    <FiCalendar className="w-6 h-6 mr-3 text-primary" />
                    Booking Details
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Check-in Date *
                      </label>
                      <input
                        type="date"
                        name="check_in"
                        value={bookingData.check_in}
                        onChange={handleInputChange}
                        min={today}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Check-out Date *
                      </label>
                      <input
                        type="date"
                        name="check_out"
                        value={bookingData.check_out}
                        onChange={handleInputChange}
                        min={bookingData.check_in || today}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Adults */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Adults
                      </label>
                      <div className="flex items-center space-x-3">
                        <button
                          type="button"
                          onClick={() => updateCount('adults', 'decrement')}
                          className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold transition"
                        >
                          -
                        </button>
                        <span className="flex-1 text-center font-bold text-lg">{bookingData.adults}</span>
                        <button
                          type="button"
                          onClick={() => updateCount('adults', 'increment')}
                          className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold transition"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Children */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Children
                      </label>
                      <div className="flex items-center space-x-3">
                        <button
                          type="button"
                          onClick={() => updateCount('children', 'decrement')}
                          className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold transition"
                        >
                          -
                        </button>
                        <span className="flex-1 text-center font-bold text-lg">{bookingData.children}</span>
                        <button
                          type="button"
                          onClick={() => updateCount('children', 'increment')}
                          className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold transition"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Rooms */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Rooms
                      </label>
                      <div className="flex items-center space-x-3">
                        <button
                          type="button"
                          onClick={() => updateCount('rooms', 'decrement')}
                          className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold transition"
                        >
                          -
                        </button>
                        <span className="flex-1 text-center font-bold text-lg">{bookingData.rooms}</span>
                        <button
                          type="button"
                          onClick={() => updateCount('rooms', 'increment')}
                          className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold transition"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                  <h2 className="text-xl font-bold text-gray-800 mb-6">
                    Booking Summary
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Check-in</span>
                      <span className="font-semibold text-gray-800">
                        {bookingData.check_in || 'Select date'}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Check-out</span>
                      <span className="font-semibold text-gray-800">
                        {bookingData.check_out || 'Select date'}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Guests</span>
                      <span className="font-semibold text-gray-800">
                        {bookingData.adults + bookingData.children}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Rooms</span>
                      <span className="font-semibold text-gray-800">{bookingData.rooms}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Nights</span>
                      <span className="font-semibold text-gray-800">{nights}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4 space-y-2 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>₹{bookingData.price_per_night} × {nights} nights × {bookingData.rooms} room(s)</span>
                      <span>₹{roomTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Taxes & Fees (18%)</span>
                      <span>₹{taxesAndFees.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-800">Total</span>
                      <span className="text-2xl font-bold text-primary">
                        ₹{totalAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !bookingData.check_in || !bookingData.check_out}
                    className="w-full py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Processing...' : 'Confirm Booking'}
                  </button>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    By confirming, you agree to our Terms & Conditions
                  </p>
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
