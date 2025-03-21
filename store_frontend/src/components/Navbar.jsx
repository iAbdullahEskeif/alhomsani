import { useState } from "react";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";

const Navbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav className="bg-gray-900 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-lg font-semibold hover:text-gray-400 transition-colors duration-200">
                    Home
                </Link>

                {/* Hamburger Icon for mobile */}
                <button
                    className="block md:hidden text-white hover:text-gray-400 transition-transform duration-200"
                    onClick={toggleMenu}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
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
                    <li>
                        <button
                            onClick={openModal}
                            className="text-white bg-gray-700 hover:bg-gray-600 px-4 py-1 rounded-lg transition-all duration-200 shadow-sm hover:shadow-lg"
                        >
                            Login
                        </button>
                    </li>
                </ul>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <ul className="flex flex-col md:hidden bg-gray-800 mt-3 space-y-3 p-4 rounded-lg shadow-md transition-all duration-200">
                        <li>
                            <Link
                                to="/about"
                                className="text-white hover:text-gray-400 transition-colors duration-200"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contact"
                                className="text-white hover:text-gray-400 transition-colors duration-200"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Contact
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={() => {
                                    openModal();
                                    setIsMenuOpen(false);
                                }}
                                className="text-white bg-gray-700 hover:bg-gray-600 px-4 py-1 rounded-lg transition-all duration-200 shadow-sm hover:shadow-lg"
                            >
                                Login
                            </button>
                        </li>
                    </ul>
                )}
            </div>
            {isModalOpen && <LoginModal closeModal={closeModal} />}
        </nav>
    );
};

export default Navbar;

