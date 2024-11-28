import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const images = [
  'pic1.jpg',
  'pic2.webp',
  'pic3.png',
];

const Galleries = () => {
  const [openIndexes, setOpenIndexes] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // Change every 10 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const toggleItem = (index) => {
    setOpenIndexes((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const galleries = [
    {
      title: 'Available Products',
      items: [
        { name: 'Classic Cars', path: '/ClassicCars' },
        { name: 'Luxury Cars', path: '/LuxuryCars' },
        { name: 'Electrical Cars', path: '/ElectricalCars' },
      ],
    },
    {
      title: 'Upcoming Models',
      items: [
        { name: '2025 Concept Cars', path: '/ConceptCars' },
        { name: 'Future Classics', path: '/FutureClassics' },
      ],
    },
  ];

  return (
    <>
      {/* Banner */}
      <div
        className="relative w-full h-96 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 transition-opacity duration-700 ease-in-out"></div>
        <h1 className="absolute inset-0 flex items-center justify-center text-white text-4xl md:text-5xl font-semibold tracking-wider transition-transform duration-500 ease-out transform hover:scale-105" style={{ textShadow: '2px 4px 10px rgba(0, 0, 0, 0.7)' }}>
          Rick & Morty Store
        </h1>
      </div>

      {/* Galleries Section */}
      <div className="max-w-md mx-auto mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Rick & Morty Store</h2>
        {galleries.map((gallery, index) => (
          <div key={index} className="mb-4 border border-gray-300 rounded-lg shadow-md transition-shadow duration-200 hover:shadow-lg">
            <div
              className="flex justify-between items-center p-4 bg-gray-800 text-white cursor-pointer rounded-t-lg"
              onClick={() => toggleItem(index)}
            >
              <span>{gallery.title}</span>
              <span>{openIndexes[index] ? '-' : '+'}</span>
            </div>
            {openIndexes[index] && (
              <div className="p-4 bg-gray-100">
                {gallery.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="mb-2">
                    <Link
                      to={item.path}
                      className="text-gray-800 hover:text-gray-600 transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Galleries;
