// src/pages/SearchResults.jsx
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import FilterSidebar from '../components/FilterSidebar';
import HotelCard from '../components/HotelCard';
import SearchBar from '../components/SearchBar';
import { useHotelStore } from '../store/hotelStore';
import { FiGrid, FiList, FiMapPin } from 'react-icons/fi';
import { allHotels } from '../data/hotelData';

const SearchResults = () => {
  const { filters, searchParams, setHotels } = useHotelStore();
  const [viewMode, setViewMode] = useState('grid');
  const [filteredHotels, setFilteredHotels] = useState(allHotels);
  const location = useLocation();
  const stateParams = location.state?.searchParams;

  useEffect(() => {
    setHotels(allHotels);
  }, [setHotels]);

  useEffect(() => {
    let filtered = [...allHotels];

    // Destination filter (agar user ne destination type kiya ho)
    const destination = stateParams?.destination || searchParams.destination;
    if (destination) {
      filtered = filtered.filter(hotel =>
        hotel.location.toLowerCase().includes(destination.toLowerCase()) ||
        hotel.city.toLowerCase().includes(destination.toLowerCase())
      );
    }

    // Price filter
    filtered = filtered.filter(hotel => hotel.price <= filters.priceRange[1]);

    // Rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter(hotel => hotel.starRating >= filters.rating);
    }

    // Property type filter
    if (filters.propertyType.length > 0) {
      filtered = filtered.filter(hotel =>
        filters.propertyType.includes(hotel.propertyType.charAt(0).toUpperCase() + hotel.propertyType.slice(1))
      );
    }

    // Amenities filter
    if (filters.amenities.length > 0) {
      filtered = filtered.filter(hotel => {
        const hasAll = filters.amenities.every(a => hotel.amenities.includes(a));
        return hasAll;
      });
    }

    // Sort
    if (filters.sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (filters.sortBy === 'popularity') {
      filtered.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
    }

    setFilteredHotels(filtered);
  }, [filters, searchParams, stateParams]);

  const destinationLabel = stateParams?.destination || searchParams.destination || 'India';

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Sticky Search Bar */}
      <div className="bg-white shadow-md py-4 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <SearchBar />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Results Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Hotels in {destinationLabel}
            </h2>
            <p className="text-gray-600">
              {filteredHotels.length} properties found
            </p>
          </div>
          
          {/* View Toggle */}
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-lg transition ${
                viewMode === 'grid' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FiGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-lg transition ${
                viewMode === 'list' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FiList className="w-5 h-5" />
            </button>
            <button className="flex items-center space-x-2 px-4 py-3 bg-white rounded-lg hover:bg-gray-100 transition">
              <FiMapPin className="w-5 h-5" />
              <span className="hidden md:inline">Show Map</span>
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <FilterSidebar />
          </div>

          {/* Hotel Grid */}
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
                    transition={{ delay: index * 0.1 }}
                  >
                    <HotelCard hotel={hotel} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-20">
                <p className="text-xl text-gray-600 mb-4">No hotels found matching your criteria</p>
                <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-pink-600 transition">
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
