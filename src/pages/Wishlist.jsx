// src/pages/Wishlist.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHeart, FiTrash2, FiShoppingCart, FiMapPin,
  FiStar, FiCalendar, FiShare2
} from 'react-icons/fi';
import { getFeaturedHotels } from '../data/hotelData';

const Wishlist = () => {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState(getFeaturedHotels().slice(0, 4));

  const removeFromWishlist = (hotelId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== hotelId));
  };

  const handleBookNow = (hotel) => {
    navigate(`/hotel/${hotel.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div className="pt-20 bg-gradient-to-r from-red-500 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <FiHeart className="w-16 h-16 mx-auto mb-6 fill-current" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">My Wishlist</h1>
            <p className="text-xl text-white/90">
              {wishlistItems.length} saved {wishlistItems.length === 1 ? 'property' : 'properties'}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Wishlist Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {wishlistItems.length > 0 ? (
          <div className="space-y-6">
            <AnimatePresence>
              {wishlistItems.map((hotel, index) => (
                <motion.div
                  key={hotel.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="md:w-1/3 relative group">
                      <img
                        src={hotel.images[0]}
                        alt={hotel.name}
                        className="w-full h-64 md:h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {hotel.discount && (
                        <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-xl font-bold shadow-lg">
                          {hotel.discount}% OFF
                        </div>
                      )}
                      {hotel.featured && (
                        <div className="absolute top-4 right-4 bg-yellow-500 text-white px-4 py-2 rounded-xl font-bold shadow-lg">
                          ⭐ Featured
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="md:w-2/3 p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2 hover:text-primary cursor-pointer" onClick={() => navigate(`/hotel/${hotel.id}`)}>
                              {hotel.name}
                            </h2>
                            <div className="flex items-center text-gray-600 mb-3">
                              <FiMapPin className="w-4 h-4 mr-2 text-primary" />
                              <span>{hotel.location}</span>
                            </div>
                            <div className="flex items-center space-x-4 mb-4">
                              <div className="flex items-center bg-primary text-white px-3 py-1 rounded-lg">
                                <FiStar className="w-4 h-4 fill-current mr-1" />
                                <span className="font-semibold">{hotel.rating}</span>
                              </div>
                              <span className="text-gray-600">
                                ({hotel.reviewCount} reviews)
                              </span>
                              <div className="flex">
                                {[...Array(hotel.starRating)].map((_, i) => (
                                  <FiStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-700 mb-4 line-clamp-2">
                          {hotel.description}
                        </p>

                        {/* Amenities */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {hotel.amenities.slice(0, 4).map((amenity, idx) => (
                            <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Bar */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div>
                          <div className="flex items-baseline space-x-2">
                            <span className="text-3xl font-bold text-primary">
                              ₹{hotel.price}
                            </span>
                            <span className="text-gray-600">/ night</span>
                          </div>
                          {hotel.originalPrice && (
                            <span className="text-gray-500 line-through text-sm">
                              ₹{hotel.originalPrice}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center space-x-3">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition"
                          >
                            <FiShare2 className="w-5 h-5 text-gray-700" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => removeFromWishlist(hotel.id)}
                            className="p-3 bg-red-100 hover:bg-red-200 rounded-xl transition"
                          >
                            <FiTrash2 className="w-5 h-5 text-red-600" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleBookNow(hotel)}
                            className="px-6 py-3 bg-gradient-to-r from-primary to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition flex items-center space-x-2"
                          >
                            <FiCalendar className="w-5 h-5" />
                            <span>Book Now</span>
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-white rounded-2xl shadow-lg"
          >
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiHeart className="w-12 h-12 text-red-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Your Wishlist is Empty
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Start adding hotels you love to your wishlist
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/hotels')}
              className="px-8 py-4 bg-gradient-to-r from-primary to-pink-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition"
            >
              Explore Hotels
            </motion.button>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Wishlist;
