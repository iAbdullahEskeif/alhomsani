import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from "react";
import { Link, useNavigate } from '@tanstack/react-router';
import LoginModal from "./LoginModal";

const Navbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [token, setToken] = useState(null);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    useEffect(() => {
        setToken(localStorage.getItem("access"));
    }, []);

    const logoutMutation = useMutation({
        mutationFn: async (refreshToken) => {
            const response = await fetch("http://127.0.0.1:8000/api/users/logout/blacklist/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ refresh_token: refreshToken }),
            });

            if (!response.ok) {
                throw new Error("Failed to blacklist token");
            }
            return response.json();
        },
        onSettled: () => handleLogoutTransition(),
    });

    const handleLogoutTransition = () => {
        setIsLoggingOut(true);
        setTimeout(() => {
            queryClient.clear();
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            setToken(null);
            navigate({ to: "/" }); // TanStack Router navigation syntax
            window.location.reload();
        }, 500);
    };

    const handleLogout = () => {
        const refreshToken = localStorage.getItem("refresh");
        refreshToken ? logoutMutation.mutate(refreshToken) : handleLogoutTransition();
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav className={`bg-gray-900 p-4 shadow-md transition-opacity duration-500 ${isLoggingOut ? "opacity-0" : "opacity-100"}`}>
            <div className="container mx-auto flex justify-between items-center">
                <Link
                    to="/"
                    className="text-white text-lg font-semibold hover:text-gray-400 transition-colors duration-200"
                >
                    Home
                </Link>

                {/* Hamburger Menu */}
                <button
                    className="block md:hidden text-white hover:text-gray-400 transition-transform duration-200"
                    onClick={toggleMenu}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex space-x-6 items-center">
                    <li>
                        <Link
                            to="/about"
                            className="text-white hover:text-gray-400 transition-colors duration-200"
                            activeProps={{ className: "text-blue-400" }}
                        >
                            About
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/contact"
                            className="text-white hover:text-gray-400 transition-colors duration-200"
                            activeProps={{ className: "text-blue-400" }}
                        >
                            Contact
                        </Link>
                    </li>
                    <li>
                        {token ? (
                            <button
                                onClick={handleLogout}
                                disabled={logoutMutation.isPending}
                                className={`px-4 py-1 rounded-lg transition-all duration-200 shadow-sm ${logoutMutation.isPending
                                    ? 'bg-red-800 cursor-not-allowed'
                                    : 'bg-red-700 hover:bg-red-600'
                                    }`}
                            >
                                {logoutMutation.isPending ? 'Logging Out...' : 'Logout'}
                            </button>
                        ) : (
                            <button
                                onClick={openModal}
                                className="text-white bg-gray-700 hover:bg-gray-600 px-4 py-1 rounded-lg transition-all duration-200 shadow-sm hover:shadow-lg"
                            >
                                Login
                            </button>
                        )}
                    </li>
                </ul>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <ul className="flex flex-col md:hidden bg-gray-800 mt-3 space-y-3 p-4 rounded-lg shadow-md transition-all duration-200">
                        <li>
                            <Link
                                to="/about"
                                className="text-white hover:text-gray-400"
                                onClick={() => setIsMenuOpen(false)}
                                activeProps={{ className: "text-blue-400" }}
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contact"
                                className="text-white hover:text-gray-400"
                                onClick={() => setIsMenuOpen(false)}
                                activeProps={{ className: "text-blue-400" }}
                            >
                                Contact
                            </Link>
                        </li>
                        <li>
                            {token ? (
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setIsMenuOpen(false);
                                    }}
                                    className="text-white bg-red-700 hover:bg-red-600 px-4 py-1 rounded-lg transition-all duration-200 shadow-sm hover:shadow-lg"
                                >
                                    Logout
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        openModal();
                                        setIsMenuOpen(false);
                                    }}
                                    className="text-white bg-gray-700 hover:bg-gray-600 px-4 py-1 rounded-lg transition-all duration-200 shadow-sm hover:shadow-lg"
                                >
                                    Login
                                </button>
                            )}
                        </li>
                    </ul>
                )}
            </div>
            {isModalOpen && <LoginModal closeModal={closeModal} setToken={setToken} />}
        </nav>
    );
};

export default Navbar;
