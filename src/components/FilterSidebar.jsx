// src/components/FilterSidebar.jsx
import { useState } from 'react';
import { FiSliders } from 'react-icons/fi';
import { useHotelStore } from '../store/hotelStore';

const FilterSidebar = () => {
  const { filters, setFilters } = useHotelStore();
  const [priceRange, setPriceRange] = useState(filters.priceRange);

  const amenitiesList = [
    'Free WiFi', 'Swimming Pool', 'Parking', 'Restaurant', 
    'Gym', 'Spa', 'Pet Friendly', 'Air Conditioning', 
    'Room Service', 'Bar'
  ];

  const propertyTypes = [
    'Hotel', 'Resort', 'Villa', 'Apartment', 
    'Guest House', 'Hostel', 'Boutique Hotel'
  ];

  const toggleAmenity = (amenity) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter(a => a !== amenity)
      : [...filters.amenities, amenity];
    setFilters({ ...filters, amenities: newAmenities });
  };

  const togglePropertyType = (type) => {
    const newTypes = filters.propertyType.includes(type)
      ? filters.propertyType.filter(t => t !== type)
      : [...filters.propertyType, type];
    setFilters({ ...filters, propertyType: newTypes });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold flex items-center space-x-2">
          <FiSliders className="text-primary" />
          <span>Filters</span>
        </h3>
        <button 
          onClick={() => setFilters({
            priceRange: [0, 10000],
            rating: 0,
            amenities: [],
            propertyType: [],
            sortBy: 'popularity'
          })}
          className="text-sm text-primary hover:underline"
        >
          Clear All
        </button>
      </div>

      {/* Price Range */}
      <div className="mb-6 pb-6 border-b">
        <h4 className="font-semibold mb-4">Price Range (per night)</h4>
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="10000"
            step="100"
            value={priceRange[1]}
            onChange={(e) => {
              const newRange = [0, parseInt(e.target.value)];
              setPriceRange(newRange);
              setFilters({ ...filters, priceRange: newRange });
            }}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}+</span>
          </div>
        </div>
      </div>

      {/* Star Rating */}
      <div className="mb-6 pb-6 border-b">
        <h4 className="font-semibold mb-4">Star Rating</h4>
        <div className="flex flex-wrap gap-2">
          {[5, 4, 3, 2, 1].map(rating => (
            <button
              key={rating}
              onClick={() => setFilters({ ...filters, rating: filters.rating === rating ? 0 : rating })}
              className={`px-4 py-2 rounded-lg border-2 transition ${
                filters.rating === rating
                  ? 'bg-primary text-white border-primary'
                  : 'border-gray-200 hover:border-primary'
              }`}
            >
              {rating}★
            </button>
          ))}
        </div>
      </div>

      {/* Property Type */}
      <div className="mb-6 pb-6 border-b">
        <h4 className="font-semibold mb-4">Property Type</h4>
        <div className="space-y-2">
          {propertyTypes.map(type => (
            <label key={type} className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.propertyType.includes(type)}
                onChange={() => togglePropertyType(type)}
                className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="group-hover:text-primary transition">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="mb-6">
        <h4 className="font-semibold mb-4">Amenities</h4>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {amenitiesList.map(amenity => (
            <label key={amenity} className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.amenities.includes(amenity)}
                onChange={() => toggleAmenity(amenity)}
                className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="group-hover:text-primary transition">{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sort By */}
      <div>
        <h4 className="font-semibold mb-4">Sort By</h4>
        <select
          value={filters.sortBy}
          onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition"
        >
          <option value="popularity">Popularity</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Guest Rating</option>
          <option value="distance">Distance</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSidebar;
