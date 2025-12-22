// src/store/hotelStore.js - Line 2 ko update karo
import { create } from 'zustand';  // 'create' ko destructure karna padega

export const useHotelStore = create((set) => ({
  searchParams: {
    destination: '',
    checkIn: null,
    checkOut: null,
    guests: { adults: 2, children: 0, rooms: 1 }
  },
  filters: {
    priceRange: [0, 10000],
    rating: 0,
    amenities: [],
    propertyType: [],
    sortBy: 'popularity'
  },
  hotels: [],
  selectedHotel: null,
  
  setSearchParams: (params) => set({ searchParams: params }),
  setFilters: (filters) => set({ filters }),
  setHotels: (hotels) => set({ hotels }),
  setSelectedHotel: (hotel) => set({ selectedHotel: hotel }),
}));
