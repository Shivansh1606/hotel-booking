// src/pages/MyBookings.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  FiCalendar, FiMapPin, FiUser, FiX, FiEye, FiLoader
} from 'react-icons/fi';

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, confirmed, cancelled, completed

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.get('/bookings/');
      setBookings(response.data.bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      await api.delete(`/bookings/${bookingId}/cancel/`);
      // Update local state
      setBookings(bookings.map(b => 
        b.id === bookingId ? { ...b, status: 'cancelled' } : b
      ));
      alert('Booking cancelled successfully');
    } catch (error) {
      console.error('Error cancelling booking:', error);
      alert('Failed to cancel booking. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      case 'completed':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-24 pb-12 flex items-center justify-center">
          <FiLoader className="w-8 h-8 text-primary animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              My Bookings
            </h1>
            <p className="text-gray-600">View and manage your hotel reservations</p>
          </div>

          {/* Filter Tabs */}
          <div className="bg-white rounded-xl shadow-md p-2 mb-6 flex flex-wrap gap-2">
            {['all', 'confirmed', 'cancelled', 'completed'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-semibold transition capitalize ${
                  filter === status
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {status}
                {status === 'all' && ` (${bookings.length})`}
                {status !== 'all' && ` (${bookings.filter(b => b.status === status).length})`}
              </button>
            ))}
          </div>

          {/* Bookings List */}
          {filteredBookings.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCalendar className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No bookings found</h3>
              <p className="text-gray-600 mb-6">
                {filter === 'all' 
                  ? "You haven't made any bookings yet"
                  : `No ${filter} bookings found`}
              </p>
              <Link
                to="/hotels"
                className="inline-block px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-xl font-semibold hover:shadow-lg transition"
              >
                Browse Hotels
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
                >
                  <div className="md:flex">
                    {/* Hotel Image */}
                    {booking.hotel_image && (
                      <div className="md:w-1/3">
                        <img
                          src={booking.hotel_image}
                          alt={booking.hotel_name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Booking Details */}
                    <div className="flex-1 p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-2">
                            {booking.hotel_name}
                          </h3>
                          <div className="flex items-center space-x-2 text-gray-600 mb-2">
                            <FiMapPin className="w-4 h-4" />
                            <span className="text-sm">{booking.hotel_location}</span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>

                      {/* Booking Info Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Check-in</p>
                          <p className="font-semibold text-gray-800">{formatDate(booking.check_in)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Check-out</p>
                          <p className="font-semibold text-gray-800">{formatDate(booking.check_out)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Guests</p>
                          <p className="font-semibold text-gray-800">
                            {booking.adults + booking.children}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Rooms</p>
                          <p className="font-semibold text-gray-800">{booking.rooms}</p>
                        </div>
                      </div>

                      {/* Guest Details */}
                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <FiUser className="w-4 h-4" />
                          <span>
                            {booking.guest_first_name} {booking.guest_last_name} • {booking.guest_email}
                          </span>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div>
                          <p className="text-sm text-gray-500">Total Amount</p>
                          <p className="text-2xl font-bold text-primary">
                            ₹{parseFloat(booking.total_amount).toFixed(2)}
                          </p>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Link
                            to={`/booking-details/${booking.id}`}
                            state={{ booking }}
                            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition"
                          >
                            <FiEye className="w-4 h-4" />
                            <span>View</span>
                          </Link>

                          {booking.status === 'confirmed' && (
                            <button
                              onClick={() => handleCancelBooking(booking.id)}
                              className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100 transition"
                            >
                              <FiX className="w-4 h-4" />
                              <span>Cancel</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MyBookings;
