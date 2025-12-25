// src/pages/Home.jsx
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import HotelCard from '../components/HotelCard';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiMapPin, FiPercent, FiAward, FiArrowRight } from 'react-icons/fi';
import { getFeaturedHotels } from '../data/hotelData';

const Home = () => {
  const navigate = useNavigate();
  const featuredHotels = getFeaturedHotels().slice(0, 3);

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
      
      {/* Add padding-top to prevent overlap with fixed header */}
      <div className="pt-20">
        <HeroSection onSearch={handleSearch} />
      </div>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-100 to-purple-100 text-primary rounded-2xl mb-4 group-hover:scale-110 group-hover:shadow-xl transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
              FEATURED PROPERTIES
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
              Handpicked Hotels
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover our selection of premium properties offering the best experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
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

          <div className="text-center">
            <motion.button 
              onClick={() => navigate('/hotels')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <span>View All Hotels</span>
              <FiArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
              EXPLORE DESTINATIONS
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
              Popular Destinations
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover amazing places across India with the best hotel deals
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularDestinations.map((destination, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => navigate('/search', { state: { searchParams: { destination: destination.name } } })}
                className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-72">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{destination.name}</h3>
                    <p className="flex items-center space-x-2 text-white/90">
                      <FiMapPin className="w-4 h-4" />
                      <span>{destination.properties}+ Properties</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of happy travelers and book your perfect stay today
            </p>
            <motion.button 
              onClick={() => navigate('/hotels')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 px-10 py-5 bg-white text-primary rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300"
            >
              <span>Explore Hotels Now</span>
              <FiArrowRight className="w-6 h-6" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
