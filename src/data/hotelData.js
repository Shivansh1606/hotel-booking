// src/data/hotelData.js
export const allHotels = [
  {
    id: 1,
    name: 'The Grand Palace Hotel',
    location: 'Connaught Place, New Delhi',
    city: 'delhi',
    rating: 4.8,
    reviewCount: 1250,
    price: 3500,
    originalPrice: 4500,
    discount: 22,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4'
    ],
    description: 'Experience luxury redefined at The Grand Palace Hotel. Nestled in the heart of New Delhi, our 5-star property offers world-class amenities, exceptional service, and breathtaking views. Perfect for both business and leisure travelers seeking an unforgettable stay in India\'s capital city.',
    amenities: ['Free WiFi', 'Swimming Pool', 'Spa & Wellness', 'Restaurant', 'Gym', '24/7 Room Service', 'Valet Parking', 'Business Center', 'Concierge'],
    propertyType: 'hotel',
    starRating: 5,
    featured: true,
    rooms: [
      {
        id: 1,
        type: 'Deluxe Room',
        price: 3500,
        size: '350 sq ft',
        capacity: 2,
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427',
        features: ['King Bed', 'City View', 'Work Desk', 'Mini Bar']
      },
      {
        id: 2,
        type: 'Executive Suite',
        price: 5500,
        size: '550 sq ft',
        capacity: 3,
        image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843',
        features: ['King Bed', 'Living Area', 'Balcony', 'Mini Bar', 'Bathtub']
      },
      {
        id: 3,
        type: 'Presidential Suite',
        price: 12000,
        size: '1200 sq ft',
        capacity: 4,
        image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461',
        features: ['2 Bedrooms', 'City View', 'Private Lounge', 'Butler Service', 'Jacuzzi']
      }
    ],
    policies: {
      checkIn: '2:00 PM',
      checkOut: '11:00 AM',
      cancellation: 'Free cancellation up to 48 hours before check-in',
      pets: 'Not allowed',
      smoking: 'Non-smoking property'
    },
    reviews: [
      {
        id: 1,
        user: 'Rahul Sharma',
        rating: 5,
        date: 'Dec 15, 2025',
        comment: 'Absolutely amazing experience! The staff was incredibly helpful and the rooms were spotless. The location is perfect for exploring Delhi.',
        avatar: 'https://i.pravatar.cc/150?img=12'
      },
      {
        id: 2,
        user: 'Priya Verma',
        rating: 4,
        date: 'Dec 10, 2025',
        comment: 'Great location and excellent amenities. Would definitely recommend! The pool and spa were highlights of our stay.',
        avatar: 'https://i.pravatar.cc/150?img=45'
      },
      {
        id: 3,
        user: 'Amit Kumar',
        rating: 5,
        date: 'Dec 5, 2025',
        comment: 'Best hotel in Delhi! Worth every penny. The breakfast buffet was exceptional.',
        avatar: 'https://i.pravatar.cc/150?img=33'
      }
    ],
    nearbyAttractions: [
      { name: 'India Gate', distance: '2.5 km' },
      { name: 'Red Fort', distance: '3.8 km' },
      { name: 'Qutub Minar', distance: '12 km' },
      { name: 'Lotus Temple', distance: '8.5 km' }
    ]
  },
  {
    id: 2,
    name: 'Oceanview Resort & Spa',
    location: 'Calangute Beach, Goa',
    city: 'goa',
    rating: 4.6,
    reviewCount: 890,
    price: 5200,
    originalPrice: 6500,
    discount: 20,
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa'
    ],
    description: 'Discover paradise at Oceanview Resort & Spa. Located right on Calangute Beach, enjoy stunning ocean views, world-class dining, and rejuvenating spa treatments. Perfect for a romantic getaway or family vacation in Goa.',
    amenities: ['Beach Access', 'Free WiFi', 'Swimming Pool', 'Beach Bar', 'Parking', 'Water Sports', 'Spa', 'Restaurant', 'Kids Club'],
    propertyType: 'resort',
    starRating: 5,
    featured: true,
    rooms: [
      {
        id: 1,
        type: 'Ocean View Room',
        price: 5200,
        size: '400 sq ft',
        capacity: 2,
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427',
        features: ['King Bed', 'Ocean View', 'Balcony', 'Mini Bar']
      },
      {
        id: 2,
        type: 'Beach Villa',
        price: 8500,
        size: '800 sq ft',
        capacity: 4,
        image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843',
        features: ['2 Bedrooms', 'Private Beach Access', 'Outdoor Shower', 'Kitchen']
      }
    ],
    policies: {
      checkIn: '3:00 PM',
      checkOut: '12:00 PM',
      cancellation: 'Free cancellation up to 72 hours before check-in',
      pets: 'Allowed with extra charge',
      smoking: 'Smoking allowed in designated areas'
    },
    reviews: [
      {
        id: 1,
        user: 'Sneha Patel',
        rating: 5,
        date: 'Dec 18, 2025',
        comment: 'Perfect beach resort! The staff was amazing and the food was delicious. Loved the beachfront location.',
        avatar: 'https://i.pravatar.cc/150?img=25'
      },
      {
        id: 2,
        user: 'Vikram Singh',
        rating: 4,
        date: 'Dec 12, 2025',
        comment: 'Great location right on the beach. Pool and spa facilities were excellent.',
        avatar: 'https://i.pravatar.cc/150?img=15'
      }
    ],
    nearbyAttractions: [
      { name: 'Calangute Beach', distance: '0 km' },
      { name: 'Baga Beach', distance: '2 km' },
      { name: 'Fort Aguada', distance: '5 km' },
      { name: 'Saturday Night Market', distance: '4 km' }
    ]
  },
  {
    id: 3,
    name: 'Boutique Heritage Stay',
    location: 'Old City, Jaipur',
    city: 'jaipur',
    rating: 4.7,
    reviewCount: 560,
    price: 2800,
    originalPrice: 3500,
    discount: 20,
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d'
    ],
    description: 'Step back in time at our Boutique Heritage Stay. This beautifully restored haveli offers an authentic Rajasthani experience with modern comforts. Explore the rich culture and history of Jaipur from this central location.',
    amenities: ['Free WiFi', 'Restaurant', 'Room Service', 'Parking', 'Heritage Architecture', 'Rooftop Terrace', 'Cultural Shows'],
    propertyType: 'boutique',
    starRating: 4,
    featured: false,
    rooms: [
      {
        id: 1,
        type: 'Heritage Room',
        price: 2800,
        size: '300 sq ft',
        capacity: 2,
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427',
        features: ['Queen Bed', 'Traditional Decor', 'Air Conditioning']
      },
      {
        id: 2,
        type: 'Royal Suite',
        price: 4500,
        size: '600 sq ft',
        capacity: 3,
        image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843',
        features: ['King Bed', 'Living Area', 'Antique Furniture', 'Balcony']
      }
    ],
    policies: {
      checkIn: '2:00 PM',
      checkOut: '11:00 AM',
      cancellation: 'Free cancellation up to 24 hours before check-in',
      pets: 'Not allowed',
      smoking: 'Non-smoking property'
    },
    reviews: [
      {
        id: 1,
        user: 'Anjali Mehta',
        rating: 5,
        date: 'Dec 8, 2025',
        comment: 'Beautiful heritage property with amazing architecture. Staff was very welcoming.',
        avatar: 'https://i.pravatar.cc/150?img=20'
      }
    ],
    nearbyAttractions: [
      { name: 'City Palace', distance: '1 km' },
      { name: 'Hawa Mahal', distance: '1.5 km' },
      { name: 'Jantar Mantar', distance: '1.2 km' },
      { name: 'Amber Fort', distance: '11 km' }
    ]
  },
  {
    id: 4,
    name: 'Mountain View Villa',
    location: 'Old Manali, Himachal Pradesh',
    city: 'manali',
    rating: 4.9,
    reviewCount: 720,
    price: 4200,
    originalPrice: 5000,
    discount: 16,
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945'
    ],
    description: 'Escape to the mountains at Mountain View Villa. Wake up to breathtaking Himalayan views, enjoy cozy evenings by the fireplace, and explore the natural beauty of Manali. Perfect for couples and families seeking a peaceful retreat.',
    amenities: ['Mountain View', 'Fireplace', 'Free WiFi', 'Kitchen', 'Parking', 'Garden', 'BBQ Area', 'Hiking Trails'],
    propertyType: 'villa',
    starRating: 4,
    featured: true,
    rooms: [
      {
        id: 1,
        type: 'Villa (3 Bedrooms)',
        price: 4200,
        size: '1500 sq ft',
        capacity: 6,
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427',
        features: ['3 Bedrooms', 'Full Kitchen', 'Living Room', 'Mountain View', 'Fireplace']
      }
    ],
    policies: {
      checkIn: '1:00 PM',
      checkOut: '10:00 AM',
      cancellation: 'Free cancellation up to 7 days before check-in',
      pets: 'Allowed',
      smoking: 'Allowed in outdoor areas'
    },
    reviews: [
      {
        id: 1,
        user: 'Rohan Kapoor',
        rating: 5,
        date: 'Dec 20, 2025',
        comment: 'Perfect mountain getaway! The views are stunning and the villa is cozy. Highly recommend for families.',
        avatar: 'https://i.pravatar.cc/150?img=8'
      }
    ],
    nearbyAttractions: [
      { name: 'Hadimba Temple', distance: '3 km' },
      { name: 'Mall Road', distance: '2 km' },
      { name: 'Solang Valley', distance: '14 km' },
      { name: 'Rohtang Pass', distance: '51 km' }
    ]
  },
  {
    id: 5,
    name: 'City Center Inn',
    location: 'Andheri, Mumbai',
    city: 'mumbai',
    rating: 4.3,
    reviewCount: 430,
    price: 2200,
    originalPrice: 2800,
    discount: 21,
    images: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd'
    ],
    description: 'Conveniently located City Center Inn offers comfortable accommodation in the heart of Mumbai. Perfect for business travelers and tourists. Easy access to major attractions and business districts.',
    amenities: ['Free WiFi', 'Air Conditioning', 'Restaurant', '24/7 Front Desk', 'Laundry Service'],
    propertyType: 'hotel',
    starRating: 3,
    featured: false,
    rooms: [
      {
        id: 1,
        type: 'Standard Room',
        price: 2200,
        size: '250 sq ft',
        capacity: 2,
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427',
        features: ['Double Bed', 'AC', 'TV', 'Work Desk']
      }
    ],
    policies: {
      checkIn: '2:00 PM',
      checkOut: '12:00 PM',
      cancellation: 'Free cancellation up to 24 hours before check-in',
      pets: 'Not allowed',
      smoking: 'Non-smoking property'
    },
    reviews: [
      {
        id: 1,
        user: 'Karan Malhotra',
        rating: 4,
        date: 'Dec 16, 2025',
        comment: 'Good value for money. Clean rooms and friendly staff.',
        avatar: 'https://i.pravatar.cc/150?img=14'
      }
    ],
    nearbyAttractions: [
      { name: 'Gateway of India', distance: '18 km' },
      { name: 'Marine Drive', distance: '15 km' },
      { name: 'Juhu Beach', distance: '5 km' }
    ]
  },
  {
    id: 6,
    name: 'Luxury Lake Resort',
    location: 'Lake Pichola, Udaipur',
    city: 'jaipur',
    rating: 4.9,
    reviewCount: 980,
    price: 6500,
    originalPrice: 8000,
    discount: 19,
    images: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4'
    ],
    description: 'Experience royal luxury at Luxury Lake Resort on the banks of Lake Pichola. This palatial property offers stunning lake views, fine dining, and impeccable service. A perfect romantic destination in the City of Lakes.',
    amenities: ['Lake View', 'Swimming Pool', 'Spa & Wellness', 'Fine Dining', 'Gym', 'Boat Rides', 'Cultural Shows', 'Yoga Classes'],
    propertyType: 'resort',
    starRating: 5,
    featured: true,
    rooms: [
      {
        id: 1,
        type: 'Lake View Room',
        price: 6500,
        size: '450 sq ft',
        capacity: 2,
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427',
        features: ['King Bed', 'Lake View', 'Balcony', 'Bathtub']
      },
      {
        id: 2,
        type: 'Royal Suite',
        price: 15000,
        size: '1000 sq ft',
        capacity: 3,
        image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843',
        features: ['King Bed', 'Private Terrace', 'Lake View', 'Butler Service', 'Jacuzzi']
      }
    ],
    policies: {
      checkIn: '2:00 PM',
      checkOut: '12:00 PM',
      cancellation: 'Free cancellation up to 7 days before check-in',
      pets: 'Not allowed',
      smoking: 'Non-smoking property'
    },
    reviews: [
      {
        id: 1,
        user: 'Neha Gupta',
        rating: 5,
        date: 'Dec 19, 2025',
        comment: 'Absolutely magical! The lake views are breathtaking and the service is impeccable.',
        avatar: 'https://i.pravatar.cc/150?img=47'
      }
    ],
    nearbyAttractions: [
      { name: 'City Palace', distance: '1 km' },
      { name: 'Jag Mandir', distance: '2 km' },
      { name: 'Lake Pichola', distance: '0 km' }
    ]
  }
];

export const getHotelById = (id) => {
  return allHotels.find(hotel => hotel.id === parseInt(id));
};

export const getFeaturedHotels = () => {
  return allHotels.filter(hotel => hotel.featured);
};

export const getHotelsByCity = (city) => {
  return allHotels.filter(hotel => hotel.city === city);
};
