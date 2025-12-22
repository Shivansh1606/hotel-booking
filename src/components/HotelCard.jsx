// src/components/HotelCard.jsx - Add proper Link
import { FiHeart, FiMapPin, FiStar } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HotelCard = ({ hotel }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl overflow-hidden shadow-custom hover:shadow-hover transition-all"
    >
      {/* Link wraps entire card */}
      <Link to={`/hotel/${hotel.id}`}>
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <img 
            src={hotel.images ? hotel.images[0] : hotel.image} 
            alt={hotel.name}
            className="w-full h-full object-cover transform hover:scale-110 transition duration-500"
          />
          <button 
            onClick={(e) => {
              e.preventDefault();
              // Add to favorites logic
            }}
            className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-primary hover:text-white transition"
          >
            <FiHeart className="w-5 h-5" />
          </button>
          {hotel.discount && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white rounded-lg font-semibold">
              {hotel.discount}% OFF
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-800 hover:text-primary transition">
              {hotel.name}
            </h3>
            <div className="flex items-center space-x-1 bg-primary text-white px-2 py-1 rounded-lg">
              <FiStar className="w-4 h-4 fill-current" />
              <span className="font-semibold">{hotel.rating}</span>
            </div>
          </div>

          <div className="flex items-center text-gray-600 mb-3">
            <FiMapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{hotel.location}</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {hotel.amenities.slice(0, 3).map((amenity, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
              >
                {amenity}
              </span>
            ))}
            {hotel.amenities.length > 3 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                +{hotel.amenities.length - 3} more
              </span>
            )}
          </div>

          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm text-gray-500">Starting from</p>
              <div className="flex items-baseline space-x-2">
                {hotel.originalPrice && (
                  <span className="text-gray-400 line-through text-sm">
                    ₹{hotel.originalPrice}
                  </span>
                )}
                <span className="text-2xl font-bold text-primary">
                  ₹{hotel.price}
                </span>
                <span className="text-gray-600 text-sm">/night</span>
              </div>
            </div>
            <button 
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-pink-600 transition transform hover:scale-105"
              onClick={(e) => e.preventDefault()} // Prevents double navigation
            >
              View Details
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default HotelCard;
