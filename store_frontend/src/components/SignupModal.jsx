// SignupPage.jsx

import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    user_name: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Submit the form logic here, e.g., send data to your backend
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col justify-center items-center">
      <div className="bg-gray-900 p-8 rounded-lg w-96 shadow-2xl relative">
        {/* Close Button */}
        <Link to="/" className="absolute top-3 right-3 text-gray-400 hover:text-gray-200">
          <FaTimes size={18} />
        </Link>

        <h2 className="text-3xl font-semibold text-center mb-6">Sign Up</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Sign-Up Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-5">
            <label className="block text-gray-300 mb-2">User Name</label>
            <input
              type="user-name"
              name="user-name"
              value={formData.user_name}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-500"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-500"
              placeholder="Enter your password"
            />
          </div>

          <div className="mb-8">
            <label className="block text-gray-300 mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-500"
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:text-blue-400 transition-colors">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;

