// src/utils/helpers.js

// Format date to readable string
export const formatDate = (date) => {
  if (!date) return '';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-IN', options);
};

// Format date range
export const formatDateRange = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return '';
  return `${formatDate(checkIn)} - ${formatDate(checkOut)}`;
};

// Calculate number of nights
export const calculateNights = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 0;
  const diff = new Date(checkOut) - new Date(checkIn);
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

// Format price to Indian currency
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
};

// Format price without symbol
export const formatPriceShort = (price) => {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0
  }).format(price);
};

// Calculate discount percentage
export const calculateDiscount = (originalPrice, discountedPrice) => {
  if (!originalPrice || !discountedPrice) return 0;
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};

// Format guest count
export const formatGuestCount = (guests) => {
  if (!guests) return '1 Guest';
  const { adults = 0, children = 0 } = guests;
  const total = adults + children;
  return total === 1 ? '1 Guest' : `${total} Guests`;
};

// Format room count
export const formatRoomCount = (rooms) => {
  return rooms === 1 ? '1 Room' : `${rooms} Rooms`;
};

// Validate email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone (Indian format)
export const isValidPhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  const cleaned = phone.replace(/\D/g, '');
  return phoneRegex.test(cleaned);
};

// Format phone number
export const formatPhone = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  return phone;
};

// Generate random booking ID
export const generateBookingId = () => {
  const prefix = 'HB';
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}${timestamp}${random}`;
};

// Truncate text
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Get star rating display
export const getStarRating = (rating) => {
  return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
};

// Format rating
export const formatRating = (rating) => {
  return Number(rating).toFixed(1);
};

// Check if date is valid
export const isValidDate = (date) => {
  return date instanceof Date && !isNaN(date);
};

// Get today's date
export const getToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

// Get tomorrow's date
export const getTomorrow = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow;
};

// Check if check-in date is valid
export const isValidCheckIn = (date) => {
  if (!isValidDate(date)) return false;
  return date >= getToday();
};

// Check if check-out date is valid
export const isValidCheckOut = (checkIn, checkOut) => {
  if (!isValidDate(checkIn) || !isValidDate(checkOut)) return false;
  return checkOut > checkIn;
};

// Filter hotels by search query
export const filterHotelsBySearch = (hotels, searchQuery) => {
  if (!searchQuery) return hotels;
  const query = searchQuery.toLowerCase();
  return hotels.filter(hotel => 
    hotel.name.toLowerCase().includes(query) ||
    hotel.location.toLowerCase().includes(query) ||
    hotel.amenities.some(amenity => amenity.toLowerCase().includes(query))
  );
};

// Sort hotels
export const sortHotels = (hotels, sortBy) => {
  const sorted = [...hotels];
  
  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'popularity':
      return sorted.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
    case 'distance':
      return sorted.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    default:
      return sorted;
  }
};

// Get price range text
export const getPriceRangeText = (min, max) => {
  if (max >= 10000) {
    return `${formatPrice(min)} - ${formatPrice(max)}+`;
  }
  return `${formatPrice(min)} - ${formatPrice(max)}`;
};

// Calculate total with taxes
export const calculateTotalWithTaxes = (basePrice, nights) => {
  const subtotal = basePrice * nights;
  const serviceFee = subtotal * 0.1; // 10% service fee
  const taxes = subtotal * 0.1; // 10% taxes
  return {
    subtotal,
    serviceFee,
    taxes,
    total: subtotal + serviceFee + taxes
  };
};

// Format card number
export const formatCardNumber = (cardNumber) => {
  const cleaned = cardNumber.replace(/\s/g, '');
  const chunks = cleaned.match(/.{1,4}/g) || [];
  return chunks.join(' ');
};

// Mask card number (show last 4 digits)
export const maskCardNumber = (cardNumber) => {
  const cleaned = cardNumber.replace(/\s/g, '');
  if (cleaned.length < 4) return cardNumber;
  return '**** **** **** ' + cleaned.slice(-4);
};

// Debounce function for search
export const debounce = (func, delay = 300) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Local storage helpers
export const storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },
  
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },
  
  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
};

// Session storage helpers
export const session = {
  set: (key, value) => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to sessionStorage:', error);
    }
  },
  
  get: (key) => {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from sessionStorage:', error);
      return null;
    }
  },
  
  remove: (key) => {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from sessionStorage:', error);
    }
  }
};

// Copy to clipboard
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy:', error);
    return false;
  }
};

// Scroll to top
export const scrollToTop = (smooth = true) => {
  window.scrollTo({
    top: 0,
    behavior: smooth ? 'smooth' : 'auto'
  });
};

// Get query params from URL
export const getQueryParams = () => {
  const params = new URLSearchParams(window.location.search);
  const result = {};
  for (let [key, value] of params) {
    result[key] = value;
  }
  return result;
};

// Share functionality
export const shareContent = async (data) => {
  if (navigator.share) {
    try {
      await navigator.share(data);
      return true;
    } catch (error) {
      console.error('Error sharing:', error);
      return false;
    }
  }
  return false;
};

export default {
  formatDate,
  formatDateRange,
  calculateNights,
  formatPrice,
  formatPriceShort,
  calculateDiscount,
  formatGuestCount,
  formatRoomCount,
  isValidEmail,
  isValidPhone,
  formatPhone,
  generateBookingId,
  truncateText,
  getStarRating,
  formatRating,
  storage,
  session,
  copyToClipboard,
  scrollToTop,
  getQueryParams,
  shareContent
};
