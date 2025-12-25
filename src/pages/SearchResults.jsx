// src/pages/SearchResults.jsx
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HotelCard from '../components/HotelCard';
import { 
  FiGrid, FiList, FiMapPin, FiFilter, 
  FiX, FiSliders, FiStar, FiSearch 
} from 'react-icons/fi';
import { allHotels } from '../data/hotelData';

const SearchResults = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [filteredHotels, setFilteredHotels] = useState(allHotels);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    priceRange: [0, 10000],
    rating: 0,
    propertyType: [],
    amenities: [],
    sortBy: 'popularity'
  });
  
  const location = useLocation();
  const navigate = useNavigate();
  const stateParams = location.state?.searchParams;

  useEffect(() => {
    let filtered = [...allHotels];

    const destination = stateParams?.destination;
    if (destination) {
      filtered = filtered.filter(hotel =>
        hotel.location.toLowerCase().includes(destination.toLowerCase()) ||
        hotel.city.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(hotel =>
        hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filtered = filtered.filter(hotel => 
      hotel.price >= filters.priceRange[0] && hotel.price <= filters.priceRange[1]
    );

    if (filters.rating > 0) {
      filtered = filtered.filter(hotel => hotel.rating >= filters.rating);
    }

    if (filters.propertyType.length > 0) {
      filtered = filtered.filter(hotel =>
        filters.propertyType.includes(hotel.propertyType)
      );
    }

    if (filters.sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredHotels(filtered);
  }, [filters, stateParams, searchQuery]);

  const destinationLabel = stateParams?.destination || 'All Destinations';

  const amenitiesList = ['WiFi', 'Pool', 'Parking', 'Restaurant', 'Gym', 'Spa', 'Bar', 'Room Service'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Search Section */}
      <div className="pt-20 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-4 shadow-lg">
            <div className="flex items-center space-x-3">
              <FiSearch className="w-6 h-6 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-2 py-2 text-gray-800 focus:outline-none text-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition flex-shrink-0"
                >
                  <FiX className="w-5 h-5 text-gray-500" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
              {destinationLabel}
            </h1>
            <p className="text-gray-600">
              {filteredHotels.length} properties available
            </p>
          </div>

          <div className="flex items-center space-x-3 w-full md:w-auto">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center space-x-2 px-4 py-2.5 bg-primary text-white rounded-xl font-semibold shadow-lg flex-1 justify-center"
            >
              <FiSliders className="w-5 h-5" />
              <span>Filters</span>
            </button>

            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
              className="px-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none font-semibold text-gray-700 shadow-sm flex-1 md:flex-none"
            >
              <option value="popularity">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            <div className="hidden md:flex space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 rounded-xl transition-all shadow-sm ${
                  viewMode === 'grid'
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border-2 border-gray-200'
                }`}
              >
                <FiGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 rounded-xl transition-all shadow-sm ${
                  viewMode === 'list'
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border-2 border-gray-200'
                }`}
              >
                <FiList className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar with Scroll */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl shadow-lg sticky top-28">
              {/* Fixed Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
                  <FiFilter className="w-5 h-5" />
                  <span>Filters</span>
                </h3>
                <button
                  onClick={() => setFilters({
                    priceRange: [0, 10000],
                    rating: 0,
                    propertyType: [],
                    amenities: [],
                    sortBy: 'popularity'
                  })}
                  className="text-primary hover:text-pink-600 font-semibold text-sm transition"
                >
                  Clear All
                </button>
              </div>

              {/* Scrollable Content */}
              <div 
                className="overflow-y-auto overflow-x-hidden p-6 custom-scrollbar"
                style={{ maxHeight: 'calc(100vh - 220px)' }}
              >
                {/* Price Range */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <h4 className="font-semibold mb-4 text-gray-800">Price Range</h4>
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="500"
                      value={filters.priceRange[1]}
                      onChange={(e) => setFilters({...filters, priceRange: [0, parseInt(e.target.value)]})}
                      className="w-full accent-primary h-2 rounded-lg"
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded-lg">
                        ₹0
                      </span>
                      <span className="text-sm font-semibold text-primary bg-pink-50 px-3 py-1 rounded-lg">
                        ₹{filters.priceRange[1]}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <h4 className="font-semibold mb-4 text-gray-800">Minimum Rating</h4>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setFilters({...filters, rating})}
                        className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-all ${
                          filters.rating === rating
                            ? 'bg-primary text-white shadow-md'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex">
                          {[...Array(rating)].map((_, i) => (
                            <FiStar key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                        <span className="font-semibold">& Up</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Property Type */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <h4 className="font-semibold mb-4 text-gray-800">Property Type</h4>
                  <div className="space-y-3">
                    {['hotel', 'resort', 'villa', 'boutique'].map((type) => (
                      <label key={type} className="flex items-center space-x-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters.propertyType.includes(type)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilters({...filters, propertyType: [...filters.propertyType, type]});
                            } else {
                              setFilters({...filters, propertyType: filters.propertyType.filter(t => t !== type)});
                            }
                          }}
                          className="w-5 h-5 accent-primary rounded"
                        />
                        <span className="capitalize text-gray-700 group-hover:text-primary transition-colors font-medium">
                          {type}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h4 className="font-semibold mb-4 text-gray-800">Amenities</h4>
                  <div className="space-y-3">
                    {amenitiesList.map((amenity) => (
                      <label key={amenity} className="flex items-center space-x-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters.amenities.includes(amenity)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilters({...filters, amenities: [...filters.amenities, amenity]});
                            } else {
                              setFilters({...filters, amenities: filters.amenities.filter(a => a !== amenity)});
                            }
                          }}
                          className="w-5 h-5 accent-primary rounded"
                        />
                        <span className="text-gray-700 group-hover:text-primary transition-colors font-medium">
                          {amenity}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hotels Grid */}
          <div className="lg:col-span-3">
            {filteredHotels.length > 0 ? (
              <motion.div
                layout
                className={`grid gap-6 ${
                  viewMode === 'grid'
                    ? 'grid-cols-1 md:grid-cols-2'
                    : 'grid-cols-1'
                }`}
              >
                {filteredHotels.map((hotel, index) => (
                  <motion.div
                    key={hotel.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <HotelCard hotel={hotel} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiMapPin className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  No hotels found
                </h3>
                <p className="text-gray-600 mb-8 text-lg">
                  Try adjusting your filters or search for a different location
                </p>
                <button
                  onClick={() => {
                    setFilters({
                      priceRange: [0, 10000],
                      rating: 0,
                      propertyType: [],
                      amenities: [],
                      sortBy: 'popularity'
                    });
                    setSearchQuery('');
                  }}
                  className="px-8 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-pink-600 transition shadow-lg"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
          margin: 10px 0;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #ec4899, #d946ef);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #d946ef, #ec4899);
        }

        /* Firefox scrollbar */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #ec4899 #f1f1f1;
        }
      `}</style>
    </div>
  );
};

export default SearchResults;
