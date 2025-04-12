import { useState, useEffect } from "react";
import { Gauge } from "lucide-react";

interface BannerProps {
  images: string[];
}

const Banner = ({ images }: BannerProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // Change every 10 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-96 overflow-hidden bg-zinc-950">
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
        }}
      ></div>

      <div className="absolute inset-0 bg-zinc-950/80"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <h1 className="text-4xl md:text-5xl font-medium tracking-wider mb-4 text-white">
          Luxury Automotive
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl text-center px-4">
          Engineered for those who drive the extraordinary
        </p>
        <div className="mt-8 text-zinc-400">
          <Gauge className="h-8 w-8" />
        </div>

        <div className="absolute bottom-8 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-zinc-400 w-6" : "bg-zinc-600"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
