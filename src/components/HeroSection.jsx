// src/components/HeroSection.jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { motion } from 'framer-motion';
import SearchBar from './SearchBar';

const HeroSection = () => {
  const heroImages = [
    {
      url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      title: 'Luxury Resorts',
      subtitle: 'Experience the ultimate comfort'
    },
    {
      url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
      title: 'Beachfront Paradise',
      subtitle: 'Wake up to ocean views'
    },
    {
      url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
      title: 'City Hotels',
      subtitle: 'Stay in the heart of action'
    }
  ];

  return (
    <div className="relative h-[600px] md:h-[700px]">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="h-full"
      >
        {heroImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full">
              <img 
                src={image.url} 
                alt={image.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-white px-4"
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
                  {image.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-center">
                  {image.subtitle}
                </p>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Search Bar Overlay */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-6xl px-4 z-10">
        <SearchBar />
      </div>
    </div>
  );
};

export default HeroSection;
