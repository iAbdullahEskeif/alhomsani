import { useState, useEffect } from "react";
import { Gauge } from "lucide-react";
import { useTheme } from "../context/theme-context";

interface BannerProps {
  images: string[];
}

const Banner = ({ images }: BannerProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { theme } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // Change every 10 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div
      className={`relative w-full h-96 overflow-hidden ${theme === "dark" ? "bg-[#0a0a0a]" : "bg-zinc-100"}`}
    >
      <div className="absolute inset-0"></div>

      <div
        className="absolute opacity-5 right-10 top-10"
        style={{ animation: "rotate 20s linear infinite" }}
      >
        <svg
          width="200"
          height="200"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        ></svg>
      </div>

      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
        }}
      ></div>

      <div
        className={`absolute inset-0 bg-gradient-to-b ${theme === "dark" ? "from-zinc-900/90 via-zinc-900/70 to-zinc-900/90" : "from-zinc-100/90 via-zinc-100/70 to-zinc-100/90"}`}
      ></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <div className="w-20 h-1 bg-rose-600 mb-6"></div>
        <h1
          className={`text-4xl md:text-5xl font-bold tracking-wider mb-4 ${theme === "dark" ? "text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-white" : "text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-zinc-900"}`}
          style={{
            textShadow: `0 0 30px rgba(225, 29, 72, ${theme === "dark" ? "0.5" : "0.3"})`,
          }}
        >
          Luxury Automotive
        </h1>
        <p
          className={`${theme === "dark" ? "text-zinc-400" : "text-zinc-600"} text-lg md:text-xl max-w-2xl text-center px-4`}
        >
          Engineered for those who drive the extraordinary
        </p>
        <div className="mt-8 text-rose-600">
          <Gauge className="h-8 w-8 animate-pulse" />
        </div>

        <div className="absolute bottom-8 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-rose-600 w-6"
                  : theme === "dark"
                    ? "bg-zinc-600"
                    : "bg-zinc-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-600 to-blue-600"
        style={{
          animation: "gradient 8s ease infinite",
          backgroundSize: "200% 200%",
        }}
      ></div>
    </div>
  );
};

export default Banner;
