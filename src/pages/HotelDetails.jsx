// src/pages/HotelDetails.jsx
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  FiMapPin, FiStar, FiHeart, FiShare2, FiCheck,
  FiWifi, FiCoffee, FiTv, FiWind, FiActivity,
  FiShield, FiClock, FiPhone, FiMail, FiArrowLeft,
  FiUsers, FiX, FiAlertCircle, FiNavigation
} from 'react-icons/fi';
import { allHotels } from '../data/hotelData';

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const hotel = allHotels.find((h) => h.id === parseInt(id));
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(0);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Guest Counter State
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

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

  const amenityIcons = {
    'Free WiFi': <FiWifi />,
    'Swimming Pool': <FiActivity />,
    'Spa & Wellness': <FiActivity />,
    'Restaurant': <FiCoffee />,
    'Gym': <FiActivity />,
    '24/7 Room Service': <FiClock />,
    'Valet Parking': <FiShield />,
    'Business Center': <FiUsers />,
    'Concierge': <FiUsers />,
    'Air Conditioning': <FiWind />,
    'TV': <FiTv />
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'rooms', label: 'Rooms' },
    { id: 'amenities', label: 'Amenities' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'location', label: 'Location' }
  ];

  const reviews = [
    {
      name: 'Priya Sharma',
      rating: 5,
      date: 'Dec 15, 2025',
      comment: 'Amazing experience! The staff was incredibly friendly and the rooms were spotless. The location is perfect for exploring the city.',
      avatar: 'PS'
    },
    {
      name: 'Rahul Verma',
      rating: 4,
      date: 'Dec 10, 2025',
      comment: 'Great hotel with excellent amenities. The pool and spa facilities are top-notch. Only minor issue was the breakfast could have more variety.',
      avatar: 'RV'
    },
    {
      name: 'Anjali Patel',
      rating: 5,
      date: 'Dec 5, 2025',
      comment: 'Absolutely loved our stay! The ocean view from our room was breathtaking. Will definitely come back.',
      avatar: 'AP'
    }
  ];

  const nearbyAttractions = [
    { name: 'India Gate', distance: '2.5 km' },
    { name: 'Red Fort', distance: '3.8 km' },
    { name: 'Qutub Minar', distance: '12 km' },
    { name: 'Lotus Temple', distance: '8.5 km' }
  ];

  const hotelPolicies = {
    checkIn: '2:00 PM',
    checkOut: '11:00 AM',
    cancellation: 'Free cancellation up to 48 hours before check-in',
    pets: 'Not allowed'
  };

  const detailedAmenities = [
    'Free WiFi',
    'Swimming Pool',
    'Spa & Wellness',
    'Restaurant',
    'Gym',
    '24/7 Room Service',
    'Valet Parking',
    'Business Center',
    'Concierge',
    'Air Conditioning',
    'TV',
    'Mini Bar'
  ];

  const handleBooking = () => {
    navigate('/booking', { 
      state: { 
        hotelId: hotel.id,
        adults,
        children
      } 
    });
  };

  const updateGuests = (type, action) => {
    if (type === 'adults') {
      if (action === 'increment') {
        setAdults(prev => prev + 1);
      } else {
        setAdults(prev => Math.max(1, prev - 1));
      }
    } else if (type === 'children') {
      if (action === 'increment') {
        setChildren(prev => prev + 1);
      } else {
        setChildren(prev => Math.max(0, prev - 1));
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Mobile Back Button */}
      <div className="lg:hidden fixed top-20 left-4 z-40">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate(-1)}
          className="p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg text-gray-800"
        >
          <FiArrowLeft className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Image Gallery */}
      <div className="pt-16 lg:pt-20">
        <div className="relative h-64 sm:h-80 lg:h-[500px]">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
            loop
            className="h-full"
          >
            {hotel.images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`${hotel.name} - ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Floating Action Buttons */}
          <div className="absolute top-4 right-4 z-10 flex space-x-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`p-3 rounded-full backdrop-blur-md shadow-lg transition ${
                isWishlisted ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-800'
              }`}
            >
              <FiHeart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg text-gray-800"
            >
              <FiShare2 className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Section */}
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-xs sm:text-sm font-semibold">
                  {hotel.propertyType || 'RESORT'}
                </span>
                {hotel.discount && (
                  <span className="px-3 py-1.5 bg-red-100 text-red-600 rounded-lg text-xs sm:text-sm font-semibold">
                    {hotel.discount}% OFF
                  </span>
                )}
                {hotel.featured && (
                  <span className="px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-lg text-xs sm:text-sm font-semibold">
                    ⭐ FEATURED
                  </span>
                )}
              </div>

              {/* Title & Location */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
                {hotel.name}
              </h1>
              <div className="flex items-start text-gray-600 mb-4">
                <FiMapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 mt-1 text-primary flex-shrink-0" />
                <span className="text-sm sm:text-base">{hotel.location}</span>
              </div>

              {/* Rating & Reviews */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <div className="flex items-center bg-primary text-white px-3 sm:px-4 py-2 rounded-xl">
                  <FiStar className="w-4 h-4 sm:w-5 sm:h-5 fill-current mr-2" />
                  <span className="font-bold text-base sm:text-lg">{hotel.rating}</span>
                </div>
                <span className="text-sm sm:text-base text-gray-600">
                  {hotel.reviewCount} reviews
                </span>
                <div className="flex">
                  {[...Array(hotel.starRating)].map((_, i) => (
                    <FiStar key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-200">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-shrink-0 px-4 sm:px-6 py-3 sm:py-4 font-semibold text-sm sm:text-base transition whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'text-primary border-b-2 border-primary bg-pink-50'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-4 sm:p-6">
                <AnimatePresence mode="wait">
                  {/* Overview Tab */}
                  {activeTab === 'overview' && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">
                          About This Property
                        </h3>
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                          {hotel.description}
                        </p>
                      </div>

                      {/* Hotel Policies */}
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
                          Hotel Policies
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center space-x-2 mb-2">
                              <FiClock className="w-5 h-5 text-primary" />
                              <span className="font-semibold text-gray-800">Check-in</span>
                            </div>
                            <p className="text-gray-700">{hotelPolicies.checkIn}</p>
                          </div>
                          <div className="p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center space-x-2 mb-2">
                              <FiClock className="w-5 h-5 text-primary" />
                              <span className="font-semibold text-gray-800">Check-out</span>
                            </div>
                            <p className="text-gray-700">{hotelPolicies.checkOut}</p>
                          </div>
                          <div className="p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center space-x-2 mb-2">
                              <FiAlertCircle className="w-5 h-5 text-primary" />
                              <span className="font-semibold text-gray-800">Cancellation</span>
                            </div>
                            <p className="text-gray-700 text-sm">{hotelPolicies.cancellation}</p>
                          </div>
                          <div className="p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center space-x-2 mb-2">
                              <FiUsers className="w-5 h-5 text-primary" />
                              <span className="font-semibold text-gray-800">Pets</span>
                            </div>
                            <p className="text-gray-700">{hotelPolicies.pets}</p>
                          </div>
                        </div>
                      </div>

                      {/* Contact Info */}
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
                          Contact Information
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3 text-sm sm:text-base text-gray-700">
                            <FiPhone className="w-5 h-5 text-primary" />
                            <span>+91 98765 43210</span>
                          </div>
                          <div className="flex items-center space-x-3 text-sm sm:text-base text-gray-700">
                            <FiMail className="w-5 h-5 text-primary" />
                            <span>info@{hotel.name.toLowerCase().replace(/\s+/g, '')}.com</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Rooms Tab */}
                  {activeTab === 'rooms' && (
                    <motion.div
                      key="rooms"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
                        Available Rooms
                      </h3>
                      {['Deluxe Room', 'Premium Suite', 'Ocean View Suite'].map((room, index) => (
                        <div
                          key={index}
                          className={`p-4 border-2 rounded-xl cursor-pointer transition ${
                            selectedRoom === index
                              ? 'border-primary bg-pink-50'
                              : 'border-gray-200 hover:border-primary'
                          }`}
                          onClick={() => setSelectedRoom(index)}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="flex-1">
                              <h4 className="font-bold text-base sm:text-lg text-gray-800">
                                {room}
                              </h4>
                              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                                Max 2 adults • King bed • Free WiFi • 35 sqm
                              </p>
                            </div>
                            <div className="flex items-center justify-between sm:justify-end sm:space-x-4">
                              <div className="text-right">
                                <div className="text-xl sm:text-2xl font-bold text-primary">
                                  ₹{hotel.price + index * 1000}
                                </div>
                                <div className="text-xs text-gray-600">per night</div>
                              </div>
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                  selectedRoom === index
                                    ? 'border-primary bg-primary'
                                    : 'border-gray-300'
                                }`}
                              >
                                {selectedRoom === index && <FiCheck className="w-3 h-3 text-white" />}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {/* Amenities Tab */}
                  {activeTab === 'amenities' && (
                    <motion.div
                      key="amenities"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
                        Amenities & Facilities
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {detailedAmenities.map((amenity, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3 p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
                          >
                            <div className="text-primary text-lg sm:text-xl">
                              {amenityIcons[amenity] || <FiCheck />}
                            </div>
                            <span className="text-sm sm:text-base font-medium text-gray-700">
                              {amenity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Reviews Tab */}
                  {activeTab === 'reviews' && (
                    <motion.div
                      key="reviews"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                          Guest Reviews
                        </h3>
                        <div className="flex items-center bg-primary text-white px-4 py-2 rounded-xl">
                          <FiStar className="w-5 h-5 fill-current mr-2" />
                          <span className="font-bold text-lg">{hotel.rating}</span>
                        </div>
                      </div>

                      {reviews.map((review, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-xl">
                          <div className="flex items-start space-x-3 mb-3">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-pink-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                              {review.avatar}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-gray-800 text-sm sm:text-base">
                                {review.name}
                              </h4>
                              <div className="flex items-center space-x-2 mt-1">
                                <div className="flex">
                                  {[...Array(review.rating)].map((_, i) => (
                                    <FiStar
                                      key={i}
                                      className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current"
                                    />
                                  ))}
                                </div>
                                <span className="text-xs sm:text-sm text-gray-600">
                                  {review.date}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                            {review.comment}
                          </p>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {/* Location Tab */}
                  {activeTab === 'location' && (
                    <motion.div
                      key="location"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
                          Location
                        </h3>
                        <div className="flex items-start space-x-3 text-gray-700 mb-4">
                          <FiMapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                          <p className="text-sm sm:text-base">{hotel.location}</p>
                        </div>
                        <div className="w-full h-64 sm:h-80 bg-gray-200 rounded-xl overflow-hidden">
                          <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.6067842557495!2d77.20902931508049!3d28.613939082422484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd371d9e2d33%3A0xa88d2e1d7e3cc9f4!2sIndia%20Gate!5e0!3m2!1sen!2sin!4v1703344800000!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            title="Hotel Location"
                          />
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
                          Nearby Attractions
                        </h3>
                        <div className="space-y-3">
                          {nearbyAttractions.map((attraction, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
                            >
                              <div className="flex items-center space-x-3">
                                <FiNavigation className="w-5 h-5 text-primary" />
                                <span className="font-medium text-gray-800 text-sm sm:text-base">
                                  {attraction.name}
                                </span>
                              </div>
                              <span className="text-sm text-gray-600">{attraction.distance}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 sticky top-24">
              <div className="mb-6">
                <div className="flex items-baseline space-x-2 mb-2">
                  <span className="text-3xl sm:text-4xl font-bold text-primary">
                    ₹{hotel.price}
                  </span>
                  <span className="text-gray-600 text-sm sm:text-base">/ night</span>
                </div>
                {hotel.originalPrice && (
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500 line-through text-sm sm:text-base">
                      ₹{hotel.originalPrice}
                    </span>
                    <span className="text-green-600 font-semibold text-xs sm:text-sm">
                      Save ₹{hotel.originalPrice - hotel.price}
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-3 sm:space-y-4 mb-6">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    Check-in
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    Check-out
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none text-sm sm:text-base"
                  />
                </div>
                
                {/* Guest Counter - Desktop */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-3">
                    Guests
                  </label>
                  <div className="space-y-3">
                    {/* Adults */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800 text-sm">Adults</p>
                        <p className="text-xs text-gray-600">Age 13+</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          type="button"
                          onClick={() => updateGuests('adults', 'decrement')}
                          className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-primary text-gray-700 hover:text-primary font-bold transition flex items-center justify-center"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-semibold text-gray-800">
                          {adults}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateGuests('adults', 'increment')}
                          className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-primary text-gray-700 hover:text-primary font-bold transition flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800 text-sm">Children</p>
                        <p className="text-xs text-gray-600">Age 2-12</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          type="button"
                          onClick={() => updateGuests('children', 'decrement')}
                          className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-primary text-gray-700 hover:text-primary font-bold transition flex items-center justify-center"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-semibold text-gray-800">
                          {children}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateGuests('children', 'increment')}
                          className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-primary text-gray-700 hover:text-primary font-bold transition flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBooking}
                className="w-full py-3 sm:py-4 bg-gradient-to-r from-primary to-pink-600 text-white rounded-xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition mb-3"
              >
                Book Now
              </motion.button>

              <p className="text-xs sm:text-sm text-center text-gray-600">
                Free cancellation • Pay at property
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Booking Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 p-4 shadow-2xl z-40">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-primary">₹{hotel.price}</span>
              <span className="text-gray-600 text-sm">/ night</span>
            </div>
            {hotel.originalPrice && (
              <span className="text-gray-500 line-through text-sm">
                ₹{hotel.originalPrice}
              </span>
            )}
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowBookingForm(true)}
            className="px-6 py-3 bg-gradient-to-r from-primary to-pink-600 text-white rounded-xl font-bold shadow-lg"
          >
            Book Now
          </motion.button>
        </div>
      </div>

      {/* Mobile Booking Modal */}
      <AnimatePresence>
        {showBookingForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/50 z-50 flex items-end"
            onClick={() => setShowBookingForm(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="bg-white rounded-t-3xl w-full p-6 max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Book Your Stay</h3>
                <button
                  onClick={() => setShowBookingForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Check-in</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Check-out
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none"
                  />
                </div>
                
                {/* Guest Counter - Mobile */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Guests
                  </label>
                  <div className="space-y-4">
                    {/* Adults */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-semibold text-gray-800">Adults</p>
                        <p className="text-sm text-gray-600">Age 13+</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          type="button"
                          onClick={() => updateGuests('adults', 'decrement')}
                          className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-primary text-gray-700 hover:text-primary font-bold transition flex items-center justify-center"
                        >
                          −
                        </button>
                        <span className="w-10 text-center font-bold text-gray-800 text-lg">
                          {adults}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateGuests('adults', 'increment')}
                          className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-primary text-gray-700 hover:text-primary font-bold transition flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-semibold text-gray-800">Children</p>
                        <p className="text-sm text-gray-600">Age 2-12</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          type="button"
                          onClick={() => updateGuests('children', 'decrement')}
                          className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-primary text-gray-700 hover:text-primary font-bold transition flex items-center justify-center"
                        >
                          −
                        </button>
                        <span className="w-10 text-center font-bold text-gray-800 text-lg">
                          {children}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateGuests('children', 'increment')}
                          className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-primary text-gray-700 hover:text-primary font-bold transition flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleBooking}
                className="w-full py-4 bg-gradient-to-r from-primary to-pink-600 text-white rounded-xl font-bold text-lg shadow-lg"
              >
                Continue to Booking
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default HotelDetails;
