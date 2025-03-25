import {
  ArrowRight,
  Award,
  Shield,
  PenToolIcon as Tool,
  Zap,
  Gauge,
  Clock,
  Copyright,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import Banner from "../components/banner";
import Galleries from "../components/galleries";
import { createFileRoute } from "@tanstack/react-router";

function Index() {
  const images = ["pic1.jpg", "pic2.webp", "pic3.png"];

  const featuredVehicles = [
    {
      id: 1,
      name: "Mercedes-Benz S-Class",
      price: 110000,
      image:
        "https://www.mercedes-benz.nl/content/dam/hq/passengercars/cars/s-class/s-class-saloon-long-v223-pi/overview/exterior/08-2024/images/mercedes-benz-s-class-v223-exterior-hotspot-start-3302x1858-08-2024.jpg/1740020339417.jpg?im=Resize=(1850);Crop,rect=(0,0,1850,1040)?height=600&width=800&text=Mercedes+S-Class",
      specs: {
        power: "496 hp",
        acceleration: "4.3s",
        topSpeed: "250 km/h",
      },
    },
    {
      id: 2,
      name: "BMW 7 Series",
      price: 95000,
      image:
        "https://www.bmw.nl/content/dam/bmw/common/all-models/7-series/sedan/2022/highlights/bmw-7-series-sedan-cp-design-exterior-desktop.jpg?height=200&width=300&text=BMW+7+Series",
      specs: {
        power: "523 hp",
        acceleration: "4.1s",
        topSpeed: "250 km/h",
      },
    },
    {
      id: 3,
      name: "Audi A8",
      price: 88000,
      image:
        "https://uploads.audi-mediacenter.com/system/production/media/66243/images/479a24d3a67427d9e7d3d7c8c8b086057ac49d94/A189655_web_2880.jpg?1698328292?height=200&width=300&text=Audi+A8",
      specs: {
        power: "453 hp",
        acceleration: "4.5s",
        topSpeed: "250 km/h",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] ">
      <Banner images={images} />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <Galleries />
      </div>
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center mb-10">
          <div className="w-1 h-8 bg-rose-600 mr-3"></div>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-white">
            Featured Vehicles
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-zinc-900 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] overflow-hidden hover-lift group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={vehicle.image || "/placeholder.svg"}
                  alt={vehicle.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-60"></div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-white mb-2">
                  {vehicle.name}
                </h3>
                <p className="text-zinc-400 mb-4">
                  Starting at ${vehicle.price.toLocaleString()}
                </p>

                <div className="grid grid-cols-3 gap-2 mb-6">
                  <div className="flex flex-col items-center p-2 bg-zinc-800 rounded-lg border border-zinc-700">
                    <Zap className="h-4 w-4 text-rose-600 mb-1" />
                    <span className="text-xs text-zinc-500">Power</span>
                    <span className="text-sm font-semibold text-white">
                      {vehicle.specs.power}
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-zinc-800 rounded-lg border border-zinc-700">
                    <Clock className="h-4 w-4 text-rose-600 mb-1" />
                    <span className="text-xs text-zinc-500">0-100</span>
                    <span className="text-sm font-semibold text-white">
                      {vehicle.specs.acceleration}
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-zinc-800 rounded-lg border border-zinc-700">
                    <Gauge className="h-4 w-4 text-rose-600 mb-1" />
                    <span className="text-xs text-zinc-500">Top Speed</span>
                    <span className="text-sm font-semibold text-white">
                      {vehicle.specs.topSpeed}
                    </span>
                  </div>
                </div>

                <Link
                  to="/cars/productDetail"
                  className="w-full inline-block text-center bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-lg shadow-rose-600/20"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/cars/luxuryCars"
            className="inline-flex items-center text-rose-500 hover:text-rose-400 font-medium"
          >
            View All Vehicles
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="bg-zinc-900/50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-white mb-4">
              Why Choose Luxury Automotive
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Experience unparalleled luxury and performance with our exclusive
              collection of premium vehicles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 shadow-lg hover-lift">
              <div className="w-12 h-12 bg-rose-900/20 rounded-full flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-rose-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Premium Selection
              </h3>
              <p className="text-zinc-400">
                Our vehicles are hand-selected from the world's most prestigious
                manufacturers to ensure exceptional quality.
              </p>
            </div>

            <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 shadow-lg hover-lift">
              <div className="w-12 h-12 bg-rose-900/20 rounded-full flex items-center justify-center mb-4">
                <Tool className="h-6 w-6 text-rose-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Expert Maintenance
              </h3>
              <p className="text-zinc-400">
                Our certified technicians provide comprehensive maintenance
                services to keep your vehicle in peak condition.
              </p>
            </div>

            <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 shadow-lg hover-lift">
              <div className="w-12 h-12 bg-rose-900/20 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-rose-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Extended Warranty
              </h3>
              <p className="text-zinc-400">
                Drive with confidence knowing your investment is protected by
                our comprehensive warranty program.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="h-1 bg-gradient-to-r from-rose-600 to-blue-600 mx-auto"
        style={{
          animation: "gradient 8s ease infinite",
          backgroundSize: "200% 200%",
        }}
      ></div>

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
          <div className="text-center text-zinc-600 text-[18px]">
            <p className="flex justify-center">
              <Copyright />
              {new Date().getFullYear()} Luxury Automotive. All rights reserved.
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

export const Route = createFileRoute("/")({
  component: Index,
});
