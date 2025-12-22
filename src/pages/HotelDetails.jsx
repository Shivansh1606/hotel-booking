// src/pages/HotelDetails.jsx - Updated Complete Version
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
  FiTv, FiWind, FiPhone, FiMail,
  FiClock, FiCheck, FiX, FiShare2,
  FiHeart, FiNavigation, FiUsers
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import { getHotelById } from '../data/hotelData';
import Loader from '../components/Loader';

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
    return <Loader />;
  }

  if (!hotel) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
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
    const taxes = subtotal * 0.1;
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

      {/* Image Gallery */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Swiper
            modules={[Navigation, Thumbs, Zoom]}
            navigation
            thumbs={{ swiper: thumbsSwiper }}
            zoom={true}
            className="rounded-2xl mb-4 h-[500px]"
          >
            {hotel.images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="swiper-zoom-container">
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
          >
            {hotel.images.map((image, index) => (
              <SwiperSlide key={index} className="cursor-pointer">
                <img 
                  src={image} 
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
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
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-lg">
                      {hotel.propertyType.toUpperCase()}
                    </span>
                    {hotel.discount && (
                      <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-semibold rounded-lg">
                        {hotel.discount}% OFF
                      </span>
                    )}
                  </div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    {hotel.name}
                  </h1>
                  <div className="flex items-center text-gray-600 mb-3">
                    <FiMapPin className="w-5 h-5 mr-2" />
                    <span>{hotel.location}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center bg-primary text-white px-3 py-1 rounded-lg">
                      <FiStar className="w-4 h-4 fill-current mr-1" />
                      <span className="font-semibold">{hotel.rating}</span>
                    </div>
                    <span className="text-gray-600">
                      {hotel.reviewCount} reviews
                    </span>
                    <div className="flex space-x-2">
                      {[...Array(hotel.starRating)].map((_, i) => (
                        <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-3 hover:bg-gray-100 rounded-full transition">
                    <FiShare2 className="w-6 h-6" />
                  </button>
                  <button className="p-3 hover:bg-gray-100 rounded-full transition">
                    <FiHeart className="w-6 h-6 text-red-500" />
                  </button>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed">
                {hotel.description}
              </p>
            </motion.div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="flex border-b">
                {['overview', 'rooms', 'reviews', 'location'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-6 py-4 font-semibold capitalize transition ${
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
                  >
                    <h2 className="text-2xl font-bold mb-4">Amenities & Facilities</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                      {hotel.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <FiCheck className="w-5 h-5 text-green-500" />
                          <span className="text-gray-700">{amenity}</span>
                        </div>
                      ))}
                    </div>

                    <h2 className="text-2xl font-bold mb-4 mt-8">Hotel Policies</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 rounded-xl p-4">
                      <div>
                        <p className="font-semibold mb-1 flex items-center">
                          <FiClock className="w-4 h-4 mr-2 text-primary" />
                          Check-in
                        </p>
                        <p className="text-gray-600">{hotel.policies.checkIn}</p>
                      </div>
                      <div>
                        <p className="font-semibold mb-1 flex items-center">
                          <FiClock className="w-4 h-4 mr-2 text-primary" />
                          Check-out
                        </p>
                        <p className="text-gray-600">{hotel.policies.checkOut}</p>
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Cancellation</p>
                        <p className="text-gray-600">{hotel.policies.cancellation}</p>
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Pets</p>
                        <p className="text-gray-600">{hotel.policies.pets}</p>
                      </div>
                    </div>

                    {hotel.nearbyAttractions && (
                      <>
                        <h2 className="text-2xl font-bold mb-4 mt-8">Nearby Attractions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {hotel.nearbyAttractions.map((attraction, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center space-x-2">
                                <FiNavigation className="w-4 h-4 text-primary" />
                                <span className="font-medium">{attraction.name}</span>
                              </div>
                              <span className="text-sm text-gray-600">{attraction.distance}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </motion.div>
                )}

                {/* Rooms Tab */}
                {activeTab === 'rooms' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <h2 className="text-2xl font-bold mb-4">Available Rooms</h2>
                    <div className="space-y-4">
                      {hotel.rooms.map(room => (
                        <div 
                          key={room.id}
                          className={`border-2 rounded-xl p-4 transition cursor-pointer ${
                            selectedRoom?.id === room.id 
                              ? 'border-primary bg-pink-50' 
                              : 'border-gray-200 hover:border-primary'
                          }`}
                          onClick={() => setSelectedRoom(room)}
                        >
                          <div className="flex flex-col md:flex-row gap-4">
                            <img 
                              src={room.image} 
                              alt={room.type}
                              className="w-full md:w-48 h-32 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold mb-2">{room.type}</h3>
                              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                                <span className="flex items-center">
                                  <FiUsers className="w-4 h-4 mr-1" />
                                  Up to {room.capacity} guests
                                </span>
                                <span>{room.size}</span>
                              </div>
                              <div className="flex flex-wrap gap-2 mb-3">
                                {room.features.map((feature, idx) => (
                                  <span key={idx} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                                    {feature}
                                  </span>
                                ))}
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="text-right">
                                  <p className="text-2xl font-bold text-primary">₹{room.price}</p>
                                  <p className="text-sm text-gray-600">/night</p>
                                </div>
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
                      <h2 className="text-2xl font-bold">Guest Reviews</h2>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-primary">{hotel.rating}</div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <FiStar key={i} className={`w-4 h-4 ${i < Math.floor(hotel.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <div className="text-sm text-gray-600">{hotel.reviewCount} reviews</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {hotel.reviews.map(review => (
                        <div key={review.id} className="border-b pb-4 last:border-0">
                          <div className="flex items-start space-x-4">
                            <img 
                              src={review.avatar} 
                              alt={review.user}
                              className="w-12 h-12 rounded-full"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold">{review.user}</h4>
                                <span className="text-sm text-gray-600">{review.date}</span>
                              </div>
                              <div className="flex items-center mb-2">
                                {[...Array(review.rating)].map((_, i) => (
                                  <FiStar key={i} className="w-4 h-4 fill-primary text-primary" />
                                ))}
                              </div>
                              <p className="text-gray-700">{review.comment}</p>
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
                    <h2 className="text-2xl font-bold mb-4">Location</h2>
                    <div className="bg-gray-200 rounded-xl h-96 mb-4">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83923192776!2d77.06889754725782!3d28.52758200617607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e0!3m2!1sen!2sin!4v1703252345678!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Hotel Location"
                        className="rounded-xl"
                      />
                    </div>
                    <div className="flex items-center text-gray-700">
                      <FiMapPin className="w-5 h-5 mr-2 text-primary" />
                      <span className="font-medium">{hotel.location}</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl p-6 shadow-2xl sticky top-24"
            >
              <div className="mb-6">
                <div className="flex items-baseline space-x-2 mb-2">
                  <span className="text-3xl font-bold text-primary">
                    ₹{selectedRoom ? selectedRoom.price : hotel.price}
                  </span>
                  <span className="text-gray-600">/night</span>
                </div>
                {hotel.originalPrice && (
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400 line-through">₹{hotel.originalPrice}</span>
                    <span className="text-green-600 font-semibold">{hotel.discount}% off</span>
                  </div>
                )}
                <p className="text-sm text-green-600 font-medium mt-2">
                  ✓ Free cancellation • No prepayment needed
                </p>
              </div>

              {/* Date Selection */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Check-in</label>
                  <DatePicker
                    selected={checkIn}
                    onChange={setCheckIn}
                    minDate={new Date()}
                    dateFormat="dd MMM yyyy"
                    placeholderText="Select date"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Check-out</label>
                  <DatePicker
                    selected={checkOut}
                    onChange={setCheckOut}
                    minDate={checkIn || new Date()}
                    dateFormat="dd MMM yyyy"
                    placeholderText="Select date"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Price Breakdown */}
              {checkIn && checkOut && calculateNights() > 0 && (
                <div className="border-t border-b py-4 mb-6 space-y-2">
                  <div className="flex justify-between text-gray-700">
                    <span>₹{selectedRoom ? selectedRoom.price : hotel.price} × {calculateNights()} nights</span>
                    <span>₹{calculateTotal().subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Service fee</span>
                    <span>₹{calculateTotal().serviceFee}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Taxes</span>
                    <span>₹{calculateTotal().taxes}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span className="text-primary">₹{calculateTotal().total}</span>
                  </div>
                </div>
              )}

              <button
                onClick={handleBooking}
                className="w-full py-4 bg-gradient-to-r from-primary to-pink-600 text-white rounded-xl font-semibold hover:shadow-xl transition transform hover:scale-105"
              >
                Reserve Now
              </button>

              <p className="text-center text-sm text-gray-600 mt-4">
                You won't be charged yet
              </p>

              {/* Contact */}
              <div className="mt-6 pt-6 border-t">
                <h4 className="font-semibold mb-3">Need help?</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <FiPhone className="w-4 h-4" />
                    <span className="text-sm">+91 11 1234 5678</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-700">
                    <FiMail className="w-4 h-4" />
                    <span className="text-sm">support@hotelbooker.com</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HotelDetails;
