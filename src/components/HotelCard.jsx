// src/components/HotelCard.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiMapPin, FiStar, FiHeart, FiEye,
  FiWifi, FiCoffee, FiActivity 
} from 'react-icons/fi';

const HotelCard = ({ hotel, index = 0 }) => {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleCardClick = (e) => {
    // Only navigate if not clicking on wishlist button or image navigation
    if (!e.target.closest('.wishlist-btn') && !e.target.closest('.image-nav')) {
      navigate(`/hotel/${hotel.id}`);
    }
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    navigate(`/hotel/${hotel.id}`);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === hotel.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? hotel.images.length - 1 : prev - 1
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group"
      onClick={handleCardClick}
    >
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={hotel.images[currentImageIndex]}
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Image Navigation Dots */}
        {hotel.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 image-nav">
            {hotel.images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(idx);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentImageIndex 
                    ? 'bg-white w-6' 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        )}

        {/* Wishlist Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleWishlist}
          className={`wishlist-btn absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all shadow-lg ${
            isWishlisted 
              ? 'bg-red-500 text-white' 
              : 'bg-white/90 text-gray-700 hover:bg-white'
          }`}
        >
          <FiHeart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
        </motion.button>

        {/* Discount Badge */}
        {hotel.discount && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1.5 rounded-lg font-bold text-sm shadow-lg">
            {hotel.discount}% OFF
          </div>
        )}

        {/* Featured Badge */}
        {hotel.featured && (
          <div className="absolute top-16 left-4 bg-yellow-500 text-white px-3 py-1.5 rounded-lg font-bold text-sm shadow-lg">
            ⭐ Featured
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Hotel Name & Location */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors">
            {hotel.name}
          </h3>
          <div className="flex items-center text-gray-600 text-sm">
            <FiMapPin className="w-4 h-4 mr-1 text-primary" />
            <span>{hotel.location}</span>
          </div>
        </div>

        {/* Rating & Reviews */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="flex items-center bg-primary text-white px-3 py-1 rounded-lg">
            <FiStar className="w-4 h-4 fill-current mr-1" />
            <span className="font-semibold">{hotel.rating}</span>
          </div>
          <span className="text-gray-600 text-sm">
            ({hotel.reviewCount} reviews)
          </span>
          <div className="flex">
            {[...Array(hotel.starRating)].map((_, i) => (
              <FiStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="flex items-center space-x-4 mb-4 text-gray-600 text-sm">
          {hotel.amenities.slice(0, 3).map((amenity, idx) => (
            <div key={idx} className="flex items-center space-x-1">
              {amenity === 'WiFi' && <FiWifi className="w-4 h-4" />}
              {amenity === 'Restaurant' && <FiCoffee className="w-4 h-4" />}
              {amenity === 'Gym' && <FiActivity className="w-4 h-4" />}
              <span>{amenity}</span>
            </div>
          ))}
        </div>

        {/* Price & Button */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-primary">
                ₹{hotel.price}
              </span>
              <span className="text-gray-600 text-sm">/ night</span>
            </div>
            {hotel.originalPrice && (
              <span className="text-gray-500 line-through text-sm">
                ₹{hotel.originalPrice}
              </span>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleViewDetails}
            className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-primary to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <FiEye className="w-4 h-4" />
            <span>View Details</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default HotelCard;
