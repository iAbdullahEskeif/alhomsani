import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "@clerk/clerk-react";
import { API_URL } from "../config";
import {
  MapPin,
  Mail,
  Calendar,
  Edit,
  Save,
  X,
  Heart,
  Bookmark,
  Clock,
  ShoppingCart,
  Eye,
  Car,
  ChevronRight,
  Loader2,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Types
interface Profile {
  user: number;
  name: string;
  location: string;
  contact_info: string;
  bio: string;
  profile_picture: string;
  favorite_cars: number[];
  bookmarked_cars: number[];
  activity_log?: ActivityItem[]; // Make this optional
  member_since: string;
}

interface ActivityItem {
  profile: number;
  product: number;
  action: "purchase" | "view" | "bookmark" | "favorite";
  timestamp: string;
}

interface ActivityResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ActivityItem[];
}

// Update the CarType interface to match the API response
interface CarType {
  id: number;
  name: string;
  price: string;
  images: string;
  description: string;
  stock_quantity: number;
  sku: string;
  category: number;
  availability: string;
  car_type: string;
  created_at: string;
  updated_at: string;
}

function Profile() {
  const { getToken, userId } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<Partial<Profile>>({});
  const [activityLog, setActivityLog] = useState<ActivityItem[]>([]);
  const [activityPage, setActivityPage] = useState(1);
  const [hasMoreActivity, setHasMoreActivity] = useState(false);
  const [favoriteCars, setFavoriteCars] = useState<CarType[]>([]);
  const [bookmarkedCars, setBookmarkedCars] = useState<CarType[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const token = await getToken();
        const response = await fetch(`${API_URL}/profiles/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setProfile(data);
        setEditedProfile({
          name: data.name,
          location: data.location,
          contact_info: data.contact_info,
          bio: data.bio,
          profile_picture: data.profile_picture,
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchProfile();
    }
  }, [userId, getToken]);

  // Fetch activity log
  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const token = await getToken();
        const response = await fetch(
          `${API_URL}/profiles/activity/?page=${activityPage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch activity");
        }

        const data: ActivityResponse = await response.json();
        setActivityLog(
          activityPage === 1 ? data.results : [...activityLog, ...data.results],
        );
        setHasMoreActivity(!!data.next);
      } catch (error) {
        console.error("Error fetching activity:", error);
      }
    };

    if (userId) {
      fetchActivity();
    }
  }, [userId, getToken, activityPage]);

  // Fetch favorite and bookmarked cars
  useEffect(() => {
    const fetchCars = async () => {
      if (!profile) return;

      try {
        const token = await getToken();

        // Fetch favorite cars data
        const favoriteCarsPromises = profile.favorite_cars.map(async (id) => {
          const response = await fetch(`${API_URL}/api/${id}/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            console.error(`Failed to fetch car with ID ${id}`);
            return null;
          }

          return await response.json();
        });

        // Fetch bookmarked cars data
        const bookmarkedCarsPromises = profile.bookmarked_cars.map(
          async (id) => {
            const response = await fetch(`${API_URL}/api/${id}/`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            if (!response.ok) {
              console.error(`Failed to fetch car with ID ${id}`);
              return null;
            }

            return await response.json();
          },
        );

        // Wait for all promises to resolve
        const favoriteResults = await Promise.all(favoriteCarsPromises);
        const bookmarkResults = await Promise.all(bookmarkedCarsPromises);

        // Filter out any null results (failed fetches)
        const validFavoriteCars = favoriteResults.filter(
          (car) => car !== null,
        ) as CarType[];
        const validBookmarkedCars = bookmarkResults.filter(
          (car) => car !== null,
        ) as CarType[];

        setFavoriteCars(validFavoriteCars);
        setBookmarkedCars(validBookmarkedCars);
      } catch (error) {
        console.error("Error fetching cars:", error);
        toast.error("Failed to load car details");
      }
    };

    fetchCars();
  }, [profile, getToken]);

  // Update profile
  const handleUpdateProfile = async () => {
    if (!profile) return;

    try {
      setIsUpdating(true);
      const token = await getToken();
      const response = await fetch(`${API_URL}/profiles/`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedProfile),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedProfile = await response.json();
      setProfile(updatedProfile);
      setIsEditing(false);

      toast.success("Your profile has been successfully updated.");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  // Toggle favorite
  const toggleFavorite = async (carId: number, isFavorite: boolean) => {
    if (!profile) return;

    try {
      const token = await getToken();
      const endpoint = isFavorite
        ? `/profiles/favorites/remove/${carId}/`
        : `/profiles/favorites/add/${carId}/`;

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
        setProfile({
          ...profile,
          favorite_cars: profile.favorite_cars.filter((id) => id !== carId),
        });
        setFavoriteCars(favoriteCars.filter((car) => car.id !== carId));
      } else {
        // Fetch the car details for the newly added favorite
        const carResponse = await fetch(`${API_URL}/api/${carId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!carResponse.ok) {
          throw new Error("Failed to fetch car details");
        }

        const carData = await carResponse.json();

        setProfile({
          ...profile,
          favorite_cars: [...profile.favorite_cars, carId],
        });
        setFavoriteCars([...favoriteCars, carData]);
      }

      if (isFavorite) {
        toast.success("The car has been removed from your favorites.");
      } else {
        toast.success("The car has been added to your favorites.");
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast.error(
        `Failed to ${isFavorite ? "remove from" : "add to"} favorites. Please try again.`,
      );
    }
  };

  // Toggle bookmark
  const toggleBookmark = async (carId: number, isBookmarked: boolean) => {
    if (!profile) return;

    try {
      const token = await getToken();
      const endpoint = isBookmarked
        ? `/profiles/bookmarks/remove/${carId}/`
        : `/profiles/bookmarks/add/${carId}/`;

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
        setProfile({
          ...profile,
          bookmarked_cars: profile.bookmarked_cars.filter((id) => id !== carId),
        });
        setBookmarkedCars(bookmarkedCars.filter((car) => car.id !== carId));
      } else {
        // Fetch the car details for the newly added bookmark
        const carResponse = await fetch(`${API_URL}/api/${carId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!carResponse.ok) {
          throw new Error("Failed to fetch car details");
        }

        const carData = await carResponse.json();

        setProfile({
          ...profile,
          bookmarked_cars: [...profile.bookmarked_cars, carId],
        });
        setBookmarkedCars([...bookmarkedCars, carData]);
      }

      if (isBookmarked) {
        toast.success("The car has been removed from your bookmarks.");
      } else {
        toast.success("The car has been added to your bookmarks.");
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      toast.error(
        `Failed to ${isBookmarked ? "remove from" : "add to"} bookmarks. Please try again.`,
      );
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format time
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get action icon
  const getActionIcon = (action: string) => {
    switch (action) {
      case "purchase":
        return <ShoppingCart className="size-4 text-emerald-500" />;
      case "view":
        return <Eye className="size-4 text-zinc-400" />;
      case "bookmark":
        return <Bookmark className="size-4 text-zinc-400" />;
      case "favorite":
        return <Heart className="size-4 text-zinc-400" />;
      default:
        return <Clock className="size-4 text-zinc-400" />;
    }
  };

  // Get action text
  const getActionText = (action: string) => {
    switch (action) {
      case "purchase":
        return "Purchased a car";
      case "view":
        return "Viewed a car";
      case "bookmark":
        return "Bookmarked a car";
      case "favorite":
        return "Favorited a car";
      default:
        return "Interacted with a car";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="size-12 text-zinc-700 animate-spin mx-auto mb-4" />
          <p className="text-zinc-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Card className="max-w-md w-full bg-zinc-900 border-zinc-800 shadow-md">
          <CardHeader>
            <CardTitle className="text-white">Profile Not Found</CardTitle>
            <CardDescription className="text-zinc-400">
              We couldn't find your profile information. Please try again later.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button
              variant="secondary"
              className="w-full bg-zinc-800 text-zinc-200 border-zinc-700 hover:bg-zinc-700"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-zinc-900 border-zinc-800 shadow-md">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <Avatar className="size-20 bg-zinc-800">
                    <AvatarImage
                      src={
                        profile.profile_picture ||
                        "/placeholder.svg?height=80&width=80"
                      }
                      alt={profile.name}
                    />
                    <AvatarFallback className="bg-zinc-800 text-zinc-400">
                      {profile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  {!isEditing ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-zinc-700 text-zinc-100 bg-zinc-800 hover:bg-zinc-700 hover:text-white"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit className="size-4 mr-2" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-zinc-700 text-zinc-100 bg-zinc-800 hover:bg-zinc-700 hover:text-white"
                        onClick={() => setIsEditing(false)}
                      >
                        <X className="size-4 mr-1" />
                        Cancel
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="bg-zinc-800 text-zinc-200 border-zinc-700 hover:bg-zinc-700"
                        onClick={handleUpdateProfile}
                        disabled={isUpdating}
                      >
                        {isUpdating ? (
                          <>
                            <Loader2 className="size-4 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="size-4 mr-2" />
                            Save
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>

                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-zinc-400">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={editedProfile.name || ""}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            name: e.target.value,
                          })
                        }
                        className="bg-zinc-800 border-zinc-700 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location" className="text-zinc-400">
                        Location
                      </Label>
                      <Input
                        id="location"
                        value={editedProfile.location || ""}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            location: e.target.value,
                          })
                        }
                        className="bg-zinc-800 border-zinc-700 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact" className="text-zinc-400">
                        Contact Info
                      </Label>
                      <Input
                        id="contact"
                        value={editedProfile.contact_info || ""}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            contact_info: e.target.value,
                          })
                        }
                        className="bg-zinc-800 border-zinc-700 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bio" className="text-zinc-400">
                        Bio
                      </Label>
                      <Textarea
                        id="bio"
                        value={editedProfile.bio || ""}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            bio: e.target.value,
                          })
                        }
                        className="bg-zinc-800 border-zinc-700 text-white min-h-[100px]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="picture" className="text-zinc-400">
                        Profile Picture URL
                      </Label>
                      <Input
                        id="picture"
                        value={editedProfile.profile_picture || ""}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            profile_picture: e.target.value,
                          })
                        }
                        className="bg-zinc-800 border-zinc-700 text-white"
                        placeholder="https://example.com/profile.jpg"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-medium text-white mb-2">
                      {profile.name}
                    </h2>

                    <div className="space-y-3 mb-4">
                      {profile.location && (
                        <div className="flex items-center text-zinc-400">
                          <MapPin className="size-4 mr-2 text-zinc-500" />
                          <span>{profile.location}</span>
                        </div>
                      )}
                      {profile.contact_info && (
                        <div className="flex items-center text-zinc-400">
                          <Mail className="size-4 mr-2 text-zinc-500" />
                          <span>{profile.contact_info}</span>
                        </div>
                      )}
                      <div className="flex items-center text-zinc-400">
                        <Calendar className="size-4 mr-2 text-zinc-500" />
                        <span>
                          Member since {formatDate(profile.member_since)}
                        </span>
                      </div>
                    </div>

                    {profile.bio && (
                      <div className="mt-4 text-zinc-400 border-l-2 border-zinc-800 pl-4">
                        {profile.bio}
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-white">
                  Profile Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-zinc-800 p-4 rounded-lg text-center">
                    <div className="text-2xl font-medium text-white">
                      {profile.favorite_cars.length}
                    </div>
                    <div className="text-sm text-zinc-400">Favorite Cars</div>
                  </div>
                  <div className="bg-zinc-800 p-4 rounded-lg text-center">
                    <div className="text-2xl font-medium text-white">
                      {profile.bookmarked_cars.length}
                    </div>
                    <div className="text-sm text-zinc-400">Bookmarked Cars</div>
                  </div>
                  <div className="bg-zinc-800 p-4 rounded-lg text-center">
                    <div className="text-2xl font-medium text-white">
                      {
                        activityLog.filter((a) => a.action === "purchase")
                          .length
                      }
                    </div>
                    <div className="text-sm text-zinc-400">Purchases</div>
                  </div>
                  <div className="bg-zinc-800 p-4 rounded-lg text-center">
                    <div className="text-2xl font-medium text-white">
                      {activityLog.length}
                    </div>
                    <div className="text-sm text-zinc-400">Activities</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="activity" className="w-full">
              <TabsList className="w-full bg-zinc-900 border border-zinc-800 p-1 mb-6">
                <TabsTrigger
                  value="activity"
                  className="flex-1 data-[state=active]:bg-zinc-800 data-[state=active]:text-white text-zinc-400"
                >
                  Activity
                </TabsTrigger>
                <TabsTrigger
                  value="favorites"
                  className="flex-1 data-[state=active]:bg-zinc-800 data-[state=active]:text-white text-zinc-400"
                >
                  Favorites
                </TabsTrigger>
                <TabsTrigger
                  value="bookmarks"
                  className="flex-1 data-[state=active]:bg-zinc-800 data-[state=active]:text-white text-zinc-400"
                >
                  Bookmarks
                </TabsTrigger>
              </TabsList>

              {/* Activity Tab */}
              <TabsContent value="activity">
                <Card className="bg-zinc-900 border-zinc-800 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-xl font-medium text-white">
                      Recent Activity
                    </CardTitle>
                    <CardDescription className="text-zinc-400">
                      Your recent interactions with our vehicles
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {activityLog.length > 0 ? (
                      <div className="space-y-4">
                        {activityLog.map((activity, index) => (
                          <div key={index} className="flex items-start">
                            <div className="size-10 rounded-full bg-zinc-800 flex items-center justify-center mr-4 flex-shrink-0">
                              {getActionIcon(activity.action)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="text-white font-medium">
                                    {getActionText(activity.action)}
                                  </p>
                                  <p className="text-zinc-500 text-sm">
                                    Car ID: {activity.product}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="text-zinc-400 text-sm">
                                    {formatDate(activity.timestamp)}
                                  </p>
                                  <p className="text-zinc-500 text-xs">
                                    {formatTime(activity.timestamp)}
                                  </p>
                                </div>
                              </div>
                              <Separator className="my-3 bg-zinc-800" />
                            </div>
                          </div>
                        ))}

                        {hasMoreActivity && (
                          <div className="text-center pt-2">
                            <Button
                              variant="ghost"
                              onClick={() => setActivityPage(activityPage + 1)}
                              className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                            >
                              Load More
                              <ChevronRight className="ml-1 size-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Clock className="size-12 text-zinc-700 mx-auto mb-3" />
                        <p className="text-zinc-400">
                          No activity recorded yet
                        </p>
                        <p className="text-zinc-500 text-sm mt-1">
                          Your interactions with cars will appear here
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Favorites Tab */}
              <TabsContent value="favorites">
                <Card className="bg-zinc-900 border-zinc-800 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-xl font-medium text-white">
                      Favorite Cars
                    </CardTitle>
                    <CardDescription className="text-zinc-400">
                      Cars you've marked as favorites
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {favoriteCars.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {favoriteCars.map((car) => (
                          <Card
                            key={car.id}
                            className="bg-zinc-800 border-zinc-700 overflow-hidden"
                          >
                            <div className="relative h-40">
                              <img
                                src={
                                  car.images ||
                                  "/placeholder.svg?height=200&width=300"
                                }
                                alt={car.name}
                                className="w-full h-full object-cover"
                              />
                              <Button
                                variant="secondary"
                                size="icon"
                                className="absolute top-2 right-2 bg-zinc-900/80 hover:bg-zinc-900 size-8"
                                onClick={() => toggleFavorite(car.id, true)}
                              >
                                <Heart className="size-4 text-zinc-300 fill-zinc-300" />
                              </Button>
                            </div>
                            <CardContent className="p-4">
                              <h3 className="text-white font-medium mb-1">
                                {car.name}
                              </h3>
                              <p className="text-zinc-400 text-sm mb-2">
                                ${Number(car.price).toLocaleString()}
                              </p>
                              <div className="flex justify-between items-center mt-2">
                                <Badge
                                  variant="outline"
                                  className="bg-zinc-900 text-zinc-400 border-zinc-700"
                                >
                                  <Car className="size-3 mr-1" />
                                  {car.car_type}
                                </Badge>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-zinc-400 hover:text-white hover:bg-zinc-700 h-8 px-2"
                                >
                                  View Details
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Heart className="size-12 text-zinc-700 mx-auto mb-3" />
                        <p className="text-zinc-400">No favorite cars yet</p>
                        <p className="text-zinc-500 text-sm mt-1">
                          Cars you mark as favorites will appear here
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Bookmarks Tab */}
              <TabsContent value="bookmarks">
                <Card className="bg-zinc-900 border-zinc-800 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-xl font-medium text-white">
                      Bookmarked Cars
                    </CardTitle>
                    <CardDescription className="text-zinc-400">
                      Cars you've bookmarked for later
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {bookmarkedCars.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {bookmarkedCars.map((car) => (
                          <Card
                            key={car.id}
                            className="bg-zinc-800 border-zinc-700 overflow-hidden"
                          >
                            <div className="relative h-40">
                              <img
                                src={
                                  car.images ||
                                  "/placeholder.svg?height=200&width=300"
                                }
                                alt={car.name}
                                className="w-full h-full object-cover"
                              />
                              <Button
                                variant="secondary"
                                size="icon"
                                className="absolute top-2 right-2 bg-zinc-900/80 hover:bg-zinc-900 size-8"
                                onClick={() => toggleBookmark(car.id, true)}
                              >
                                <Bookmark className="size-4 text-zinc-300 fill-zinc-300" />
                              </Button>
                            </div>
                            <CardContent className="p-4">
                              <h3 className="text-white font-medium mb-1">
                                {car.name}
                              </h3>
                              <p className="text-zinc-400 text-sm mb-2">
                                ${Number(car.price).toLocaleString()}
                              </p>
                              <div className="flex justify-between items-center mt-2">
                                <Badge
                                  variant="outline"
                                  className="bg-zinc-900 text-zinc-400 border-zinc-700"
                                >
                                  <Car className="size-3 mr-1" />
                                  {car.car_type}
                                </Badge>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-zinc-400 hover:text-white hover:bg-zinc-700 h-8 px-2"
                                >
                                  View Details
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Bookmark className="size-12 text-zinc-700 mx-auto mb-3" />
                        <p className="text-zinc-400">No bookmarked cars yet</p>
                        <p className="text-zinc-500 text-sm mt-1">
                          Cars you bookmark will appear here for easy access
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/profile")({
  component: Profile,
});
