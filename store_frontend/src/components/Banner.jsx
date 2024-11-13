import { useState, useEffect } from 'react';

const Banner = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // Change every 10 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div
      className="relative w-full h-96 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
      style={{
        backgroundImage: `url(${images[currentIndex]})`,
      }}
    >
      {/* Dark overlay for monochrome effect */}
      <div className="absolute inset-0 bg-black bg-opacity-60 transition-opacity duration-700 ease-in-out"></div>

      {/* Title with minimalistic styling and subtle scaling effect */}
      <h1 className="absolute inset-0 flex items-center justify-center text-white text-4xl md:text-5xl font-semibold tracking-wider transition-transform duration-500 ease-out transform hover:scale-105" style={{ textShadow: '2px 4px 10px rgba(0, 0, 0, 0.7)' }}>
        Rick & Morty Store
      </h1>
    </div>
  );
};

export default Banner;