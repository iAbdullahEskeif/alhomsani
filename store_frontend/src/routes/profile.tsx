"use client"

import { ArrowRight, MapPin, Mail, Star, Car, Edit, MessageSquare, UserPlus, Lock, Bookmark } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { createFileRoute } from "@tanstack/react-router"

// Simple auth hook - in a real app, this would come from your auth provider
const useAuth = () => {
    return {
        isAuthenticated: true, // Change to false to test non-logged-in view
        user: { id: 1 },
    }
}

function ProfilePage() {
    const { isAuthenticated, user: currentUser } = useAuth()

    // Profile being viewed - in a real app, this would come from route params or API
    const profileUser = {
        id: 2, // Change to 1 to test self-view (same as currentUser.id)
        name: "James Wilson",
        since: "Member since 2018",
        location: "Los Angeles, CA",
        email: "james.wilson@example.com",
        avatar: "/placeholder.svg?height=200&width=200",
        bio: "Passionate about performance cars and luxury vehicles.",
        privacy: { showEmail: true, showLocation: true },
    }

    // Determine relationship between viewer and profile
    const isSelfView = isAuthenticated && currentUser.id === profileUser.id
    const isLoggedInView = isAuthenticated && !isSelfView
    const isGuestView = !isAuthenticated

    // User's bookmarks
    const userBookmarks = [
        {
            id: 1,
            name: "McLaren 720S",
            year: 2023,
            price: "$315,000",
            image: "/placeholder.svg?height=200&width=300&text=McLaren+720S",
            isPrivate: false,
        },
        {
            id: 2,
            name: "Bugatti Chiron",
            year: 2023,
            price: "$3,200,000",
            image: "/placeholder.svg?height=200&width=300&text=Bugatti+Chiron",
            isPrivate: false,
        },
        {
            id: 3,
            name: "Aston Martin DBS",
            year: 2023,
            price: "$330,000",
            image: "/placeholder.svg?height=200&width=300&text=Aston+Martin+DBS",
            isPrivate: true,
        },
        {
            id: 4,
            name: "Lamborghini Aventador",
            year: 2022,
            price: "$500,000",
            image: "/placeholder.svg?height=200&width=300&text=Lamborghini+Aventador",
            isPrivate: false,
        },
    ]

    // User's activity feed (combined purchases, reviews, etc.)
    const activityFeed = [
        {
            id: 1,
            type: "purchase",
            title: "Purchased a new car",
            vehicle: "Ferrari 488 GTB",
            date: "April 2023",
            icon: Car,
            isPrivate: false,
        },
        {
            id: 2,
            type: "review",
            title: "Wrote a review",
            vehicle: "Porsche 911 GT3",
            rating: 5,
            date: "February 2023",
            icon: Star,
            isPrivate: false,
        },
        {
            id: 3,
            type: "bookmark",
            title: "Bookmarked a car",
            vehicle: "Bugatti Chiron",
            date: "January 2023",
            icon: Bookmark,
            isPrivate: false,
        },
        {
            id: 4,
            type: "purchase",
            title: "Purchased a new car",
            vehicle: "Lamborghini Huracán",
            date: "October 2022",
            icon: Car,
            isPrivate: false,
        },
        {
            id: 5,
            type: "review",
            title: "Wrote a review",
            vehicle: "Ferrari 488 GTB",
            rating: 4,
            date: "September 2022",
            icon: Star,
            isPrivate: true,
        },
    ]

    // Filter items based on privacy settings
    const visibleBookmarks = userBookmarks.filter((b) => isSelfView || !b.isPrivate)
    const visibleActivities = activityFeed.filter((a) => isSelfView || !a.isPrivate)

    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            {/* Profile Header */}
            <div className="relative h-40 bg-gradient-to-r from-zinc-900 to-zinc-800">
                <div className="h-1 bg-gradient-to-r from-rose-600 to-blue-600 absolute bottom-0 w-full"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 relative">
                {/* Profile Info Card */}
                <div className="bg-zinc-900 rounded-xl shadow-lg -mt-16 overflow-hidden border border-zinc-800">
                    <div className="p-6">
                        {/* Profile Actions */}
                        <div className="flex justify-end mb-4">
                            {isSelfView && (
                                <Link
                                    to="/profile/edit"
                                    className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-1.5 rounded-lg text-sm"
                                >
                                    <Edit className="h-3.5 w-3.5" />
                                    Edit
                                </Link>
                            )}

                            {isLoggedInView && (
                                <div className="flex gap-2">
                                    <button className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-1.5 rounded-lg text-sm">
                                        <MessageSquare className="h-3.5 w-3.5" />
                                        Message
                                    </button>
                                    <button className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white px-3 py-1.5 rounded-lg text-sm">
                                        <UserPlus className="h-3.5 w-3.5" />
                                        Follow
                                    </button>
                                </div>
                            )}

                            {isGuestView && (
                                <Link
                                    to="/login"
                                    className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white px-3 py-1.5 rounded-lg text-sm"
                                >
                                    <Lock className="h-3.5 w-3.5" />
                                    Login
                                </Link>
                            )}
                        </div>

                        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                            <div className="relative">
                                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-rose-600 shadow-lg">
                                    <img
                                        src={profileUser.avatar || "/placeholder.svg"}
                                        alt={profileUser.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            <div className="flex-1 text-center md:text-left">
                                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-white mb-1">
                                    {profileUser.name}
                                    {isSelfView && <span className="ml-2 text-sm text-rose-500">(You)</span>}
                                </h1>
                                <p className="text-zinc-400 mb-3 text-sm">{profileUser.since}</p>

                                <div className="flex flex-col md:flex-row gap-4 mb-4 text-sm">
                                    {(profileUser.privacy.showLocation || isSelfView) && (
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-rose-500" />
                                            <span className="text-zinc-300">{profileUser.location}</span>
                                        </div>
                                    )}

                                    {(profileUser.privacy.showEmail || isSelfView) && (
                                        <div className="flex items-center gap-2">
                                            <Mail className="h-4 w-4 text-rose-500" />
                                            <span className="text-zinc-300">{profileUser.email}</span>
                                        </div>
                                    )}
                                </div>

                                <p className="text-zinc-400 text-sm">{profileUser.bio}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Activity Feed Section */}
                <div className="mt-8">
                    <div className="flex items-center mb-4">
                        <div className="w-1 h-6 bg-rose-600 mr-3"></div>
                        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-white">
                            Activity
                        </h2>
                    </div>

                    {visibleActivities.length > 0 ? (
                        <div className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
                            {visibleActivities.map((activity, index) => {
                                const ActivityIcon = activity.icon
                                return (
                                    <div
                                        key={activity.id}
                                        className={`flex items-start p-4 ${index !== visibleActivities.length - 1 ? "border-b border-zinc-800" : ""
                                            }`}
                                    >
                                        <div className="w-10 h-10 bg-rose-900/20 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                            <ActivityIcon className="h-5 w-5 text-rose-500" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-white font-medium">{activity.title}</h3>
                                            <p className="text-zinc-400 text-sm mt-1">{activity.vehicle}</p>

                                            {activity.type === "review" && activity.rating && (
                                                <div className="flex items-center mt-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`h-3.5 w-3.5 ${i < activity.rating ? "fill-rose-500 text-rose-500" : "text-zinc-600"}`}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <div className="text-zinc-500 text-xs">{activity.date}</div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-4 text-center">
                            <p className="text-zinc-500 text-sm">No activity to display</p>
                        </div>
                    )}

                    {visibleActivities.length > 0 && (
                        <div className="text-center mt-4">
                            <Link
                                to={isSelfView ? "/profile/activity" : `/profile/${profileUser.id}/activity`}
                                className="inline-flex items-center text-rose-500 hover:text-rose-400 text-sm"
                            >
                                View All Activity
                                <ArrowRight className="ml-1 h-3.5 w-3.5" />
                            </Link>
                        </div>
                    )}
                </div>

                {/* Bookmarks Section */}
                <div className="mt-8 mb-12">
                    <div className="flex items-center mb-4">
                        <div className="w-1 h-6 bg-rose-600 mr-3"></div>
                        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-white">
                            Bookmarks
                        </h2>
                    </div>

                    {visibleBookmarks.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {visibleBookmarks.map((bookmark) => (
                                <div key={bookmark.id} className="bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 group">
                                    <div className="relative h-32 overflow-hidden">
                                        <img
                                            src={bookmark.image || "/placeholder.svg"}
                                            alt={bookmark.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-70"></div>
                                        <div className="absolute top-2 right-2">
                                            <Bookmark className="h-5 w-5 fill-rose-500 text-rose-500" />
                                        </div>
                                    </div>
                                    <div className="p-3">
                                        <h3 className="text-white font-medium text-sm truncate">{bookmark.name}</h3>
                                        <div className="flex justify-between items-center mt-1">
                                            <span className="text-zinc-400 text-xs">{bookmark.year}</span>
                                            <span className="text-rose-500 text-xs font-medium">{bookmark.price}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-4 text-center">
                            <p className="text-zinc-500 text-sm">No bookmarks to display</p>
                        </div>
                    )}

                    {visibleBookmarks.length > 0 && (
                        <div className="text-center mt-4">
                            <Link
                                to={isSelfView ? "/profile/bookmarks" : `/profile/${profileUser.id}/bookmarks`}
                                className="inline-flex items-center text-rose-500 hover:text-rose-400 text-sm"
                            >
                                View All Bookmarks
                                <ArrowRight className="ml-1 h-3.5 w-3.5" />
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="w-full bg-zinc-950 border-t border-zinc-800 py-4">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center text-zinc-600 text-sm">
                        <p>© {new Date().getFullYear()} Luxury Automotive. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const Route = createFileRoute("/profile")({
    component: ProfilePage,
})


