import { useState, useEffect } from "react";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useAuth } from "@clerk/clerk-react";
import { API_URL } from "../../config";
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
  Bookmark,
  Loader2,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Mock data for fields not available from the API
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

interface CarType {
  id: number;
  name: string;
  description: string;
  price: string;
  stock_quantity: number;
  sku: string;
  category: number;
  availability: "in_stock" | "out_of_stock";
  car_type: "classic" | "luxury" | "electrical";
  images: string;
  created_at: string;
  updated_at: string;
}

function ProductDetail() {
  const { id } = useParams({ from: "/cars/$id" });
  const [selectedColor, setSelectedColor] = useState(0);
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [product, setProduct] = useState<CarType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isSignedIn, getToken } = useAuth();

  // Default rating for mock data
  const rating = 4.9;

  // Fetch car data from API
  useEffect(() => {
    const fetchCarData = async () => {
      try {
        setIsLoading(true);
        const token = await getToken();
        const response = await fetch(`${API_URL}/api/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch car details");
        }

        const data = await response.json();
        setProduct(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching car details:", error);
        setError("Failed to load car details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchCarData();
    }
  }, [id, getToken]);

  // Check if car is in favorites/bookmarks on component mount
  useEffect(() => {
    const checkSavedStatus = async () => {
      if (!isSignedIn) return;

      try {
        const token = await getToken();
        const response = await fetch(`${API_URL}/profiles/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const profile = await response.json();
        setIsFavorite(profile.favorite_cars.includes(Number(id)));
        setIsBookmarked(profile.bookmarked_cars.includes(Number(id)));
      } catch (error) {
        console.error("Error checking saved status:", error);
      }
    };

    checkSavedStatus();
  }, [isSignedIn, getToken, id]);

  // Format price
  const formatPrice = (price: string): string => {
    return Number.parseFloat(price).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  // Toggle favorite
  const toggleFavorite = async () => {
    if (!isSignedIn) {
      toast.error("Please sign in to add favorites");
      return;
    }

    try {
      const endpoint = isFavorite
        ? `/profiles/favorites/remove/${id}/`
        : `/profiles/favorites/add/${id}/`;

      const token = await getToken();
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ car_id: Number(id) }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to ${isFavorite ? "remove from" : "add to"} favorites`,
        );
      }

      setIsFavorite(!isFavorite);
      toast.success(
        isFavorite ? "Removed from favorites" : "Added to favorites",
      );
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast.error("Failed to update favorites");
    }
  };

  // Toggle bookmark
  const toggleBookmark = async () => {
    if (!isSignedIn) {
      toast.error("Please sign in to add bookmarks");
      return;
    }

    try {
      const endpoint = isBookmarked
        ? `/profiles/bookmarks/remove/${id}/`
        : `/profiles/bookmarks/add/${id}/`;

      const token = await getToken();
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ car_id: Number(id) }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to ${isBookmarked ? "remove from" : "add to"} bookmarks`,
        );
      }

      setIsBookmarked(!isBookmarked);
      toast.success(
        isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      );
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      toast.error("Failed to update bookmarks");
    }
  };

  const renderRating = (rating: number) => {
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="size-12 text-zinc-700 animate-spin mx-auto mb-4" />
          <p className="text-zinc-400">Loading car details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Card className="max-w-md w-full bg-zinc-900 border-zinc-800 shadow-md">
          <CardHeader>
            <CardTitle className="text-white">Car Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-400 mb-4">
              {error || "We couldn't find the car you're looking for."}
            </p>
            <Button
              asChild
              variant="secondary"
              className="w-full bg-zinc-800 text-zinc-200 border-zinc-700 hover:bg-zinc-700"
            >
              <Link to="/">Return to Showroom</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Calculate total price with fees
  const basePrice = Number.parseFloat(product.price);
  const destinationFee = 1095;
  const taxAndTitle = Math.round(basePrice * 0.09); // Approximately 9% for tax and title
  const totalPrice = basePrice + destinationFee + taxAndTitle;

  return (
    <div className="bg-zinc-950">
      <div className="w-full max-w-7xl mx-auto p-4 pt-6">
        <Link
          to="/"
          className="inline-flex items-center text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="mr-1 size-4" />
          Back to Showroom
        </Link>
      </div>

      <div className="w-full max-w-7xl mx-auto p-4">
        <Card className="bg-zinc-900 border-zinc-800 shadow-md overflow-hidden">
          <CardContent className="p-8 md:p-12 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-white mb-8 md:mb-0 z-10">
              <Badge className="mb-4 bg-zinc-800 text-white hover:bg-zinc-700">
                {product.car_type.toUpperCase()} CAR
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-4 text-white">
                {product.name}
              </h1>
              <div className="flex items-center mb-4">
                <div className="flex mr-2">{renderRating(rating)}</div>
                <span className="text-zinc-400">
                  {rating} ({Math.floor(Math.random() * 100) + 50} reviews)
                </span>
              </div>
              <p className="text-zinc-400 text-lg mb-6 border-l-4 border-zinc-700 pl-4">
                {product.description}
              </p>
              <div className="flex items-center">
                <span className="text-3xl md:text-4xl font-medium text-white">
                  {formatPrice(product.price)}
                </span>
                <span className="ml-2 text-zinc-500">plus taxes & fees</span>
              </div>

              <div className="flex gap-4 mt-6">
                <div className="flex items-center text-zinc-400">
                  <Zap className="size-5 text-zinc-500 mr-2" />
                  <span>{CAR_SPECS.power.split(" ")[0]}</span>
                </div>
                <div className="flex items-center text-zinc-400">
                  <Clock className="size-5 text-zinc-500 mr-2" />
                  <span>{CAR_SPECS.acceleration.split(" ")[0]}s</span>
                </div>
                <div className="flex items-center text-zinc-400">
                  <Gauge className="size-5 text-zinc-500 mr-2" />
                  <span>{CAR_SPECS.topSpeed}</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center z-10">
              <div className="relative transition-transform duration-500 hover:scale-105">
                <img
                  src={
                    product.images ||
                    "/placeholder.svg?height=400&width=600&text=No+Image"
                  }
                  alt={product.name}
                  className="w-full max-w-md rounded-lg shadow-md"
                  onError={(e) => {
                    e.currentTarget.src =
                      "/placeholder.svg?height=400&width=600&text=No+Image";
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="w-full max-w-7xl mx-auto p-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="bg-zinc-900 border-zinc-800 shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl font-medium text-white">
                Performance Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col items-center p-4 bg-zinc-800 rounded-lg">
                  <Gauge className="size-8 text-zinc-400 mb-2" />
                  <span className="text-sm text-zinc-500">Power</span>
                  <span className="font-medium text-white">
                    {CAR_SPECS.power.split(" ")[0]}
                  </span>
                </div>
                <div className="flex flex-col items-center p-4 bg-zinc-800 rounded-lg">
                  <Clock className="size-8 text-zinc-400 mb-2" />
                  <span className="text-sm text-zinc-500">0-100 km/h</span>
                  <span className="font-medium text-white">
                    {CAR_SPECS.acceleration.split(" ")[0]}s
                  </span>
                </div>
                <div className="flex flex-col items-center p-4 bg-zinc-800 rounded-lg">
                  <Fuel className="size-8 text-zinc-400 mb-2" />
                  <span className="text-sm text-zinc-500">Fuel Economy</span>
                  <span className="font-medium text-white">
                    {CAR_SPECS.fuelEconomy.split(" ")[0]}
                  </span>
                </div>
                <div className="flex flex-col items-center p-4 bg-zinc-800 rounded-lg">
                  <Calendar className="size-8 text-zinc-400 mb-2" />
                  <span className="text-sm text-zinc-500">Year</span>
                  <span className="font-medium text-white">
                    {new Date(product.created_at).getFullYear()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800 shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl font-medium text-white">
                Key Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(showAllFeatures
                  ? CAR_FEATURES
                  : CAR_FEATURES.slice(0, 6)
                ).map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start bg-zinc-800 p-3 rounded-lg"
                  >
                    <Check className="size-5 text-zinc-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-300">{feature}</span>
                  </div>
                ))}
              </div>
              {CAR_FEATURES.length > 6 && (
                <Button
                  variant="ghost"
                  onClick={() => setShowAllFeatures(!showAllFeatures)}
                  className="mt-4 text-zinc-400 hover:text-white hover:bg-zinc-800"
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
                </Button>
              )}
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800 shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl font-medium text-white">
                Technical Specifications
              </CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="bg-zinc-900 border-zinc-800 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-medium text-white flex items-center">
                <Key className="size-5 text-zinc-400 mr-2" />
                Purchase Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-zinc-500 mb-2">
                  Available Colors
                </h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  {CAR_COLORS.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(index)}
                      className={`size-8 rounded-full border-2 ${
                        selectedColor === index
                          ? "border-zinc-400 ring-2 ring-zinc-400/30"
                          : "border-zinc-700"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      aria-label={color.name}
                    />
                  ))}
                </div>
                <p className="text-sm text-zinc-400">
                  {CAR_COLORS[selectedColor].name}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-zinc-500 mb-2">
                  Stock & Availability
                </h3>
                <div className="flex items-center">
                  <span
                    className={`inline-block size-3 rounded-full ${
                      product.availability === "in_stock"
                        ? "bg-emerald-500"
                        : "bg-zinc-500"
                    } mr-2`}
                  ></span>
                  <span className="text-sm text-zinc-400">
                    {product.availability === "in_stock"
                      ? `In Stock (${product.stock_quantity} available)`
                      : "Out of Stock"}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-zinc-500 mb-2">
                  Price Breakdown
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Base Price</span>
                    <span className="text-white">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Destination Fee</span>
                    <span className="text-white">
                      ${destinationFee.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Est. Tax & Title</span>
                    <span className="text-white">
                      ${taxAndTitle.toLocaleString()}
                    </span>
                  </div>
                  <Separator className="my-2 bg-zinc-800" />
                  <div className="flex justify-between font-medium">
                    <span className="text-zinc-400">Total</span>
                    <span className="text-white">
                      ${totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  className="w-full bg-zinc-800 text-zinc-200 border-zinc-700 hover:bg-zinc-700"
                  variant="secondary"
                  disabled={product.availability !== "in_stock"}
                >
                  Buy Now
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-zinc-700 text-white hover:bg-zinc-800 hover:text-white"
                >
                  Schedule Test Drive
                </Button>
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    className={`flex-1 flex justify-center items-center gap-1 border-zinc-700 ${
                      isFavorite
                        ? "bg-zinc-800 text-white"
                        : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                    }`}
                    onClick={toggleFavorite}
                  >
                    <Heart
                      className={`size-4 ${isFavorite ? "fill-zinc-300" : ""}`}
                    />
                    <span>{isFavorite ? "Saved" : "Save"}</span>
                  </Button>
                  <Button
                    variant="outline"
                    className={`flex-1 flex justify-center items-center gap-1 border-zinc-700 ${
                      isBookmarked
                        ? "bg-zinc-800 text-white"
                        : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                    }`}
                    onClick={toggleBookmark}
                  >
                    <Bookmark
                      className={`size-4 ${isBookmarked ? "fill-zinc-300" : ""}`}
                    />
                    <span>{isBookmarked ? "Bookmarked" : "Bookmark"}</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 flex justify-center items-center gap-1 border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                  >
                    <Share2 className="size-4" />
                    <span>Share</span>
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-center text-sm text-zinc-500">
                <ShieldCheck className="size-4 mr-1 text-zinc-400" />
                <span>Secure transaction & 7-day return policy</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-medium text-white flex items-center">
                <Award className="size-5 text-zinc-400 mr-2" />
                Financing Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Calculate monthly payments based on actual price */}
              <Card className="bg-zinc-800 border-zinc-700">
                <CardContent className="p-4">
                  <div className="font-medium text-zinc-300 mb-1">
                    36-Month Financing
                  </div>
                  <div className="text-2xl font-medium text-white mb-2">
                    ${Math.round((basePrice - 15000) / 36).toLocaleString()}/mo
                  </div>
                  <div className="text-sm text-zinc-400">
                    <p>3.9% APR, $15,000 down payment</p>
                    <p>
                      Total cost: $
                      {Math.round(
                        (basePrice - 15000) * 1.039 + 15000,
                      ).toLocaleString()}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-4">
                  <div className="font-medium text-zinc-400 mb-1">
                    48-Month Financing
                  </div>
                  <div className="text-lg font-medium text-white mb-2">
                    ${Math.round((basePrice - 15000) / 48).toLocaleString()}/mo
                  </div>
                  <div className="text-sm text-zinc-500">
                    <p>4.2% APR, $15,000 down payment</p>
                    <p>
                      Total cost: $
                      {Math.round(
                        (basePrice - 15000) * 1.042 + 15000,
                      ).toLocaleString()}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-4">
                  <div className="font-medium text-zinc-400 mb-1">
                    60-Month Financing
                  </div>
                  <div className="text-lg font-medium text-white mb-2">
                    ${Math.round((basePrice - 15000) / 60).toLocaleString()}/mo
                  </div>
                  <div className="text-sm text-zinc-500">
                    <p>4.5% APR, $15,000 down payment</p>
                    <p>
                      Total cost: $
                      {Math.round(
                        (basePrice - 15000) * 1.045 + 15000,
                      ).toLocaleString()}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Button
                variant="link"
                className="w-full text-zinc-400 hover:text-white"
              >
                Calculate Custom Payment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto p-4 mt-4">
        <Card className="bg-zinc-900 border-zinc-800 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-medium text-white">
              Customer Reviews
            </CardTitle>
            <Button
              variant="ghost"
              className="text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
              Write a Review
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="flex flex-col items-center">
                  <div className="text-5xl font-medium text-white mb-2">
                    {rating}
                  </div>
                  <div className="flex mb-2">{renderRating(rating)}</div>
                  <p className="text-zinc-500">Based on 87 reviews</p>

                  <div className="w-full mt-6 space-y-2">
                    <div className="flex items-center">
                      <span className="text-sm w-16 text-zinc-500">
                        5 stars
                      </span>
                      <div className="flex-1 h-2 mx-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className="bg-amber-400 h-full rounded-full"
                          style={{ width: "78%" }}
                        ></div>
                      </div>
                      <span className="text-sm text-zinc-500">78%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm w-16 text-zinc-500">
                        4 stars
                      </span>
                      <div className="flex-1 h-2 mx-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className="bg-amber-400 h-full rounded-full"
                          style={{ width: "15%" }}
                        ></div>
                      </div>
                      <span className="text-sm text-zinc-500">15%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm w-16 text-zinc-500">
                        3 stars
                      </span>
                      <div className="flex-1 h-2 mx-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className="bg-amber-400 h-full rounded-full"
                          style={{ width: "5%" }}
                        ></div>
                      </div>
                      <span className="text-sm text-zinc-500">5%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm w-16 text-zinc-500">
                        2 stars
                      </span>
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
                        <div className="text-zinc-500 text-sm">
                          {review.date}
                        </div>
                      </div>
                      <div className="flex mb-2">
                        {renderRating(review.rating)}
                      </div>
                      <p className="text-zinc-400">{review.comment}</p>
                    </div>
                  ))}
                </div>

                <Button
                  variant="ghost"
                  className="mt-6 text-zinc-400 hover:text-white hover:bg-zinc-800"
                >
                  View All 87 Reviews
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="w-full max-w-7xl mx-auto p-4 mt-8 mb-16">
        <h2 className="text-2xl font-medium text-white mb-6">
          You May Also Like
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SIMILAR_CARS.map((car) => (
            <Card
              key={car.id}
              className="bg-zinc-900 border-zinc-800 shadow-md overflow-hidden transition-all duration-300 hover:border-zinc-700"
            >
              <div className="relative overflow-hidden">
                <img
                  src={car.image || "/placeholder.svg"}
                  alt={car.name}
                  className="w-full h-48 object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium text-lg mb-1 text-white">
                  {car.name}
                </h3>
                <div className="flex mb-2">{renderRating(car.rating)}</div>
                <p className="text-zinc-500 mb-3">
                  Starting at ${car.price.toLocaleString()}
                </p>
                <Button
                  variant="ghost"
                  className="text-zinc-400 hover:text-white hover:bg-zinc-800 flex items-center p-0"
                >
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
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <footer className="w-full bg-zinc-950 border-t border-zinc-800 py-8">
        <div className="max-w-7xl mx-auto px-4">
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
      </footer>
    </div>
  );
}

export const Route = createFileRoute("/cars/$id")({
  component: ProductDetail,
});
