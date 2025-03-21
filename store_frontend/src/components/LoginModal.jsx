import { useMutation } from '@tanstack/react-query';
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Link, useNavigate } from '@tanstack/react-router'; // Changed import

const LoginModal = ({ closeModal, setToken }) => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const loginMutation = useMutation({
        mutationFn: async (credentials) => {
            const response = await fetch("http://127.0.0.1:8000/api/token/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Login failed");
            }

            return response.json();
        },
        onSuccess: (data) => {
            setToken(data.access);
            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);
            closeModal();
            navigate({ to: "/" }); // TanStack Router navigation syntax
        },
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        loginMutation.mutate(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-gray-900 text-white p-6 rounded-lg w-80 shadow-2xl relative">
                <button onClick={closeModal} className="absolute top-3 right-3 text-gray-400">
                    <FaTimes size={18} />
                </button>
                <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

                {loginMutation.isError && (
                    <p className="text-red-500 mb-4">{loginMutation.error.message}</p>
                )}

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
                    <button
                        type="submit"
                        disabled={loginMutation.isPending}
                        className={`w-full ${loginMutation.isPending
                            ? 'bg-blue-700 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-500'
                            } py-2 rounded-lg text-white transition-colors`}
                    >
                        {loginMutation.isPending ? 'Logging In...' : 'Log In'}
                    </button>

                    <div className="mt-4 text-center">
                        <p className="text-gray-400"> Don't have an account?{" "}
                            <Link
                                to="/signup"
                                className="text-blue-400 hover:text-blue-300"
                                onClick={closeModal}
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
