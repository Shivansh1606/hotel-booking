// src/pages/BookingConfirmation.jsx
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FiCheckCircle, FiCalendar, FiMapPin, FiUser, FiMail, FiPhone, FiDownload } from 'react-icons/fi';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;

  if (!booking) {
    navigate('/');
    return null;
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDownloadPDF = () => {
    // Implement PDF download functionality
    alert('PDF download feature coming soon!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <FiCheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Booking Confirmed!
            </h1>
            <p className="text-gray-600 text-lg">
              Your reservation has been successfully confirmed
            </p>
          </div>

          {/* Booking Details Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
            {/* Hotel Image */}
            {booking.hotel_image && (
              <img
                src={booking.hotel_image}
                alt={booking.hotel_name}
                className="w-full h-64 object-cover"
              />
            )}

            <div className="p-6 md:p-8">
              {/* Booking ID */}
              <div className="bg-primary bg-opacity-10 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Booking ID</p>
                    <p className="text-lg font-bold text-gray-800">{booking.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-1">Status</p>
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                      {booking.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Hotel Details */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {booking.hotel_name}
                </h2>
                <div className="flex items-center space-x-2 text-gray-600">
                  <FiMapPin className="w-5 h-5" />
                  <span>{booking.hotel_location}</span>
                </div>
              </div>

              {/* Booking Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Check-in */}
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3 mb-2">
                    <FiCalendar className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-gray-800">Check-in</span>
                  </div>
                  <p className="text-gray-600">{formatDate(booking.check_in)}</p>
                </div>

                {/* Check-out */}
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3 mb-2">
                    <FiCalendar className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-gray-800">Check-out</span>
                  </div>
                  <p className="text-gray-600">{formatDate(booking.check_out)}</p>
                </div>

                {/* Guests */}
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3 mb-2">
                    <FiUser className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-gray-800">Guests</span>
                  </div>
                  <p className="text-gray-600">
                    {booking.adults} Adults, {booking.children} Children
                  </p>
                </div>

                {/* Rooms */}
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3 mb-2">
                    <FiUser className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-gray-800">Rooms</span>
                  </div>
                  <p className="text-gray-600">{booking.rooms} Room(s)</p>
                </div>
              </div>

              {/* Guest Details */}
              <div className="border-t pt-6 mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Guest Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <FiUser className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">
                      {booking.guest_first_name} {booking.guest_last_name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FiMail className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{booking.guest_email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FiPhone className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{booking.guest_phone}</span>
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              {booking.special_requests && (
                <div className="border-t pt-6 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Special Requests</h3>
                  <p className="text-gray-600">{booking.special_requests}</p>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Price Breakdown</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>₹{booking.price_per_night} × {booking.nights} nights × {booking.rooms} room(s)</span>
                    <span>₹{(booking.price_per_night * booking.nights * booking.rooms).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Taxes & Fees (18%)</span>
                    <span>₹{(booking.total_amount * 0.18 / 1.18).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-gray-800 border-t pt-2 mt-2">
                    <span>Total Paid</span>
                    <span className="text-primary">₹{parseFloat(booking.total_amount).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <button
              onClick={handleDownloadPDF}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-primary hover:text-primary transition"
            >
              <FiDownload className="w-5 h-5" />
              <span>Download PDF</span>
            </button>

            <Link
              to="/bookings"
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-primary hover:text-primary transition"
            >
              <span>View All Bookings</span>
            </Link>

            <Link
              to="/"
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-xl font-semibold hover:shadow-lg transition"
            >
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Confirmation Email Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-blue-800 text-center">
              📧 A confirmation email has been sent to <strong>{booking.guest_email}</strong>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookingConfirmation;
