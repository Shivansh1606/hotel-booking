// src/pages/Home.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import HotelCard from '../components/HotelCard';
import { getFeaturedHotels } from '../data/hotelData';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiMapPin, FiPercent, FiAward } from 'react-icons/fi';

const Home = () => {
  const navigate = useNavigate();

  const featuredHotels = [
    {
      id: 1,
      name: 'The Grand Palace Hotel',
      location: 'New Delhi, India',
      rating: 4.8,
      price: 3500,
      originalPrice: 4500,
      discount: 22,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      amenities: ['Free WiFi', 'Swimming Pool', 'Spa', 'Restaurant', 'Gym'],
      propertyType: 'Hotel',
      starRating: 5
    },
    {
      id: 2,
      name: 'Oceanview Resort & Spa',
      location: 'Goa, India',
      rating: 4.6,
      price: 5200,
      originalPrice: 6500,
      discount: 20,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
      amenities: ['Beach Access', 'Free WiFi', 'Pool', 'Bar', 'Parking'],
      propertyType: 'Resort',
      starRating: 5
    },
    {
      id: 3,
      name: 'Boutique Heritage Stay',
      location: 'Jaipur, Rajasthan',
      rating: 4.7,
      price: 2800,
      originalPrice: 3500,
      discount: 20,
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
      amenities: ['Free WiFi', 'Restaurant', 'Room Service', 'Parking'],
      propertyType: 'Boutique Hotel',
      starRating: 4
    }
  ];

  
  
  const popularDestinations = [
    {
      name: 'Goa',
      properties: 1250,
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2'
    },
    {
      name: 'Jaipur',
      properties: 890,
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41'
    },
    {
      name: 'Kerala',
      properties: 1100,
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944'
    },
    {
      name: 'Manali',
      properties: 650,
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23'
    },
    {
      name: 'Udaipur',
      properties: 720,
      image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24'
    },
    {
      name: 'Mumbai',
      properties: 1850,
      image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445'
    }
  ];

  const features = [
    {
      icon: <FiPercent className="w-8 h-8" />,
      title: 'Best Price Guarantee',
      description: 'Find the lowest prices or get a refund'
    },
    {
      icon: <FiAward className="w-8 h-8" />,
      title: 'Quality Assurance',
      description: 'Verified properties with real reviews'
    },
    {
      icon: <FiTrendingUp className="w-8 h-8" />,
      title: 'Easy Booking',
      description: 'Book in just a few clicks'
    },
    {
      icon: <FiMapPin className="w-8 h-8" />,
      title: 'Wide Selection',
      description: '10,000+ properties worldwide'
    }
  ];

  const handleSearch = (searchParams) => {
    navigate('/search', { state: { searchParams } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection onSearch={handleSearch} />

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 text-primary rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Featured Hotels</h2>
            <p className="text-gray-600 text-lg">
              Handpicked properties offering the best experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredHotels.map((hotel, index) => (
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

          <div className="text-center mt-12">
            <button 
              onClick={() => navigate('/search')}
              className="px-8 py-4 bg-primary text-white rounded-xl font-semibold hover:bg-pink-600 transition transform hover:scale-105"
            >
              View All Hotels
            </button>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Popular Destinations</h2>
            <p className="text-gray-600 text-lg">
              Explore the most loved travel destinations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularDestinations.map((destination, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="relative h-64 rounded-2xl overflow-hidden cursor-pointer group"
              >
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-1">{destination.name}</h3>
                  <p className="text-gray-200">{destination.properties} properties</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-pink-600">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Get Special Offers</h2>
            <p className="text-xl mb-8 opacity-90">
              Subscribe to our newsletter and get exclusive deals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-white/30"
              />
              <button className="px-8 py-4 bg-white text-primary rounded-xl font-semibold hover:bg-gray-100 transition transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '10,000+', label: 'Properties' },
              { number: '50,000+', label: 'Happy Guests' },
              { number: '100+', label: 'Cities' },
              { number: '4.8', label: 'Average Rating' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-4xl font-bold text-primary mb-2">{stat.number}</h3>
                <p className="text-gray-600 text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
