// src/pages/HotelDetails.jsx
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, Zoom } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  FiStar, FiMapPin, FiWifi, FiCoffee, 
  FiPhone, FiMail, FiClock, FiCheck, 
  FiX, FiShare2, FiHeart, FiNavigation, 
  FiUsers, FiCalendar, FiArrowRight
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getHotelById } from '../data/hotelData';

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState({ adults: 2, children: 0 });
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const hotelData = getHotelById(id);
      if (hotelData) {
        setHotel(hotelData);
        setSelectedRoom(hotelData.rooms[0]);
      }
      setLoading(false);
    }, 500);

    // Scroll to top
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading hotel details...</p>
        </div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-20 max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="bg-white rounded-2xl p-12 shadow-lg">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiX className="w-10 h-10 text-red-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Hotel Not Found
            </h1>
            <p className="text-gray-600 mb-8">
              The hotel you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/hotels">
              <button className="px-8 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-pink-600 transition">
                Browse All Hotels
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const diff = checkOut - checkIn;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    const roomPrice = selectedRoom ? selectedRoom.price : hotel.price;
    const subtotal = nights * roomPrice;
    const serviceFee = subtotal * 0.1;
    const taxes = subtotal * 0.12;
    return {
      subtotal,
      serviceFee,
      taxes,
      total: subtotal + serviceFee + taxes
    };
  };

  const handleBooking = () => {
    if (!checkIn || !checkOut) {
      alert('Please select check-in and check-out dates');
      return;
    }
    navigate('/booking', {
      state: {
        hotel,
        selectedRoom,
        checkIn,
        checkOut,
        guests,
        pricing: calculateTotal()
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Image Gallery with proper padding */}
      <div className="pt-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Swiper
            modules={[Navigation, Thumbs, Zoom]}
            navigation
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            zoom={true}
            className="rounded-2xl mb-4 h-[500px] shadow-2xl"
          >
            {hotel.images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="swiper-zoom-container h-full">
                  <img 
                    src={image} 
                    alt={`${hotel.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Thumbnail Swiper */}
          <Swiper
            modules={[Thumbs]}
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={5}
            watchSlidesProgress
            className="rounded-lg"
            breakpoints={{
              320: { slidesPerView: 3 },
              640: { slidesPerView: 4 },
              768: { slidesPerView: 5 }
            }}
          >
            {hotel.images.map((image, index) => (
              <SwiperSlide key={index} className="cursor-pointer">
                <img 
                  src={image} 
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg hover:opacity-75 transition"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Hotel Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-lg uppercase">
                      {hotel.propertyType}
                    </span>
                    {hotel.discount && (
                      <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-semibold rounded-lg">
                        {hotel.discount}% OFF
                      </span>
                    )}
                    {hotel.featured && (
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm font-semibold rounded-lg">
                        ⭐ FEATURED
                      </span>
                    )}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                    {hotel.name}
                  </h1>
                  <div className="flex items-center text-gray-600 mb-3">
                    <FiMapPin className="w-5 h-5 mr-2 text-primary" />
                    <span className="text-lg">{hotel.location}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center bg-primary text-white px-3 py-1 rounded-lg shadow-md">
                      <FiStar className="w-4 h-4 fill-current mr-1" />
                      <span className="font-semibold">{hotel.rating}</span>
                    </div>
                    <span className="text-gray-600">
                      {hotel.reviewCount} reviews
                    </span>
                    <div className="flex space-x-1">
                      {[...Array(hotel.starRating)].map((_, i) => (
                        <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 hover:bg-gray-100 rounded-full transition"
                  >
                    <FiShare2 className="w-6 h-6 text-gray-700" />
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="p-3 hover:bg-red-50 rounded-full transition"
                  >
                    <FiHeart className={`w-6 h-6 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-700'}`} />
                  </motion.button>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed text-lg">
                {hotel.description}
              </p>
            </motion.div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="flex border-b overflow-x-auto">
                {['overview', 'rooms', 'reviews', 'location'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 min-w-[120px] px-6 py-4 font-semibold capitalize transition ${
                      activeTab === tab
                        ? 'bg-primary text-white'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-2xl font-bold mb-4 text-gray-800">Amenities & Facilities</h2>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {hotel.amenities.map((amenity, index) => (
                          <div key={index} className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg">
                            <FiCheck className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700 font-medium">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold mb-4 text-gray-800">Hotel Policies</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6">
                        <div className="flex items-start space-x-3">
                          <FiClock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-gray-800 mb-1">Check-in</p>
                            <p className="text-gray-600">{hotel.policies.checkIn}</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <FiClock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-gray-800 mb-1">Check-out</p>
                            <p className="text-gray-600">{hotel.policies.checkOut}</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <FiCheck className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-gray-800 mb-1">Cancellation</p>
                            <p className="text-gray-600">{hotel.policies.cancellation}</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <FiCheck className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-gray-800 mb-1">Pets</p>
                            <p className="text-gray-600">{hotel.policies.pets}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {hotel.nearbyAttractions && (
                      <div>
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Nearby Attractions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {hotel.nearbyAttractions.map((attraction, index) => (
                            <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl hover:shadow-md transition">
                              <div className="flex items-center space-x-3">
                                <FiNavigation className="w-5 h-5 text-primary" />
                                <span className="font-semibold text-gray-800">{attraction.name}</span>
                              </div>
                              <span className="text-sm text-gray-600 font-medium bg-white px-3 py-1 rounded-full">
                                {attraction.distance}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Rooms Tab */}
                {activeTab === 'rooms' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Available Rooms</h2>
                    <div className="space-y-4">
                      {hotel.rooms.map(room => (
                        <div 
                          key={room.id}
                          onClick={() => setSelectedRoom(room)}
                          className={`border-2 rounded-xl p-4 transition cursor-pointer ${
                            selectedRoom?.id === room.id 
                              ? 'border-primary bg-pink-50 shadow-lg' 
                              : 'border-gray-200 hover:border-primary hover:shadow-md'
                          }`}
                        >
                          <div className="flex flex-col md:flex-row gap-4">
                            <img 
                              src={room.image} 
                              alt={room.type}
                              className="w-full md:w-48 h-32 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="text-xl font-bold text-gray-800">{room.type}</h3>
                                  <p className="text-gray-600">{room.size}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-2xl font-bold text-primary">₹{room.price}</p>
                                  <p className="text-sm text-gray-600">per night</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 mb-3">
                                <FiUsers className="w-4 h-4 text-gray-500" />
                                <span className="text-sm text-gray-600">Up to {room.capacity} guests</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {room.features.map((feature, idx) => (
                                  <span key={idx} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700">
                                    {feature}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-800">Guest Reviews</h2>
                      <div className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-xl">
                        <FiStar className="w-5 h-5 fill-current" />
                        <span className="text-xl font-bold">{hotel.rating}</span>
                        <span className="text-sm">({hotel.reviewCount})</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {hotel.reviews.map(review => (
                        <div key={review.id} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition">
                          <div className="flex items-start space-x-4">
                            <img 
                              src={review.avatar} 
                              alt={review.user}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <h4 className="font-bold text-gray-800">{review.user}</h4>
                                  <p className="text-sm text-gray-600">{review.date}</p>
                                </div>
                                <div className="flex items-center space-x-1 bg-primary text-white px-3 py-1 rounded-lg">
                                  <FiStar className="w-4 h-4 fill-current" />
                                  <span className="font-semibold">{review.rating}</span>
                                </div>
                              </div>
                              <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Location Tab */}
                {activeTab === 'location' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Location</h2>
                    <div className="bg-gray-50 rounded-xl p-6 mb-6">
                      <div className="flex items-start space-x-3">
                        <FiMapPin className="w-6 h-6 text-primary mt-1" />
                        <div>
                          <p className="font-semibold text-gray-800 text-lg mb-1">{hotel.name}</p>
                          <p className="text-gray-600">{hotel.location}</p>
                        </div>
                      </div>
                    </div>
                    <div className="aspect-video bg-gray-200 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <FiMapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 font-semibold">Map view would appear here</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-2xl p-6 sticky top-24">
              <div className="mb-6">
                <div className="flex items-baseline space-x-2 mb-2">
                  <span className="text-4xl font-bold text-primary">
                    ₹{selectedRoom ? selectedRoom.price : hotel.price}
                  </span>
                  <span className="text-gray-600">/ night</span>
                </div>
                {hotel.originalPrice && (
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500 line-through">₹{hotel.originalPrice}</span>
                    <span className="px-2 py-1 bg-red-100 text-red-600 text-sm font-semibold rounded">
                      Save {hotel.discount}%
                    </span>
                  </div>
                )}
              </div>

              {/* Date Pickers */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-2">
                    <FiCalendar className="w-4 h-4" />
                    <span>Check-in</span>
                  </label>
                  <DatePicker
                    selected={checkIn}
                    onChange={(date) => setCheckIn(date)}
                    selectsStart
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={new Date()}
                    placeholderText="Select date"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-2">
                    <FiCalendar className="w-4 h-4" />
                    <span>Check-out</span>
                  </label>
                  <DatePicker
                    selected={checkOut}
                    onChange={(date) => setCheckOut(date)}
                    selectsEnd
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={checkIn || new Date()}
                    placeholderText="Select date"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Guests */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-2">
                  <FiUsers className="w-4 h-4" />
                  <span>Guests</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">Adults</label>
                    <input
                      type="number"
                      min="1"
                      value={guests.adults}
                      onChange={(e) => setGuests({...guests, adults: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">Children</label>
                    <input
                      type="number"
                      min="0"
                      value={guests.children}
                      onChange={(e) => setGuests({...guests, children: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              {checkIn && checkOut && (
                <div className="mb-6 p-4 bg-gray-50 rounded-xl space-y-2">
                  <div className="flex justify-between text-gray-700">
                    <span>₹{selectedRoom ? selectedRoom.price : hotel.price} × {calculateNights()} nights</span>
                    <span>₹{calculateTotal().subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Service fee</span>
                    <span>₹{calculateTotal().serviceFee.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Taxes</span>
                    <span>₹{calculateTotal().taxes.toFixed(0)}</span>
                  </div>
                  <div className="pt-2 border-t-2 border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-800 text-lg">Total</span>
                      <span className="font-bold text-primary text-2xl">₹{calculateTotal().total.toFixed(0)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Book Button */}
              <motion.button
                onClick={handleBooking}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-primary to-pink-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <span>Book Now</span>
                <FiArrowRight className="w-5 h-5" />
              </motion.button>

              <p className="text-center text-sm text-gray-600 mt-4">
                You won't be charged yet
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HotelDetails;
