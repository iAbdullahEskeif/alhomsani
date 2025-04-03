"use client"

import { MapPin, Mail, Star, Edit, MessageSquare, UserPlus, Lock, Bookmark } from "lucide-react"
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
        avatar: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.ZA_0iN0WTjq7nS90WCHw4wHaHa%26pid%3DApi&f=1&ipt=5927bc9f074a90679af15f4724deeaadd8b30d2e5f7d4571697e95da132676cd&ipo=images?height=400&width=400",
        bio: "Passionate about performance cars and luxury vehicles.",
        privacy: { showEmail: true, showLocation: true },
    }

    // Determine relationship between viewer and profile
    const isSelfView = isAuthenticated && currentUser.id === profileUser.id
    const isLoggedInView = isAuthenticated && !isSelfView
    const isGuestView = !isAuthenticated

    // User's vehicle collection
    const userVehicles = [
        {
            id: 1,
            name: "Ferrari 488 GTB",
            year: 2021,
            image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs1.cdn.autoevolution.com%2Fimages%2Fgallery%2FFERRARI-488-GTB-5428_27.jpg&f=1&nofb=1&ipt=9b1a86a283d0f7becf06f9e8d2c9b61626b03a170845c0fe67cbaef6585c9451&ipo=images?height=200&width=300&text=Ferrari+488",
            purchaseDate: "April 2021",
            isPrivate: false,
        },
        {
            id: 2,
            name: "Lamborghini Huracán",
            year: 2022,
            image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.hdwallpapers.in%2Fdownload%2Flamborghini_huracan_evo_2019_4k-HD.jpg&f=1&nofb=1&ipt=615593114ee79d65b23697d7301e87e19ce97e8cd922715039c29624b6477c4b&ipo=images?height=200&width=300&text=Lamborghini+Huracan",
            purchaseDate: "August 2022",
            isPrivate: false,
        },
    ]

    // User's reviews
    const userReviews = [
        {
            id: 1,
            vehicle: "Porsche 911 GT3",
            rating: 5,
            date: "2 months ago",
            isPrivate: false,
        },
        {
            id: 2,
            vehicle: "Aston Martin DB11",
            rating: 4,
            date: "5 months ago",
            isPrivate: false,
        },
    ]

    // User's bookmarks
    const userBookmarks = [
        {
            id: 1,
            name: "McLaren 720S",
            image: "/placeholder.svg?height=200&width=300&text=McLaren+720S",
            isPrivate: true,
        },
        {
            id: 2,
            name: "Bugatti Chiron",
            image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.blick.ch%2Fincoming%2F4743486-v4-bugatti-chiron-14.jpg%3Fimwidth%3D2000%26ratio%3D16_9%26x%3D79%26y%3D203%26width%3D1654%26height%3D930&f=1&nofb=1&ipt=609e5c2b819d218b50f4103c4b7fc65c96c30a4578b6f6d1a6c62a9c5b164a4b?height=200&width=300&text=Bugatti+Chiron",
            isPrivate: false,
        },
    ]

    // Filter items based on privacy settings
    const visibleVehicles = userVehicles.filter((v) => isSelfView || !v.isPrivate)
    const visibleReviews = userReviews.filter((r) => isSelfView || !r.isPrivate)
    const visibleBookmarks = userBookmarks.filter((b) => isSelfView || !b.isPrivate)

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
                                <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-rose-600 shadow-lg">
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

                {/* Collection Section */}
                <div className="mt-8">
                    <div className="flex items-center mb-4">
                        <div className="w-1 h-6 bg-rose-600 mr-3"></div>
                        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-white">
                            {isSelfView ? "My Cars" : "Cars"}
                        </h2>
                    </div>

                    {visibleVehicles.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {visibleVehicles.map((vehicle) => (
                                <div
                                    key={vehicle.id}
                                    className="bg-zinc-900 rounded-lg overflow-hidden hover:bg-zinc-800/80 transition-colors border border-zinc-800 group"
                                >
                                    <div className="relative h-40 overflow-hidden">
                                        <img
                                            src={vehicle.image || "/placeholder.svg"}
                                            alt={vehicle.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-60"></div>
                                    </div>

                                    <div className="p-4">
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-lg font-bold text-white">{vehicle.name}</h3>
                                            <span className="text-rose-500 font-medium">{vehicle.year}</span>
                                        </div>
                                        <p className="text-zinc-400 text-sm mt-1">Purchased: {vehicle.purchaseDate}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-4 text-center">
                            <p className="text-zinc-500 text-sm">No cars to display</p>
                        </div>
                    )}
                </div>

                {/* Reviews Section */}
                <div className="mt-8">
                    <div className="flex items-center mb-4">
                        <div className="w-1 h-6 bg-rose-600 mr-3"></div>
                        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-white">
                            Reviews
                        </h2>
                    </div>

                    {visibleReviews.length > 0 ? (
                        <div className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
                            {visibleReviews.map((review, index) => (
                                <div
                                    key={review.id}
                                    className={`flex items-center p-4 ${index !== visibleReviews.length - 1 ? "border-b border-zinc-800" : ""
                                        }`}
                                >
                                    <div className="w-10 h-10 bg-rose-900/20 rounded-full flex items-center justify-center mr-3">
                                        <Star className="h-5 w-5 text-rose-500" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-white font-medium">{review.vehicle}</h3>
                                        <div className="flex items-center mt-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-3.5 w-3.5 ${i < review.rating ? "fill-rose-500 text-rose-500" : "text-zinc-600"}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="text-zinc-500 text-xs">{review.date}</div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-4 text-center">
                            <p className="text-zinc-500 text-sm">No reviews to display</p>
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
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-4 text-center">
                            <p className="text-zinc-500 text-sm">No bookmarks to display</p>
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


