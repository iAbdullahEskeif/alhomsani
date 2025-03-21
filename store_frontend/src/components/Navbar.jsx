// Navbar.js
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useJwt } from "react-jwt";
import LoginModal from "./LoginModal";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [token, setToken] = useState(null);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const navigate = useNavigate();
    const profileMenuRef = useRef(null);

    const { decodedToken, isExpired } = useJwt(token?.access);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const toggleMenu = () => setIsMenuOpen((prev) => !prev);
    const toggleProfileMenu = () => setShowProfileMenu((prev) => !prev);

    const handleLogout = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/users/logout/blacklist/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.access}`
                },
                body: JSON.stringify({
                    "refresh_token": token.refresh
                })
            });

            if (response.ok) {
                setToken(null);
                navigate("/");
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    // Close profile menu if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="bg-gray-900 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-lg font-semibold hover:text-gray-400 transition-colors duration-200">
                    Home
                </Link>

                {/* Hamburger Icon for Mobile Menu */}
                <button
                    className="md:hidden text-white hover:text-gray-400 transition-transform duration-200"
                    onClick={toggleMenu}
                >
                    {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-6 items-center">
                    <li>
                        <Link to="/about" className="text-white hover:text-gray-400 transition-colors duration-200">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" className="text-white hover:text-gray-400 transition-colors duration-200">
                            Contact
                        </Link>
                    </li>

                    {/* Conditionally Render Login/Profile Options */}
                    {token && !isExpired ? (
                        <li className="relative" ref={profileMenuRef}>
                            <button onClick={toggleProfileMenu} className="text-white bg-gray-700 px-4 py-1 rounded-lg transition-all duration-200 shadow-sm hover:bg-gray-600">
                                Profile
                            </button>
                            {showProfileMenu && (
                                <ul className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg z-50 text-gray-200">
                                    <li>
                                        <Link to="/profile" className="block px-4 py-2 hover:bg-gray-700" onClick={() => setShowProfileMenu(false)}>
                                            Access Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => {
                                                handleLogout();
                                                setShowProfileMenu(false);
                                            }}
                                            className="w-full text-left px-4 py-2 hover:bg-gray-700"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </li>
                    ) : (
                        <li>
                            <button onClick={openModal} className="text-white bg-gray-700 px-4 py-1 rounded-lg transition-all duration-200 shadow-sm hover:bg-gray-600">
                                Login
                            </button>
                        </li>
                    )}
                </ul>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <ul className="flex flex-col md:hidden bg-gray-800 mt-3 space-y-3 p-4 rounded-lg shadow-md">
                        <li>
                            <Link to="/about" className="text-white hover:text-gray-400 transition-colors duration-200" onClick={toggleMenu}>
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="text-white hover:text-gray-400 transition-colors duration-200" onClick={toggleMenu}>
                                Contact
                            </Link>
                        </li>
                        {token && !isExpired ? (
                            <>
                                <li>
                                    <Link to="/profile" className="text-white hover:text-gray-400 transition-colors duration-200" onClick={toggleMenu}>
                                        Access Profile
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="text-white bg-gray-700 px-4 py-1 rounded-lg shadow-sm hover:bg-gray-600"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li>
                                <button onClick={openModal} className="text-white bg-gray-700 px-4 py-1 rounded-lg shadow-sm hover:bg-gray-600">
                                    Login
                                </button>
                            </li>
                        )}
                    </ul>
                )}
            </div>
            {isModalOpen && <LoginModal closeModal={closeModal} setToken={setToken} />}
        </nav>
    );
};

export default Navbar;
