// src/components/HeroSection.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { FiMapPin, FiCalendar, FiUsers, FiSearch } from 'react-icons/fi';

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    destination: '',
    checkIn: null,
    checkOut: null,
    adults: 2,
    children: 0,
    rooms: 1
  });
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);

  const heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      title: 'Luxury Resorts',
      subtitle: 'Experience the ultimate comfort'
    },
    {
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b',
      title: 'Beachfront Paradise',
      subtitle: 'Wake up to ocean views'
    },
    {
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
      title: 'Mountain Retreats',
      subtitle: 'Escape to nature'
    },
    {
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
      title: 'City Hotels',
      subtitle: 'Urban luxury at its finest'
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchData.destination.trim()) {
      alert('Please enter a destination');
      return;
    }

    navigate('/search', {
      state: {
        searchParams: {
          destination: searchData.destination,
          checkIn: searchData.checkIn,
          checkOut: searchData.checkOut,
          guests: {
            adults: searchData.adults,
            children: searchData.children,
            rooms: searchData.rooms
          }
        }
      }
    });
  };

  const updateGuests = (type, action) => {
    setSearchData((prev) => ({
      ...prev,
      [type]:
        action === 'increment'
          ? prev[type] + 1
          : Math.max(type === 'adults' ? 1 : 0, prev[type] - 1)
    }));
  };

  const getTotalGuests = () => {
    const totalGuests = searchData.adults + searchData.children;
    return `${totalGuests} Guest${totalGuests !== 1 ? 's' : ''}, ${
      searchData.rooms
    } Room${searchData.rooms !== 1 ? 's' : ''}`;
  };

  return (
    <div className="relative h-[600px] md:h-[700px]">
      {/* Background Slider */}
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false
        }}
        pagination={{
          clickable: true
        }}
        loop
        className="h-full"
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
              <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-2xl">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl text-white/95 drop-shadow-lg">
                    {slide.subtitle}
                  </p>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Search Form */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-8 md:pb-12">
        <div className="max-w-6xl mx-auto">
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-3xl shadow-2xl p-6 md:p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {/* Destination */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Where
                </label>
                <div className="relative">
                  <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchData.destination}
                    onChange={(e) =>
                      setSearchData({
                        ...searchData,
                        destination: e.target.value
                      })
                    }
                    placeholder="Search destinations"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition text-gray-800"
                    required
                  />
                </div>
              </div>

              {/* Check-in */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Check-in
                </label>
                <div className="relative">
                  <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none z-10" />
                  <DatePicker
                    selected={searchData.checkIn}
                    onChange={(date) =>
                      setSearchData({ ...searchData, checkIn: date })
                    }
                    minDate={new Date()}
                    placeholderText="Add date"
                    dateFormat="dd MMM yyyy"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition text-gray-800 cursor-pointer"
                  />
                </div>
              </div>

              {/* Check-out */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Check-out
                </label>
                <div className="relative">
                  <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none z-10" />
                  <DatePicker
                    selected={searchData.checkOut}
                    onChange={(date) =>
                      setSearchData({ ...searchData, checkOut: date })
                    }
                    minDate={searchData.checkIn || new Date()}
                    placeholderText="Add date"
                    dateFormat="dd MMM yyyy"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition text-gray-800 cursor-pointer"
                  />
                </div>
              </div>

              {/* Guests */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Guests
                </label>
                <div className="relative">
                  <FiUsers className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none z-10" />
                  <button
                    type="button"
                    onClick={() =>
                      setShowGuestDropdown((prev) => !prev)
                    }
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl hover:border-primary transition text-left text-gray-800 font-medium"
                  >
                    {getTotalGuests()}
                  </button>
                </div>

                {showGuestDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full mt-2 left-0 right-0 bg-white rounded-2xl shadow-2xl p-6 z-50 border-2 border-gray-100"
                  >
                    {/* Adults */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="font-semibold text-gray-800">
                          Adults
                        </p>
                        <p className="text-sm text-gray-600">
                          Age 13+
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          type="button"
                          onClick={() =>
                            updateGuests('adults', 'decrement')
                          }
                          className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-primary text-gray-700 hover:text-primary font-bold transition"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-semibold text-gray-800">
                          {searchData.adults}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateGuests('adults', 'increment')
                          }
                          className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-primary text-gray-700 hover:text-primary font-bold transition"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="font-semibold text-gray-800">
                          Children
                        </p>
                        <p className="text-sm text-gray-600">
                          Age 2-12
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          type="button"
                          onClick={() =>
                            updateGuests('children', 'decrement')
                          }
                          className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-primary text-gray-700 hover:text-primary font-bold transition"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-semibold text-gray-800">
                          {searchData.children}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateGuests('children', 'increment')
                          }
                          className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-primary text-gray-700 hover:text-primary font-bold transition"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Rooms */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-800">
                          Rooms
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          type="button"
                          onClick={() =>
                            updateGuests('rooms', 'decrement')
                          }
                          className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-primary text-gray-700 hover:text-primary font-bold transition"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-semibold text-gray-800">
                          {searchData.rooms}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateGuests('rooms', 'increment')
                          }
                          className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-primary text-gray-700 hover:text-primary font-bold transition"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowGuestDropdown(false)}
                      className="w-full mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold text-gray-700 transition"
                    >
                      Done
                    </button>
                  </motion.div>
                )}
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-primary to-pink-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-3"
            >
              <FiSearch className="w-6 h-6" />
              <span>Search Hotels</span>
            </motion.button>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
