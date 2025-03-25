import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Star,
  StarHalf,
  Check,
  ShieldCheck,
  Fuel,
  Gauge,
  Calendar,
  Clock,
  Heart,
  Share2,
  ArrowLeft,
  Zap,
  Award,
  Key,
} from "lucide-react";

const MOCK_CAR = {
  id: 1,
  name: "Mercedes-Benz S-Class",
  description:
    "Experience unparalleled luxury with the flagship Mercedes-Benz S-Class. This premium sedan combines cutting-edge technology, exceptional comfort, and powerful performance in a sophisticated package that defines automotive excellence.",
  price: 110000,
  stock_quantity: 5,
  sku: "MBS-2023-550",
  category: 1,
  availability: "in_stock",
  images:
    "https://www.mercedes-benz.nl/content/dam/hq/passengercars/cars/s-class/s-class-saloon-long-v223-pi/overview/exterior/08-2024/images/mercedes-benz-s-class-v223-exterior-hotspot-start-3302x1858-08-2024.jpg/1740020339417.jpg?im=Resize=(1850);Crop,rect=(0,0,1850,1040)?height=600&width=800&text=Mercedes+S-Class",
  rating: "4.9",
  created_at: "2023-09-15T10:30:00Z",
  updated_at: "2023-11-20T14:45:00Z",
};

const CAR_COLORS = [
  { name: "Obsidian Black", hex: "#0F0F0F" },
  { name: "Diamond White", hex: "#F5F5F5" },
  { name: "Nautical Blue", hex: "#0F52BA" },
  { name: "Designo Cardinal Red", hex: "#9B111E" },
  { name: "Emerald Green", hex: "#046307" },
];

const CAR_FEATURES = [
  "Premium Nappa Leather Seats",
  "Panoramic Sunroof with Magic Sky Control",
  "MBUX Hyperscreen with AI Assistant",
  "Wireless Charging for Multiple Devices",
  "Burmester® 4D Surround Sound System",
  "Adaptive Cruise Control with Stop & Go",
  "Lane Keeping Assist with Active Steering",
  "Blind Spot Detection with Cross-Traffic Alert",
  "Heated, Ventilated & Massage Seats",
  "360° Camera System with Augmented Reality",
  "Rear-Wheel Steering for Enhanced Maneuverability",
  "Air Balance Package with Fragrance Atomization",
];

const CAR_SPECS = {
  engine: "4.0L Twin-Turbo V8",
  power: "496 hp @ 5,500 rpm",
  torque: "700 Nm @ 2,000-4,500 rpm",
  transmission: "9G-TRONIC 9-Speed Automatic",
  acceleration: "4.3 seconds (0-100 km/h)",
  topSpeed: "250 km/h (electronically limited)",
  fuelEconomy: "10.2 L/100km (combined)",
  dimensions: "5,289 mm × 1,954 mm × 1,503 mm",
  weight: "2,065 kg",
  wheelbase: "3,216 mm",
  fuelTank: "76 liters",
  trunkCapacity: "550 liters",
};

const REVIEWS = [
  {
    id: 1,
    name: "James Wilson",
    date: "2 weeks ago",
    rating: 5,
    comment:
      "Absolutely stunning vehicle. The performance is breathtaking and the interior is luxurious beyond belief. The MBUX system is intuitive and the ride quality is unmatched. Worth every penny!",
  },
  {
    id: 2,
    name: "Sophia Chen",
    date: "1 month ago",
    rating: 4.5,
    comment:
      "The driving experience is exceptional. Smooth handling and incredible acceleration. The only minor drawback is the learning curve for all the tech features, but once you get used to it, it's amazing.",
  },
  {
    id: 3,
    name: "Michael Johnson",
    date: "2 months ago",
    rating: 5,
    comment:
      "This car turns heads everywhere I go. The attention to detail is remarkable, and the driving experience is unmatched. The massage seats are a game-changer for long drives. Highly recommend!",
  },
];

const SIMILAR_CARS = [
  {
    id: 1,
    name: "BMW 7 Series",
    rating: 4.7,
    price: 95000,
    image:
      "https://www.bmw.nl/content/dam/bmw/common/all-models/7-series/sedan/2022/highlights/bmw-7-series-sedan-cp-design-exterior-desktop.jpg?height=200&width=300&text=BMW+7+Series",
  },
  {
    id: 2,
    name: "Audi A8",
    rating: 4.6,
    price: 88000,
    image:
      "https://uploads.audi-mediacenter.com/system/production/media/66243/images/479a24d3a67427d9e7d3d7c8c8b086057ac49d94/A189655_web_2880.jpg?1698328292?height=200&width=300&text=Audi+A8",
  },
  {
    id: 3,
    name: "Lexus LS",
    rating: 4.5,
    price: 78000,
    image:
      "https://www.easterns.com/wp-content/uploads/2024/08/Lexus-LS500-Easterns.png?height=200&width=300&text=Lexus+LS",
  },
];

function ProductDetail() {
  const [selectedColor, setSelectedColor] = useState(0);
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  const product = MOCK_CAR;

  const rating = Number.parseFloat(product.rating);

  const formattedPrice = product.price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const renderRating = (rating: any) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`star-${i}`} className="fill-amber-400 text-amber-400" />,
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf key="half-star" className="fill-amber-400 text-amber-400" />,
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-star-${i}`} className="text-gray-600" />);
    }

    return stars;
  };

  return (
    <div className="bg-[#0a0a0a] ">
      <div className="w-full max-w-7xl mx-auto p-4 pt-6">
        <Link
          to="/"
          className="inline-flex items-center text-rose-600 hover:text-rose-500 transition-colors"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Showroom
        </Link>
      </div>

      <div className="w-full max-w-7xl mx-auto p-4">
        <div className="gradient-border">
          <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(225,29,72,0.15)]">
            <div className="p-8 md:p-12 flex flex-col md:flex-row items-center relative">
              <div className="absolute opacity-5 right-10 top-10 gear-animation">
                <svg
                  width="200"
                  height="200"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="md:w-1/2 text-white mb-8 md:mb-0 z-10">
                <div className="inline-block px-3 py-1 bg-rose-700 text-white text-xs font-semibold rounded-full mb-4">
                  FLAGSHIP LUXURY
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-white">
                  {product.name}
                </h1>
                <div className="flex items-center mb-4">
                  <div className="flex mr-2">{renderRating(rating)}</div>
                  <span className="text-zinc-400">
                    {rating} ({Math.floor(Math.random() * 100) + 50} reviews)
                  </span>
                </div>
                <p className="text-zinc-400 text-lg mb-6 border-l-4 border-rose-600 pl-4">
                  {product.description}
                </p>
                <div className="flex items-center">
                  <span className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-white">
                    {formattedPrice}
                  </span>
                  <span className="ml-2 text-zinc-500">plus taxes & fees</span>
                </div>

                <div className="flex gap-4 mt-6">
                  <div className="flex items-center text-zinc-400">
                    <Zap className="h-5 w-5 text-rose-600 mr-2" />
                    <span>{CAR_SPECS.power.split(" ")[0]}</span>
                  </div>
                  <div className="flex items-center text-zinc-400">
                    <Clock className="h-5 w-5 text-rose-600 mr-2" />
                    <span>{CAR_SPECS.acceleration.split(" ")[0]}s</span>
                  </div>
                  <div className="flex items-center text-zinc-400">
                    <Gauge className="h-5 w-5 text-rose-600 mr-2" />
                    <span>{CAR_SPECS.topSpeed}</span>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center z-10">
                <div className="relative hover:scale-105 transition-transform duration-700">
                  <img
                    src={product.images}
                    alt={product.name}
                    className="w-full max-w-md rounded-lg shadow-2xl relative z-10 transform "
                  />
                  <div className="absolute -bottom-4  -left-4 -right-4 h-20 bg-gradient-to-t rounded-lg from-zinc-900 to-transparent z-20 "></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto p-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-zinc-900 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] p-6 hover-lift">
            <div className="flex items-center mb-4">
              <div className="w-1 h-8 bg-rose-600 mr-3"></div>
              <h2 className="text-2xl font-bold text-white">
                Performance Overview
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center p-4 bg-zinc-800 rounded-lg border border-zinc-700">
                <Gauge className="h-8 w-8 text-rose-600 mb-2" />
                <span className="text-sm text-zinc-500">Power</span>
                <span className="font-semibold text-white">
                  {CAR_SPECS.power.split(" ")[0]}
                </span>
              </div>
              <div className="flex flex-col items-center p-4 bg-zinc-800 rounded-lg border border-zinc-700">
                <Clock className="h-8 w-8 text-rose-600 mb-2" />
                <span className="text-sm text-zinc-500">0-100 km/h</span>
                <span className="font-semibold text-white">
                  {CAR_SPECS.acceleration.split(" ")[0]}s
                </span>
              </div>
              <div className="flex flex-col items-center p-4 bg-zinc-800 rounded-lg border border-zinc-700">
                <Fuel className="h-8 w-8 text-rose-600 mb-2" />
                <span className="text-sm text-zinc-500">Fuel Economy</span>
                <span className="font-semibold text-white">
                  {CAR_SPECS.fuelEconomy.split(" ")[0]}
                </span>
              </div>
              <div className="flex flex-col items-center p-4 bg-zinc-800 rounded-lg border border-zinc-700">
                <Calendar className="h-8 w-8 text-rose-600 mb-2" />
                <span className="text-sm text-zinc-500">Year</span>
                <span className="font-semibold text-white">
                  {new Date().getFullYear()}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] p-6 hover-lift">
            <div className="flex items-center mb-4">
              <div className="w-1 h-8 bg-rose-600 mr-3"></div>
              <h2 className="text-2xl font-bold text-white">Key Features</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(showAllFeatures ? CAR_FEATURES : CAR_FEATURES.slice(0, 6)).map(
                (feature, index) => (
                  <div
                    key={index}
                    className="flex items-start bg-zinc-800 p-3 rounded-lg border border-zinc-700"
                  >
                    <Check className="h-5 w-5 text-rose-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-300">{feature}</span>
                  </div>
                ),
              )}
            </div>
            {CAR_FEATURES.length > 6 && (
              <button
                onClick={() => setShowAllFeatures(!showAllFeatures)}
                className="mt-4 text-rose-500 hover:text-rose-400 font-medium flex items-center"
              >
                {showAllFeatures ? "Show Less" : "Show All Features"}
                <svg
                  className="ml-1 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {showAllFeatures ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 15l7-7 7 7"
                    ></path>
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  )}
                </svg>
              </button>
            )}
          </div>

          <div className="bg-zinc-900 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] p-6 hover-lift">
            <div className="flex items-center mb-4">
              <div className="w-1 h-8 bg-rose-600 mr-3"></div>
              <h2 className="text-2xl font-bold text-white">
                Technical Specifications
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between pb-2 border-b border-zinc-800">
                  <span className="text-zinc-500">Engine</span>
                  <span className="font-medium text-white">
                    {CAR_SPECS.engine}
                  </span>
                </div>
                <div className="flex justify-between pb-2 border-b border-zinc-800">
                  <span className="text-zinc-500">Power</span>
                  <span className="font-medium text-white">
                    {CAR_SPECS.power}
                  </span>
                </div>
                <div className="flex justify-between pb-2 border-b border-zinc-800">
                  <span className="text-zinc-500">Torque</span>
                  <span className="font-medium text-white">
                    {CAR_SPECS.torque}
                  </span>
                </div>
                <div className="flex justify-between pb-2 border-b border-zinc-800">
                  <span className="text-zinc-500">Transmission</span>
                  <span className="font-medium text-white">
                    {CAR_SPECS.transmission}
                  </span>
                </div>
                <div className="flex justify-between pb-2 border-b border-zinc-800">
                  <span className="text-zinc-500">Weight</span>
                  <span className="font-medium text-white">
                    {CAR_SPECS.weight}
                  </span>
                </div>
                <div className="flex justify-between pb-2 border-b border-zinc-800">
                  <span className="text-zinc-500">Wheelbase</span>
                  <span className="font-medium text-white">
                    {CAR_SPECS.wheelbase}
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between pb-2 border-b border-zinc-800">
                  <span className="text-zinc-500">Acceleration</span>
                  <span className="font-medium text-white">
                    {CAR_SPECS.acceleration}
                  </span>
                </div>
                <div className="flex justify-between pb-2 border-b border-zinc-800">
                  <span className="text-zinc-500">Top Speed</span>
                  <span className="font-medium text-white">
                    {CAR_SPECS.topSpeed}
                  </span>
                </div>
                <div className="flex justify-between pb-2 border-b border-zinc-800">
                  <span className="text-zinc-500">Fuel Economy</span>
                  <span className="font-medium text-white">
                    {CAR_SPECS.fuelEconomy}
                  </span>
                </div>
                <div className="flex justify-between pb-2 border-b border-zinc-800">
                  <span className="text-zinc-500">Dimensions</span>
                  <span className="font-medium text-white">
                    {CAR_SPECS.dimensions}
                  </span>
                </div>
                <div className="flex justify-between pb-2 border-b border-zinc-800">
                  <span className="text-zinc-500">Fuel Tank</span>
                  <span className="font-medium text-white">
                    {CAR_SPECS.fuelTank}
                  </span>
                </div>
                <div className="flex justify-between pb-2 border-b border-zinc-800">
                  <span className="text-zinc-500">Trunk Capacity</span>
                  <span className="font-medium text-white">
                    {CAR_SPECS.trunkCapacity}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-zinc-900 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] p-6 top-4 hover-lift">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <Key className="h-5 w-5 text-rose-600 mr-2" />
              Purchase Options
            </h2>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-zinc-500 mb-2">
                Available Colors
              </h3>
              <div className="flex flex-wrap gap-2 mb-2">
                {CAR_COLORS.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(index)}
                    className={`w-8 h-8 rounded-full border-2 ${selectedColor === index ? "border-rose-500 ring-2 ring-rose-500/30" : "border-zinc-700"}`}
                    style={{ backgroundColor: color.hex }}
                    aria-label={color.name}
                  />
                ))}
              </div>
              <p className="text-sm text-zinc-400">
                {CAR_COLORS[selectedColor].name}
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-zinc-500 mb-2">
                Stock & Availability
              </h3>
              <div className="flex items-center">
                <span
                  className={`inline-block w-3 h-3 rounded-full ${product.availability === "in_stock" ? "bg-green-500" : "bg-red-500"} mr-2`}
                ></span>
                <span className="text-sm text-zinc-400">
                  {product.availability === "in_stock"
                    ? `In Stock (${product.stock_quantity} available)`
                    : "Out of Stock"}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-zinc-500 mb-2">
                Price Breakdown
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Base Price</span>
                  <span className="text-white">{formattedPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Destination Fee</span>
                  <span className="text-white">$1,095</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Est. Tax & Title</span>
                  <span className="text-white">$9,850</span>
                </div>
                <div className="border-t border-zinc-800 pt-2 mt-2 flex justify-between font-semibold">
                  <span className="text-zinc-400">Total</span>
                  <span className="text-rose-500">
                    ${(product.price + 1095 + 9850).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                className="w-full bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-lg shadow-rose-600/20"
                disabled={product.availability !== "in_stock"}
              >
                Buy Now
              </button>
              <button className="w-full bg-zinc-800 border border-zinc-700 text-white hover:bg-zinc-700 font-medium py-3 px-4 rounded-lg transition-colors">
                Schedule Test Drive
              </button>
              <div className="flex gap-2 mt-4">
                <button className="flex-1 flex justify-center items-center gap-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 py-2 px-3 rounded-lg transition-colors">
                  <Heart className="h-4 w-4 text-rose-500" />
                  <span>Save</span>
                </button>
                <button className="flex-1 flex justify-center items-center gap-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 py-2 px-3 rounded-lg transition-colors">
                  <Share2 className="h-4 w-4 text-rose-500" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center text-sm text-zinc-500">
              <ShieldCheck className="h-4 w-4 mr-1 text-rose-500" />
              <span>Secure transaction & 7-day return policy</span>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] p-6 hover-lift">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <Award className="h-5 w-5 text-rose-600 mr-2" />
              Financing Options
            </h2>
            <div className="space-y-4">
              <div className="p-4 border border-rose-900/50 rounded-lg bg-gradient-to-br from-zinc-800 to-zinc-900 shadow-lg shadow-rose-900/10">
                <div className="font-semibold text-rose-400 mb-1">
                  36-Month Financing
                </div>
                <div className="text-2xl font-bold text-white mb-2">
                  $2,899/mo
                </div>
                <div className="text-sm text-zinc-400">
                  <p>3.9% APR, $15,000 down payment</p>
                  <p>Total cost: ${(2899 * 36 + 15000).toLocaleString()}</p>
                </div>
              </div>

              <div className="p-4 border border-zinc-800 rounded-lg bg-zinc-800/50">
                <div className="font-semibold text-zinc-400 mb-1">
                  48-Month Financing
                </div>
                <div className="text-lg font-bold text-white mb-2">
                  $2,299/mo
                </div>
                <div className="text-sm text-zinc-500">
                  <p>4.2% APR, $15,000 down payment</p>
                  <p>Total cost: ${(2299 * 48 + 15000).toLocaleString()}</p>
                </div>
              </div>

              <div className="p-4 border border-zinc-800 rounded-lg bg-zinc-800/50">
                <div className="font-semibold text-zinc-400 mb-1">
                  60-Month Financing
                </div>
                <div className="text-lg font-bold text-white mb-2">
                  $1,949/mo
                </div>
                <div className="text-sm text-zinc-500">
                  <p>4.5% APR, $15,000 down payment</p>
                  <p>Total cost: ${(1949 * 60 + 15000).toLocaleString()}</p>
                </div>
              </div>

              <button className="w-full mt-2 text-rose-500 hover:text-rose-400 font-medium">
                Calculate Custom Payment
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto p-4 mt-4">
        <div className="bg-zinc-900 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] p-6 hover-lift">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <div className="w-1 h-8 bg-rose-600 mr-3"></div>
              <h2 className="text-2xl font-bold text-white">
                Customer Reviews
              </h2>
            </div>
            <button className="text-rose-500 hover:text-rose-400 font-medium">
              Write a Review
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="flex flex-col items-center">
                <div className="text-5xl font-bold text-white mb-2">
                  {rating}
                </div>
                <div className="flex mb-2">{renderRating(rating)}</div>
                <p className="text-zinc-500">Based on 87 reviews</p>

                <div className="w-full mt-6 space-y-2">
                  <div className="flex items-center">
                    <span className="text-sm w-16 text-zinc-500">5 stars</span>
                    <div className="flex-1 h-2 mx-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-400 h-full rounded-full"
                        style={{ width: "78%" }}
                      ></div>
                    </div>
                    <span className="text-sm text-zinc-500">78%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm w-16 text-zinc-500">4 stars</span>
                    <div className="flex-1 h-2 mx-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-400 h-full rounded-full"
                        style={{ width: "15%" }}
                      ></div>
                    </div>
                    <span className="text-sm text-zinc-500">15%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm w-16 text-zinc-500">3 stars</span>
                    <div className="flex-1 h-2 mx-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-400 h-full rounded-full"
                        style={{ width: "5%" }}
                      ></div>
                    </div>
                    <span className="text-sm text-zinc-500">5%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm w-16 text-zinc-500">2 stars</span>
                    <div className="flex-1 h-2 mx-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-400 h-full rounded-full"
                        style={{ width: "2%" }}
                      ></div>
                    </div>
                    <span className="text-sm text-zinc-500">2%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm w-16 text-zinc-500">1 star</span>
                    <div className="flex-1 h-2 mx-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-400 h-full rounded-full"
                        style={{ width: "0%" }}
                      ></div>
                    </div>
                    <span className="text-sm text-zinc-500">0%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-2/3">
              <div className="space-y-6">
                {REVIEWS.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-zinc-800 pb-6"
                  >
                    <div className="flex justify-between mb-2">
                      <div className="font-medium text-white">
                        {review.name}
                      </div>
                      <div className="text-zinc-500 text-sm">{review.date}</div>
                    </div>
                    <div className="flex mb-2">
                      {renderRating(review.rating)}
                    </div>
                    <p className="text-zinc-400">{review.comment}</p>
                  </div>
                ))}
              </div>

              <button className="mt-6 text-rose-500 hover:text-rose-400 font-medium">
                View All 87 Reviews
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto p-4 mt-8 mb-16">
        <div className="flex items-center mb-6">
          <div className="w-1 h-8 bg-rose-600 mr-3"></div>
          <h2 className="text-2xl font-bold text-white">You May Also Like</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SIMILAR_CARS.map((car) => (
            <div
              key={car.id}
              className="bg-zinc-900 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] overflow-hidden hover-lift group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={car.image || "/placeholder.svg"}
                  alt={car.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-60"></div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1 text-white">
                  {car.name}
                </h3>
                <div className="flex mb-2">{renderRating(car.rating)}</div>
                <p className="text-zinc-500 mb-3">
                  Starting at ${car.price.toLocaleString()}
                </p>
                <button className="text-rose-500 hover:text-rose-400 font-medium flex items-center">
                  View Details
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full bg-zinc-950 border-t border-zinc-800 py-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="gears"
                x="0"
                y="0"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path d="M11 15H13V17H11V15Z" fill="white" />
                <path d="M15 15H17V17H15V15Z" fill="white" />
                <path d="M19 15H21V17H19V15Z" fill="white" />
                <path d="M23 15H25V17H23V15Z" fill="white" />
                <path d="M27 15H29V17H27V15Z" fill="white" />
                <path d="M11 19H13V21H11V19Z" fill="white" />
                <path d="M15 19H17V21H15V19Z" fill="white" />
                <path d="M19 19H21V21H19V19Z" fill="white" />
                <path d="M23 19H25V21H23V19Z" fill="white" />
                <path d="M27 19H29V21H27V19Z" fill="white" />
                <path d="M11 23H13V25H11V23Z" fill="white" />
                <path d="M15 23H17V25H15V23Z" fill="white" />
                <path d="M19 23H21V25H19V23Z" fill="white" />
                <path d="M23 23H25V25H23V23Z" fill="white" />
                <path d="M27 23H29V25H27V23Z" fill="white" />
              </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#gears)" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center text-zinc-600 text-sm">
            <p>
              © {new Date().getFullYear()} Luxury Automotive. All rights
              reserved.
            </p>
            <p className="mt-2">
              Engineered for those who drive the extraordinary.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/cars/productDetail")({
  component: ProductDetail,
});
