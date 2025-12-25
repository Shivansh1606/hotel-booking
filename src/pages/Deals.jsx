// src/pages/Deals.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HotelCard from '../components/HotelCard';
import { 
  FiPercent, FiTrendingUp, FiClock, FiTag,
  FiStar, FiMapPin, FiCalendar, FiGift, FiZap
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { allHotels } from '../data/hotelData';

const Deals = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  const dealCategories = [
    { id: 'all', name: 'All Deals', icon: <FiPercent /> },
    { id: 'weekend', name: 'Weekend Specials', icon: <FiCalendar /> },
    { id: 'early-bird', name: 'Early Bird', icon: <FiClock /> },
    { id: 'last-minute', name: 'Last Minute', icon: <FiTrendingUp /> },
    { id: 'exclusive', name: 'Exclusive Offers', icon: <FiGift /> }
  ];

  const dealHotels = allHotels.filter(h => h.discount && h.discount > 0);

  const featuredDeals = [
    {
      id: 1,
      badge: 'SUPER DEAL',
      badgeColor: 'bg-red-500',
      title: 'Flash Sale - Up to 50% OFF',
      description: 'Limited time offer on premium hotels',
      discount: '50%',
      validUntil: 'Dec 31, 2025',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      icon: <FiZap className="w-8 h-8" />
    },
    {
      id: 2,
      badge: 'WEEKEND SPECIAL',
      badgeColor: 'bg-blue-500',
      title: 'Weekend Getaway Deals',
      description: 'Book Friday to Sunday and save big',
      discount: '35%',
      validUntil: 'Every Weekend',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
      icon: <FiCalendar className="w-8 h-8" />
    },
    {
      id: 3,
      badge: 'EARLY BIRD',
      badgeColor: 'bg-green-500',
      title: 'Book Early & Save',
      description: 'Reserve 30 days in advance',
      discount: '40%',
      validUntil: 'Limited Period',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
      icon: <FiClock className="w-8 h-8" />
    }
  ];

  const benefits = [
    {
      icon: <FiPercent className="w-8 h-8" />,
      title: 'Best Price Guarantee',
      description: 'We guarantee the lowest prices on all deals'
    },
    {
      icon: <FiTag className="w-8 h-8" />,
      title: 'No Hidden Charges',
      description: 'What you see is what you pay - completely transparent'
    },
    {
      icon: <FiStar className="w-8 h-8" />,
      title: 'Premium Properties',
      description: 'All hotels are verified and highly rated'
    },
    {
      icon: <FiMapPin className="w-8 h-8" />,
      title: 'Prime Locations',
      description: 'Hotels in the best areas of every city'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section with proper padding */}
      {/* Hero Section with background image */}
<div
  className="pt-20 text-white bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: "url('https://i.ibb.co/QjT00Fdz/your-image.jpg')",
  }}
>
  {/* Optional overlay for better text visibility */}
  <div className="bg-black/50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-block mb-6"
        >
          <FiPercent className="w-20 h-20 text-white drop-shadow-lg" />
        </motion.div>

        <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
          Exclusive Hotel Deals
        </h1>

        <p className="text-2xl text-white/95 mb-8 max-w-3xl mx-auto">
          Save up to 50% on handpicked hotels. Limited time offers!
        </p>

        <div className="flex flex-wrap justify-center gap-6 text-lg">
          <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl">
            <FiStar className="w-6 h-6" />
            <span className="font-semibold">Verified Deals</span>
          </div>

          <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl">
            <FiClock className="w-6 h-6" />
            <span className="font-semibold">Time Limited</span>
          </div>

          <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl">
            <FiTag className="w-6 h-6" />
            <span className="font-semibold">Best Prices</span>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
</div>

      {/* Featured Deals Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 bg-red-100 text-red-600 rounded-full text-sm font-semibold mb-4">
              HOT DEALS 🔥
            </span>
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Featured Offers</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Don't miss out on these incredible limited-time deals
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDeals.map((deal, index) => (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative group cursor-pointer"
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                  {/* Badge */}
                  <div className={`absolute top-4 right-4 z-10 ${deal.badgeColor} text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg`}>
                    {deal.badge}
                  </div>

                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={deal.image}
                      alt={deal.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Discount Badge */}
                    <div className="absolute bottom-4 left-4 bg-white text-red-600 px-6 py-3 rounded-xl font-bold text-2xl shadow-xl">
                      {deal.discount} OFF
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center space-x-3 mb-4 text-primary">
                      {deal.icon}
                      <h3 className="text-2xl font-bold text-gray-800">{deal.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{deal.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-gray-500">
                        <FiClock className="w-4 h-4" />
                        <span className="text-sm">Valid until: {deal.validUntil}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Why Book With Us?</h2>
            <p className="text-gray-600 text-lg">Enjoy these exclusive benefits with every booking</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-pink-600 text-white rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {dealCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === category.id
                    ? 'bg-gradient-to-r from-primary to-pink-600 text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="text-xl">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>

          {/* Deal Hotels Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {dealHotels.map((hotel, index) => (
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
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <FiGift className="w-20 h-20 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Don't Miss Out on These Deals!
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Limited time offers. Book now and save big on your next vacation.
            </p>
            <motion.button
              onClick={() => navigate('/hotels')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white text-primary rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300"
            >
              Browse All Deals
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Deals;
