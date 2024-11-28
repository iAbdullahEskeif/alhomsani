// LoginModal.js
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const LoginModal = ({ closeModal, setToken }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setToken({
          access: data.access,
          refresh: data.refresh
        });  // Pass both tokens up to Navbar
        closeModal();
      } else {
        setError(data.detail || "Login failed");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-gray-900 text-white p-6 rounded-lg w-80 shadow-2xl relative">
        <button onClick={closeModal} className="absolute top-3 right-3 text-gray-400">
          <FaTimes size={18} />
        </button>
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-gray-200"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-8">
            <label className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-gray-200"
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 py-2 rounded-lg text-white">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
