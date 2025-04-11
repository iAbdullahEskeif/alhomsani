import {
  ArrowRight,
  Award,
  Shield,
  PenToolIcon as Tool,
  Zap,
  Gauge,
  Clock,
  Copyright,
  Heart,
  Bookmark,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import Banner from "../components/banner";
import Galleries from "../components/galleries";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { API_URL } from "../config";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

function Index() {
  const images = ["pic1.jpg", "pic2.webp", "pic3.png"];
  const { isSignedIn, getToken } = useAuth();
  const [favorites, setFavorites] = useState<number[]>([]);
  const [bookmarks, setBookmarks] = useState<number[]>([]);

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

  // Toggle favorite
  const toggleFavorite = async (carId: number) => {
    if (!isSignedIn) {
      toast.error("Please sign in to add favorites");
      return;
    }

    try {
      const isFavorite = favorites.includes(carId);
      const endpoint = isFavorite
        ? `/profiles/favorites/remove/${carId}/`
        : `/profiles/favorites/add/${carId}/`;

      const token = await getToken();
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ car_id: carId }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to ${isFavorite ? "remove from" : "add to"} favorites`,
        );
      }

      // Update local state
      if (isFavorite) {
        setFavorites(favorites.filter((id) => id !== carId));
        toast.success("Removed from favorites");
      } else {
        setFavorites([...favorites, carId]);
        toast.success("Added to favorites");
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast.error("Failed to update favorites");
    }
  };

  // Toggle bookmark
  const toggleBookmark = async (carId: number) => {
    if (!isSignedIn) {
      toast.error("Please sign in to add bookmarks");
      return;
    }

    try {
      const isBookmarked = bookmarks.includes(carId);
      const endpoint = isBookmarked
        ? `/profiles/bookmarks/remove/${carId}/`
        : `/profiles/bookmarks/add/${carId}/`;

      const token = await getToken();
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ car_id: carId }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to ${isBookmarked ? "remove from" : "add to"} bookmarks`,
        );
      }

      // Update local state
      if (isBookmarked) {
        setBookmarks(bookmarks.filter((id) => id !== carId));
        toast.success("Removed from bookmarks");
      } else {
        setBookmarks([...bookmarks, carId]);
        toast.success("Added to bookmarks");
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      toast.error("Failed to update bookmarks");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <Banner images={images} />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <Galleries />
      </div>
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-medium text-white mb-10">
          Featured Vehicles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredVehicles.map((vehicle) => (
            <Card
              key={vehicle.id}
              className="bg-zinc-900 border-zinc-800 shadow-md overflow-hidden transition-all duration-300 hover:border-zinc-700"
            >
              <div className="relative overflow-hidden">
                <img
                  src={vehicle.image || "/placeholder.svg"}
                  alt={vehicle.name}
                  className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="size-8 bg-zinc-900/80 hover:bg-zinc-800"
                    onClick={() => toggleFavorite(vehicle.id)}
                  >
                    <Heart
                      className={`size-4 ${favorites.includes(vehicle.id) ? "fill-zinc-300 text-zinc-300" : "text-zinc-400"}`}
                    />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="size-8 bg-zinc-900/80 hover:bg-zinc-800"
                    onClick={() => toggleBookmark(vehicle.id)}
                  >
                    <Bookmark
                      className={`size-4 ${bookmarks.includes(vehicle.id) ? "fill-zinc-300 text-zinc-300" : "text-zinc-400"}`}
                    />
                  </Button>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-medium text-white mb-2">
                  {vehicle.name}
                </h3>
                <p className="text-zinc-400 mb-4">
                  Starting at ${vehicle.price.toLocaleString()}
                </p>

                <div className="grid grid-cols-3 gap-2 mb-6">
                  <div className="flex flex-col items-center p-2 bg-zinc-800 rounded-md">
                    <Zap className="size-4 text-zinc-400 mb-1" />
                    <span className="text-xs text-zinc-500">Power</span>
                    <span className="text-sm font-medium text-white">
                      {vehicle.specs.power}
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-zinc-800 rounded-md">
                    <Clock className="size-4 text-zinc-400 mb-1" />
                    <span className="text-xs text-zinc-500">0-100</span>
                    <span className="text-sm font-medium text-white">
                      {vehicle.specs.acceleration}
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-zinc-800 rounded-md">
                    <Gauge className="size-4 text-zinc-400 mb-1" />
                    <span className="text-xs text-zinc-500">Top Speed</span>
                    <span className="text-sm font-medium text-white">
                      {vehicle.specs.topSpeed}
                    </span>
                  </div>
                </div>

                <Button
                  asChild
                  variant="secondary"
                  className="w-full bg-zinc-800 text-zinc-200 border-zinc-700 hover:bg-zinc-700"
                >
                  <Link to="/">View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button
            variant="ghost"
            asChild
            className="text-zinc-300 hover:text-white hover:bg-zinc-800"
          >
            <Link to="/cars/luxuryCars" className="inline-flex items-center">
              View All Vehicles
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="bg-zinc-900 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium text-white mb-4">
              Why Choose Luxury Automotive
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Experience unparalleled luxury and performance with our exclusive
              collection of premium vehicles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-zinc-900 border-zinc-800 transition-all duration-300 hover:border-zinc-700">
              <CardContent className="pt-6">
                <div className="size-12 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                  <Award className="size-6 text-zinc-400" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">
                  Premium Selection
                </h3>
                <p className="text-zinc-400">
                  Our vehicles are hand-selected from the world's most
                  prestigious manufacturers to ensure exceptional quality.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800 transition-all duration-300 hover:border-zinc-700">
              <CardContent className="pt-6">
                <div className="size-12 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                  <Tool className="size-6 text-zinc-400" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">
                  Expert Maintenance
                </h3>
                <p className="text-zinc-400">
                  Our certified technicians provide comprehensive maintenance
                  services to keep your vehicle in peak condition.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800 transition-all duration-300 hover:border-zinc-700">
              <CardContent className="pt-6">
                <div className="size-12 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                  <Shield className="size-6 text-zinc-400" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">
                  Extended Warranty
                </h3>
                <p className="text-zinc-400">
                  Drive with confidence knowing your investment is protected by
                  our comprehensive warranty program.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Separator className="bg-zinc-800" />

      <footer className="w-full bg-zinc-950 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-zinc-600 text-sm">
            <p className="flex justify-center items-center gap-1">
              <Copyright className="size-4" />
              <span>
                {new Date().getFullYear()} Luxury Automotive. All rights
                reserved.
              </span>
            </p>
            <p className="mt-2">
              Engineered for those who drive the extraordinary.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export const Route = createFileRoute("/")({
  component: Index,
});
