// src/pages/Contact.jsx
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  FiMail, FiPhone, FiMapPin, FiSend,
  FiClock, FiMessageCircle, FiHeadphones,
  FiChevronDown, FiChevronUp
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: <FiPhone className="w-6 h-6" />,
      title: 'Phone',
      details: '+91 98765 43210',
      subDetails: 'Mon-Sat, 9 AM - 8 PM IST',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: <FiMail className="w-6 h-6" />,
      title: 'Email',
      details: 'support@hotelbooker.com',
      subDetails: 'We reply within 24 hours',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: <FiMapPin className="w-6 h-6" />,
      title: 'Office',
      details: 'Connaught Place, New Delhi',
      subDetails: 'India - 110001',
      color: 'from-red-500 to-pink-600'
    },
    {
      icon: <FiClock className="w-6 h-6" />,
      title: 'Working Hours',
      details: 'Monday - Saturday',
      subDetails: '9:00 AM - 8:00 PM',
      color: 'from-purple-500 to-indigo-600'
    }
  ];

  const features = [
    {
      icon: <FiHeadphones className="w-8 h-8" />,
      title: '24/7 Support',
      description: 'Round the clock customer service'
    },
    {
      icon: <FiMessageCircle className="w-8 h-8" />,
      title: 'Quick Response',
      description: 'Average response time under 1 hour'
    },
    {
      icon: <FiSend className="w-8 h-8" />,
      title: 'Multiple Channels',
      description: 'Email, Phone, Chat - Choose your way'
    }
  ];

  const faqs = [
    {
      id: 1,
      question: 'How do I make a hotel booking?',
      answer: 'Simply search for your destination, select your check-in and check-out dates, choose from our wide selection of hotels, and complete the booking process with secure payment options. You will receive instant confirmation via email.'
    },
    {
      id: 2,
      question: 'What is your cancellation policy?',
      answer: 'Cancellation policies vary by hotel. Most hotels offer free cancellation up to 24-48 hours before check-in. Please check the specific cancellation terms during booking or on your booking confirmation email.'
    },
    {
      id: 3,
      question: 'How can I modify my booking?',
      answer: 'You can modify your booking by logging into your account and visiting the "My Bookings" section. Alternatively, contact our customer support team at support@hotelbooker.com or call us at +91 98765 43210.'
    },
    {
      id: 4,
      question: 'Do you offer refunds?',
      answer: 'Yes, refunds are processed according to the hotel\'s cancellation policy. If you cancel within the free cancellation period, you will receive a full refund within 5-7 business days to your original payment method.'
    },
    {
      id: 5,
      question: 'Are there any hidden charges?',
      answer: 'No, we believe in complete transparency. All charges including room rates, taxes, and service fees are clearly displayed before you confirm your booking. What you see is what you pay.'
    },
    {
      id: 6,
      question: 'How do I contact customer support?',
      answer: 'You can reach our customer support team via email at support@hotelbooker.com, call us at +91 98765 43210 (Mon-Sat, 9 AM - 8 PM IST), or use the contact form on this page. We typically respond within 1 hour.'
    },
    {
      id: 7,
      question: 'Can I book for someone else?',
      answer: 'Yes, you can book a hotel for someone else. During the booking process, simply enter the guest\'s details in the guest information section. Make sure to provide accurate contact information for the person who will be checking in.'
    },
    {
      id: 8,
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express), debit cards, UPI, net banking, and digital wallets. All payments are processed securely through encrypted payment gateways.'
    }
  ];

  const toggleFAQ = (id) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div className="pt-20 bg-gradient-to-r from-primary to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <FiMessageCircle className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
              Get In Touch
            </h1>
            <p className="text-xl text-white/95 max-w-2xl mx-auto">
              Have questions? We're here to help. Reach out to our friendly team anytime.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${info.color} text-white rounded-xl flex items-center justify-center mb-4`}>
                  {info.icon}
                </div>
                <h3 className="font-bold text-gray-800 mb-2 text-lg">{info.title}</h3>
                <p className="text-gray-900 font-semibold mb-1">{info.details}</p>
                <p className="text-sm text-gray-600">{info.subDetails}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-pink-600 text-white rounded-2xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Side by Side */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
              SEND US A MESSAGE
            </span>
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Drop Us a Line</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Fill out the form below and we'll get back to you as soon as possible
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-2xl p-8"
            >
              {submitted ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FiSend className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-4">
                    Message Sent!
                  </h3>
                  <p className="text-gray-600 text-lg">
                    We'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors"
                    >
                      <option value="">Select a subject</option>
                      <option value="booking">Booking Inquiry</option>
                      <option value="support">Customer Support</option>
                      <option value="partnership">Partnership</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary to-pink-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300"
                  >
                    <span>Send Message</span>
                    <FiSend className="w-5 h-5" />
                  </motion.button>
                </form>
              )}
            </motion.div>

            {/* Map Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="h-full min-h-[600px] bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col">
                {/* Map Header */}
                <div className="p-6 bg-gradient-to-r from-primary to-pink-600 text-white">
                  <h3 className="text-2xl font-bold mb-2">Visit Our Office</h3>
                  <p className="text-white/90">We'd love to see you in person</p>
                </div>

                {/* Map Placeholder */}
                <div className="flex-1 bg-gray-200 flex items-center justify-center p-8">
                  <div className="text-center">
                    <FiMapPin className="w-20 h-20 text-primary mx-auto mb-6" />
                    <h4 className="text-xl font-bold text-gray-800 mb-3">Find Us Here</h4>
                    <p className="text-gray-700 font-semibold mb-2">HotelBooker Office</p>
                    <p className="text-gray-600 mb-1">Connaught Place</p>
                    <p className="text-gray-600 mb-4">New Delhi - 110001, India</p>
                    <a 
                      href="https://maps.google.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-pink-600 transition shadow-lg"
                    >
                      <FiMapPin className="w-5 h-5" />
                      <span>Open in Google Maps</span>
                    </a>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="p-6 bg-white border-t-2 border-gray-100">
                  <h4 className="font-bold text-gray-800 mb-3 flex items-center space-x-2">
                    <FiClock className="w-5 h-5 text-primary" />
                    <span>Office Hours</span>
                  </h4>
                  <div className="space-y-2 text-gray-700">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span className="font-semibold">9:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="font-semibold">10:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="font-semibold text-red-600">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-pink-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
              HELP CENTER
            </span>
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Frequently Asked Questions</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Find quick answers to common questions about our services
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-bold text-gray-800 pr-4">
                    {faq.question}
                  </span>
                  {expandedFAQ === faq.id ? (
                    <FiChevronUp className="w-6 h-6 text-primary flex-shrink-0" />
                  ) : (
                    <FiChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                
                <AnimatePresence>
                  {expandedFAQ === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Still have questions CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center bg-white rounded-2xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="mailto:support@hotelbooker.com"
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition"
              >
                <FiMail className="w-5 h-5" />
                <span>Email Us</span>
              </a>
              <a 
                href="tel:+919876543210"
                className="flex items-center space-x-2 px-6 py-3 bg-white border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition"
              >
                <FiPhone className="w-5 h-5" />
                <span>Call Us</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
