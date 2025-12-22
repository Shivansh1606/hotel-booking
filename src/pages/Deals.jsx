// src/pages/Deals.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HotelCard from '../components/HotelCard';
import { 
  FiPercent, FiTrendingUp, FiClock, FiTag,
  FiStar, FiMapPin, FiCalendar, FiGift
} from 'react-icons/fi';
import { motion } from 'framer-motion';

const Deals = () => {
  const [activeTab, setActiveTab] = useState('all');

  const dealCategories = [
    { id: 'all', name: 'All Deals', icon: <FiPercent /> },
    { id: 'weekend', name: 'Weekend Specials', icon: <FiCalendar /> },
    { id: 'early-bird', name: 'Early Bird', icon: <FiClock /> },
    { id: 'last-minute', name: 'Last Minute', icon: <FiTrendingUp /> },
    { id: 'exclusive', name: 'Exclusive Offers', icon: <FiGift /> }
  ];

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
      icon: <FiPercent className="w-8 h-8" />
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

  const dealHotels = [
    {
      id: 1,
      name: 'The Grand Palace Hotel',
      location: 'New Delhi, India',
      rating: 4.8,
      price: 2500,
      originalPrice: 5000,
      discount: 50,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      amenities: ['Free WiFi', 'Swimming Pool', 'Spa', 'Restaurant'],
      dealType: 'Flash Sale',
      dealBadge: 'Limited Time',
      validUntil: 'Dec 31, 2025'
    },
    {
      id: 2,
      name: 'Oceanview Resort & Spa',
      location: 'Goa, India',
      rating: 4.6,
      price: 3800,
      originalPrice: 6500,
      discount: 42,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
      amenities: ['Beach Access', 'Free WiFi', 'Pool', 'Bar'],
      dealType: 'Weekend Special',
      dealBadge: 'Fri-Sun Only',
      validUntil: 'Every Weekend'
    },
    {
      id: 3,
      name: 'Luxury Lake Resort',
      location: 'Udaipur, Rajasthan',
      rating: 4.9,
      price: 4500,
      originalPrice: 8000,
      discount: 44,
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd',
      amenities: ['Lake View', 'Swimming Pool', 'Spa', 'Fine Dining'],
      dealType: 'Early Bird',
      dealBadge: 'Book 30 Days Prior',
      validUntil: 'Mar 31, 2026'
    },
    {
      id: 4,
      name: 'Mountain View Villa',
      location: 'Manali, Himachal Pradesh',
      rating: 4.7,
      price: 2800,
      originalPrice: 5000,
      discount: 44,
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
      amenities: ['Mountain View', 'Fireplace', 'Free WiFi'],
      dealType: 'Last Minute',
      dealBadge: 'Book Today',
      validUntil: 'Dec 25, 2025'
    },
    {
      id: 5,
      name: 'Heritage Boutique Stay',
      location: 'Jaipur, Rajasthan',
      rating: 4.8,
      price: 2100,
      originalPrice: 3500,
      discount: 40,
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
      amenities: ['Free WiFi', 'Restaurant', 'Heritage Property'],
      dealType: 'Exclusive',
      dealBadge: 'Member Only',
      validUntil: 'Limited Offer'
    },
    {
      id: 6,
      name: 'Beachfront Paradise',
      location: 'Kerala, India',
      rating: 4.9,
      price: 4200,
      originalPrice: 7000,
      discount: 40,
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
      amenities: ['Beach Access', 'Pool', 'Spa', 'Water Sports'],
      dealType: 'Flash Sale',
      dealBadge: 'Hot Deal',
      validUntil: 'Dec 28, 2025'
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

      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-primary to-pink-600 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
            alt="Deals"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <div className="flex items-center space-x-3 mb-4">
              <FiPercent className="w-12 h-12" />
              <span className="text-2xl font-bold">MEGA DEALS</span>
            </div>
            <h1 className="text-5xl font-bold mb-4">
              Save Up to 50% on Hotels
            </h1>
            <p className="text-xl opacity-90 mb-6">
              Exclusive deals on premium hotels across India. Limited time offers!
            </p>
            <div className="flex items-center space-x-4">
              <div className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-lg">
                <p className="text-sm opacity-90">Deals Ending Soon</p>
                <p className="text-2xl font-bold">48:00:00</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Deals */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Featured Deals</h2>
            <p className="text-gray-600 text-lg">Don't miss out on these incredible offers</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {featuredDeals.map((deal, index) => (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
              >
                <div className="h-64">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>

                <div className={`absolute top-4 left-4 px-4 py-2 ${deal.badgeColor} text-white rounded-lg font-bold text-sm`}>
                  {deal.badge}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      {deal.icon}
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold">{deal.discount}</p>
                      <p className="text-sm opacity-90">OFF</p>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{deal.title}</h3>
                  <p className="text-sm opacity-90 mb-2">{deal.description}</p>
                  <div className="flex items-center text-sm">
                    <FiClock className="w-4 h-4 mr-1" />
                    <span>Valid until {deal.validUntil}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 text-primary rounded-full mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {dealCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition ${
                  activeTab === category.id
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-xl">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>

          {/* Deal Hotels Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dealHotels.map((hotel, index) => (
              <motion.div
                key={hotel.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition group">
                  <div className="relative h-56">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white rounded-lg font-bold">
                      {hotel.discount}% OFF
                    </div>
                    <div className="absolute top-4 right-4 px-3 py-1 bg-green-500 text-white rounded-lg text-sm font-semibold">
                      {hotel.dealBadge}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-800 flex-1">
                        {hotel.name}
                      </h3>
                      <div className="flex items-center bg-primary text-white px-2 py-1 rounded-lg ml-2">
                        <FiStar className="w-4 h-4 fill-current mr-1" />
                        <span className="font-semibold">{hotel.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-600 mb-3">
                      <FiMapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{hotel.location}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <div className="flex items-baseline space-x-2">
                          <span className="text-gray-400 line-through text-sm">
                            ₹{hotel.originalPrice}
                          </span>
                          <span className="text-2xl font-bold text-primary">
                            ₹{hotel.price}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">per night</p>
                      </div>
                      <Link to={`/hotel/${hotel.id}`}>
                        <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-pink-600 transition">
                          Book Now
                        </button>
                      </Link>
                    </div>

                    <div className="mt-3 pt-3 border-t flex items-center text-sm text-gray-600">
                      <FiClock className="w-4 h-4 mr-1" />
                      <span>Valid until {hotel.validUntil}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-pink-600">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <FiGift className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">Want More Exclusive Deals?</h2>
            <p className="text-xl mb-8 opacity-90">
              Subscribe to our newsletter and get notified about special offers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-white/30"
              />
              <button className="px-8 py-4 bg-white text-primary rounded-xl font-semibold hover:bg-gray-100 transition">
                Subscribe Now
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Deals;
