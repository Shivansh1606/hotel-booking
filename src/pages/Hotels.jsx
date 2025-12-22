// src/pages/Hotels.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HotelCard from '../components/HotelCard';
import { 
  FiSearch, FiFilter, FiMapPin, FiStar, 
  FiGrid, FiList, FiTrendingUp, FiAward
} from 'react-icons/fi';
import { motion } from 'framer-motion';

const Hotels = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [priceFilter, setPriceFilter] = useState([0, 10000]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [sortBy, setSortBy] = useState('popularity');
  const [showFilters, setShowFilters] = useState(false);

  const cities = [
    { id: 'all', name: 'All Cities', count: 156 },
    { id: 'delhi', name: 'New Delhi', count: 45 },
    { id: 'mumbai', name: 'Mumbai', count: 38 },
    { id: 'bangalore', name: 'Bangalore', count: 32 },
    { id: 'goa', name: 'Goa', count: 28 },
    { id: 'jaipur', name: 'Jaipur', count: 24 },
    { id: 'kerala', name: 'Kerala', count: 22 },
    { id: 'manali', name: 'Manali', count: 18 }
  ];

  const propertyTypes = [
    { id: 'all', name: 'All Types', icon: '🏨' },
    { id: 'hotel', name: 'Hotels', icon: '🏨' },
    { id: 'resort', name: 'Resorts', icon: '🏖️' },
    { id: 'villa', name: 'Villas', icon: '🏡' },
    { id: 'apartment', name: 'Apartments', icon: '🏢' },
    { id: 'boutique', name: 'Boutique', icon: '✨' },
    { id: 'hostel', name: 'Hostels', icon: '🛏️' }
  ];

  const allHotels = [
    {
      id: 1,
      name: 'The Grand Palace Hotel',
      location: 'New Delhi, India',
      city: 'delhi',
      rating: 4.8,
      reviewCount: 1250,
      price: 3500,
      originalPrice: 4500,
      discount: 22,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      amenities: ['Free WiFi', 'Swimming Pool', 'Spa', 'Restaurant', 'Gym'],
      propertyType: 'hotel',
      starRating: 5,
      featured: true
    },
    {
      id: 2,
      name: 'Oceanview Resort & Spa',
      location: 'Goa, India',
      city: 'goa',
      rating: 4.6,
      reviewCount: 890,
      price: 5200,
      originalPrice: 6500,
      discount: 20,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
      amenities: ['Beach Access', 'Free WiFi', 'Pool', 'Bar', 'Parking'],
      propertyType: 'resort',
      starRating: 5,
      featured: true
    },
    {
      id: 3,
      name: 'Boutique Heritage Stay',
      location: 'Jaipur, Rajasthan',
      city: 'jaipur',
      rating: 4.7,
      reviewCount: 560,
      price: 2800,
      originalPrice: 3500,
      discount: 20,
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
      amenities: ['Free WiFi', 'Restaurant', 'Room Service', 'Parking'],
      propertyType: 'boutique',
      starRating: 4,
      featured: false
    },
    {
      id: 4,
      name: 'Mountain View Villa',
      location: 'Manali, Himachal Pradesh',
      city: 'manali',
      rating: 4.9,
      reviewCount: 720,
      price: 4200,
      originalPrice: 5000,
      discount: 16,
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
      amenities: ['Mountain View', 'Fireplace', 'Free WiFi', 'Kitchen'],
      propertyType: 'villa',
      starRating: 4,
      featured: true
    },
    {
      id: 5,
      name: 'City Center Inn',
      location: 'Mumbai, Maharashtra',
      city: 'mumbai',
      rating: 4.3,
      reviewCount: 430,
      price: 2200,
      originalPrice: 2800,
      discount: 21,
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
      amenities: ['Free WiFi', 'Air Conditioning', 'Restaurant'],
      propertyType: 'hotel',
      starRating: 3,
      featured: false
    },
    {
      id: 6,
      name: 'Luxury Lake Resort',
      location: 'Udaipur, Rajasthan',
      city: 'jaipur',
      rating: 4.9,
      reviewCount: 980,
      price: 6500,
      originalPrice: 8000,
      discount: 19,
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd',
      amenities: ['Lake View', 'Swimming Pool', 'Spa', 'Fine Dining', 'Gym'],
      propertyType: 'resort',
      starRating: 5,
      featured: true
    },
    {
      id: 7,
      name: 'Backpackers Hostel',
      location: 'Bangalore, Karnataka',
      city: 'bangalore',
      rating: 4.4,
      reviewCount: 320,
      price: 800,
      originalPrice: 1000,
      discount: 20,
      image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5',
      amenities: ['Free WiFi', 'Common Area', 'Kitchen', 'Locker'],
      propertyType: 'hostel',
      starRating: 3,
      featured: false
    },
    {
      id: 8,
      name: 'Beachside Apartment',
      location: 'Goa, India',
      city: 'goa',
      rating: 4.5,
      reviewCount: 280,
      price: 3200,
      originalPrice: 4000,
      discount: 20,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
      amenities: ['Sea View', 'Kitchen', 'Balcony', 'Free WiFi'],
      propertyType: 'apartment',
      starRating: 4,
      featured: false
    },
    {
      id: 9,
      name: 'Riverside Resort',
      location: 'Kerala, India',
      city: 'kerala',
      rating: 4.8,
      reviewCount: 650,
      price: 4800,
      originalPrice: 6000,
      discount: 20,
      image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7',
      amenities: ['River View', 'Pool', 'Restaurant', 'Spa', 'Yoga'],
      propertyType: 'resort',
      starRating: 5,
      featured: true
    }
  ];

  const [filteredHotels, setFilteredHotels] = useState(allHotels);

  useEffect(() => {
    let filtered = allHotels;

    // City filter
    if (selectedCity !== 'all') {
      filtered = filtered.filter(hotel => hotel.city === selectedCity);
    }

    // Property type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(hotel => hotel.propertyType === selectedType);
    }

    // Price filter
    filtered = filtered.filter(hotel => 
      hotel.price >= priceFilter[0] && hotel.price <= priceFilter[1]
    );

    // Rating filter
    if (ratingFilter > 0) {
      filtered = filtered.filter(hotel => hotel.rating >= ratingFilter);
    }

    // Search query
    if (searchQuery) {
      filtered = filtered.filter(hotel =>
        hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'popularity') {
      filtered.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    setFilteredHotels(filtered);
  }, [selectedCity, selectedType, priceFilter, ratingFilter, searchQuery, sortBy]);

  const featuredHotels = allHotels.filter(hotel => hotel.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative h-80 bg-gradient-to-r from-primary to-pink-600 text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
            alt="Hotels"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-bold mb-4">Discover Amazing Hotels</h1>
            <p className="text-xl opacity-90 mb-8">
              {allHotels.length}+ verified properties across India
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by hotel name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-xl"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* City Tabs */}
      <section className="bg-white shadow-md sticky top-16 z-40 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto space-x-3 pb-2 scrollbar-hide">
            {cities.map((city) => (
              <button
                key={city.id}
                onClick={() => setSelectedCity(city.id)}
                className={`flex-shrink-0 px-6 py-3 rounded-xl font-semibold transition ${
                  selectedCity === city.id
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {city.name} ({city.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hotels Section */}
      {selectedCity === 'all' && !searchQuery && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-between mb-8"
            >
              <div>
                <h2 className="text-3xl font-bold mb-2">Featured Properties</h2>
                <p className="text-gray-600">Handpicked hotels just for you</p>
              </div>
              <FiAward className="w-10 h-10 text-primary" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredHotels.slice(0, 3).map((hotel, index) => (
                <motion.div
                  key={hotel.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <HotelCard hotel={hotel} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Property Types */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto space-x-4 pb-2 scrollbar-hide">
            {propertyTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`flex-shrink-0 flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition ${
                  selectedType === type.id
                    ? 'bg-white text-primary shadow-lg border-2 border-primary'
                    : 'bg-white text-gray-700 hover:shadow-md'
                }`}
              >
                <span className="text-2xl">{type.icon}</span>
                <span>{type.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Filters & Sort Bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex items-center space-x-4">
              <h3 className="text-2xl font-bold">
                {filteredHotels.length} Properties Found
              </h3>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition"
              >
                <FiFilter className="w-5 h-5" />
                <span>Filters</span>
              </button>
            </div>

            <div className="flex items-center space-x-4">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition"
              >
                <option value="popularity">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>

              {/* View Toggle */}
              <div className="hidden md:flex items-center space-x-2 bg-white rounded-lg p-1 shadow">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition ${
                    viewMode === 'grid'
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <FiGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition ${
                    viewMode === 'list'
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <FiList className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-white rounded-xl p-6 mb-6 shadow-lg md:hidden"
            >
              <h4 className="font-bold mb-4">Filters</h4>
              
              {/* Price Range */}
              <div className="mb-4">
                <label className="block font-semibold mb-2">Price Range</label>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="500"
                  value={priceFilter[1]}
                  onChange={(e) => setPriceFilter([0, parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>₹0</span>
                  <span>₹{priceFilter[1]}+</span>
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block font-semibold mb-2">Minimum Rating</label>
                <div className="flex space-x-2">
                  {[0, 3, 4, 4.5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setRatingFilter(rating)}
                      className={`px-4 py-2 rounded-lg border-2 transition ${
                        ratingFilter === rating
                          ? 'bg-primary text-white border-primary'
                          : 'border-gray-200 hover:border-primary'
                      }`}
                    >
                      {rating === 0 ? 'Any' : `${rating}★+`}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Hotels Grid */}
          {filteredHotels.length > 0 ? (
            <motion.div
              layout
              className={`grid gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
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
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMapPin className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                No hotels found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters or search criteria
              </p>
              <button
                onClick={() => {
                  setSelectedCity('all');
                  setSelectedType('all');
                  setPriceFilter([0, 10000]);
                  setRatingFilter(0);
                  setSearchQuery('');
                }}
                className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-pink-600 transition"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <FiTrendingUp className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="text-4xl font-bold text-primary mb-2">156+</h3>
              <p className="text-gray-600">Hotels Listed</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <FiMapPin className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="text-4xl font-bold text-primary mb-2">50+</h3>
              <p className="text-gray-600">Cities Covered</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <FiStar className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="text-4xl font-bold text-primary mb-2">4.8</h3>
              <p className="text-gray-600">Average Rating</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <FiAward className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="text-4xl font-bold text-primary mb-2">50K+</h3>
              <p className="text-gray-600">Happy Guests</p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Hotels;
