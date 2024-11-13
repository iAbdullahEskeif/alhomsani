// LoginModal.jsx

import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const LoginModal = ({ closeModal }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 transition-opacity duration-300">
      <div className="bg-gray-900 text-white p-6 rounded-lg w-80 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 transition-colors duration-200"
        >
          <FaTimes size={18} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        {/* Form */}
        <form>
          <div className="mb-5">
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-8">
            <label className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Log In
          </button>
        </form>

        {/* Link to Sign Up, close the modal and navigate to the signup page */}
        <p className="text-center mt-4">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-500 hover:text-blue-400 transition-colors"
            onClick={closeModal} // Close the modal when clicking Sign Up
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;

