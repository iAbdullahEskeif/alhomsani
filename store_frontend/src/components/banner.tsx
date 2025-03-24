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
    <div className="relative w-full h-96 overflow-hidden bg-[#0a0a0a]">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48cGF0aCBkPSJNNTkuOTk5IDYwSDBWMGg1OS45OTlWNjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTU5Ljk5OSA2MEgzMFYzMGgyOS45OTlWNjB6TTMwIDYwSDBWMzBoMzBWNjB6TTU5Ljk5OSAzMEgzMFYwaDI5Ljk5OVYzMHpNMzAgMzBIMFYwaDMwVjMweiIgZmlsbD0iIzFhMWExYSIgZmlsbC1vcGFjaXR5PSIwLjA1Ii8+PHBhdGggZD0iTTUzLjk5OSA2MEg2VjZoNDcuOTk5VjYweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0zMCA0Ny45OTljLTkuOTQxIDAtMTcuOTk5LTguMDU4LTE3Ljk5OS0xNy45OTlTMjAuMDU5IDEyIDMwIDEyczE3Ljk5OSA4LjA1OCAxNy45OTkgMTcuOTk5UzM5Ljk0MSA0Ny45OTkgMzAgNDcuOTk5eiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0zMCA0Ny45OTljLTkuOTQxIDAtMTcuOTk5LTguMDU4LTE3Ljk5OS0xNy45OTlTMjAuMDU5IDEyIDMwIDEyczE3Ljk5OSA8LjA1OCAxNy45OTkgMTcuOTk5UzM5Ljk0MSA0Ny45OTkgMzAgNDcuOTk5em0wLTMxLjk5OGMtNy43MiAwLTEzLjk5OSA2LjI3OS0xMy45OTkgMTMuOTk5UzIyLjI4IDQzLjk5OSAzMCA0My45OTlzMTMuOTk5LTYuMjc5IDEzLjk5OS0xMy45OTlTMzcuNzIgMTYuMDAxIDMwIDE2LjAwMXoiIGZpbGw9IiMxYTFhMWEiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjxwYXRoIGQ9Ik0zMCAzNS45OTljLTMuMzE0IDAtNS45OTktMi42ODYtNS45OTktNS45OTlTMjYuNjg2IDI0IDMwIDI0czUuOTk5IDIuNjg2IDUuOTk5IDUuOTk5UzMzLjMxNCAzNS45OTkgMzAgMzUuOTk5eiIgZmlsbD0iIzFhMWExYSIgZmlsbC1vcGFjaXR5PSIwLjA1Ii8+PC9zdmc+')]"></div>

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

      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/90 via-zinc-900/70 to-zinc-900/90"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <div className="w-20 h-1 bg-rose-600 mb-6"></div>
        <h1
          className="text-4xl md:text-5xl font-bold tracking-wider mb-4 text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-white"
          style={{ textShadow: "0 0 30px rgba(225, 29, 72, 0.5)" }}
        >
          Luxury Automotive
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl text-center px-4">
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
                index === currentIndex ? "bg-rose-600 w-6" : "bg-zinc-600"
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

