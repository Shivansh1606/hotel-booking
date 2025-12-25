// src/pages/Hotels.jsx - Add padding-top for header
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HotelCard from '../components/HotelCard';
import { 
  FiSearch, FiFilter, FiMapPin, FiStar, 
  FiGrid, FiList, FiX, FiSliders
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { allHotels, getFeaturedHotels } from '../data/hotelData';

const Hotels = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [priceFilter, setPriceFilter] = useState([0, 10000]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [sortBy, setSortBy] = useState('popularity');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredHotels, setFilteredHotels] = useState(allHotels);

  const cities = [
    { id: 'all', name: 'All Cities', count: allHotels.length },
    { id: 'delhi', name: 'New Delhi', count: allHotels.filter(h => h.city === 'delhi').length },
    { id: 'mumbai', name: 'Mumbai', count: allHotels.filter(h => h.city === 'mumbai').length },
    { id: 'goa', name: 'Goa', count: allHotels.filter(h => h.city === 'goa').length },
    { id: 'jaipur', name: 'Jaipur/Udaipur', count: allHotels.filter(h => h.city === 'jaipur').length },
    { id: 'manali', name: 'Manali', count: allHotels.filter(h => h.city === 'manali').length }
  ];

  const propertyTypes = [
    { id: 'all', name: 'All Types', icon: '🏨' },
    { id: 'hotel', name: 'Hotels', icon: '🏨' },
    { id: 'resort', name: 'Resorts', icon: '🏖️' },
    { id: 'villa', name: 'Villas', icon: '🏡' },
    { id: 'boutique', name: 'Boutique', icon: '✨' }
  ];

  useEffect(() => {
    let filtered = [...allHotels];

    if (selectedCity !== 'all') {
      filtered = filtered.filter(hotel => hotel.city === selectedCity);
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(hotel => hotel.propertyType === selectedType);
    }

    filtered = filtered.filter(hotel => 
      hotel.price >= priceFilter[0] && hotel.price <= priceFilter[1]
    );

    if (ratingFilter > 0) {
      filtered = filtered.filter(hotel => hotel.rating >= ratingFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(hotel =>
        hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'popularity') {
      filtered.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
    }

    setFilteredHotels(filtered);
  }, [selectedCity, selectedType, priceFilter, ratingFilter, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section with proper top padding */}
      <div className="pt-20 bg-gradient-to-r from-primary to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Amazing Hotels
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Find the perfect place to stay from our curated collection
            </p>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-4">
              <div className="flex items-center space-x-3">
                <FiSearch className="w-6 h-6 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search hotels by name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-3 text-gray-800 focus:outline-none text-lg"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                  >
                    <FiX className="w-5 h-5 text-gray-500" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          {/* City Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {cities.map((city) => (
              <button
                key={city.id}
                onClick={() => setSelectedCity(city.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  selectedCity === city.id
                    ? 'bg-white text-primary shadow-lg transform scale-105'
                    : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                }`}
              >
                {city.name}
                <span className="ml-2 text-sm opacity-75">({city.count})</span>
              </button>
            ))}
          </div>

          {/* Property Type Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {propertyTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                  selectedType === type.id
                    ? 'bg-white text-primary shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                }`}
              >
                <span>{type.icon}</span>
                <span>{type.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters & Sort Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {filteredHotels.length} Properties Found
            </h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-xl font-semibold"
            >
              <FiSliders />
              <span>Filters</span>
            </button>
          </div>

          <div className="flex items-center space-x-3 w-full md:w-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-1 md:flex-none px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none font-semibold text-gray-700"
            >
              <option value="popularity">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-xl transition ${
                  viewMode === 'grid'
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                <FiGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-xl transition ${
                  viewMode === 'list'
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                <FiList className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Hotels Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
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
        </div>

        {filteredHotels.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiMapPin className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              No hotels found
            </h3>
            <p className="text-gray-600 mb-8">
              Try adjusting your filters or search criteria
            </p>
            <button
              onClick={() => {
                setSelectedCity('all');
                setSelectedType('all');
                setSearchQuery('');
                setPriceFilter([0, 10000]);
                setRatingFilter(0);
              }}
              className="px-8 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-pink-600 transition"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Hotels;
