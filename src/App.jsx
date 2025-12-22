// src/App.jsx - Add Hotels route
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Hotels from './pages/Hotels';
import SearchResults from './pages/SearchResults';
import HotelDetails from './pages/HotelDetails';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import Deals from './pages/Deals';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/hotel/:id" element={<HotelDetails />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/deals" element={<Deals />} />
      </Routes>
    </Router>
  );
}

export default App;
