// src/components/SearchBar.jsx
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FiMapPin, FiCalendar, FiUsers, FiSearch } from 'react-icons/fi';
import { useHotelStore } from '../store/hotelStore';
import { motion } from 'framer-motion';

const SearchBar = ({ onSearch }) => {
  const { searchParams, setSearchParams } = useHotelStore();
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  
  const [localParams, setLocalParams] = useState({
    destination: searchParams.destination || '',
    checkIn: searchParams.checkIn || null,
    checkOut: searchParams.checkOut || null,
    guests: searchParams.guests || { adults: 2, children: 0, rooms: 1 }
  });

  const handleSearch = () => {
    setSearchParams(localParams);
    onSearch?.(localParams);
  };

  const updateGuests = (type, operation) => {
    setLocalParams(prev => ({
      ...prev,
      guests: {
        ...prev.guests,
        [type]: operation === 'increment' 
          ? prev.guests[type] + 1 
          : Math.max(type === 'adults' ? 1 : 0, prev.guests[type] - 1)
      }
    }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-2xl p-4 md:p-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Destination */}
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Where
          </label>
          <div className="relative">
            <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search destinations"
              value={localParams.destination}
              onChange={(e) => setLocalParams({...localParams, destination: e.target.value})}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition"
            />
          </div>
        </div>

        {/* Check-in Date */}
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Check-in
          </label>
          <div className="relative">
            <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
            <DatePicker
              selected={localParams.checkIn}
              onChange={(date) => setLocalParams({...localParams, checkIn: date})}
              minDate={new Date()}
              dateFormat="dd MMM yyyy"
              placeholderText="Add date"
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition"
            />
          </div>
        </div>

        {/* Check-out Date */}
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Check-out
          </label>
          <div className="relative">
            <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
            <DatePicker
              selected={localParams.checkOut}
              onChange={(date) => setLocalParams({...localParams, checkOut: date})}
              minDate={localParams.checkIn || new Date()}
              dateFormat="dd MMM yyyy"
              placeholderText="Add date"
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition"
            />
          </div>
        </div>

        {/* Guests */}
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Guests
          </label>
          <div className="relative">
            <FiUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
            <button
              onClick={() => setShowGuestPicker(!showGuestPicker)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-left focus:border-primary focus:outline-none transition"
            >
              {localParams.guests.adults + localParams.guests.children} Guests, {localParams.guests.rooms} Room
            </button>

            {/* Guest Picker Dropdown */}
            {showGuestPicker && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-xl shadow-2xl p-4 z-20 border-2 border-gray-100">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Adults</span>
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => updateGuests('adults', 'decrement')}
                        className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-primary transition"
                      >-</button>
                      <span className="w-8 text-center font-semibold">{localParams.guests.adults}</span>
                      <button 
                        onClick={() => updateGuests('adults', 'increment')}
                        className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-primary transition"
                      >+</button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Children</span>
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => updateGuests('children', 'decrement')}
                        className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-primary transition"
                      >-</button>
                      <span className="w-8 text-center font-semibold">{localParams.guests.children}</span>
                      <button 
                        onClick={() => updateGuests('children', 'increment')}
                        className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-primary transition"
                      >+</button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Rooms</span>
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => updateGuests('rooms', 'decrement')}
                        className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-primary transition"
                      >-</button>
                      <span className="w-8 text-center font-semibold">{localParams.guests.rooms}</span>
                      <button 
                        onClick={() => updateGuests('rooms', 'increment')}
                        className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-primary transition"
                      >+</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search Button */}
      <div className="mt-6">
        <button
          onClick={handleSearch}
          className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-primary to-pink-600 text-white rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-xl transition transform hover:scale-105"
        >
          <FiSearch className="w-5 h-5" />
          <span>Search Hotels</span>
        </button>
      </div>
    </motion.div>
  );
};

export default SearchBar;
