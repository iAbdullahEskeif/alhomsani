import { useMutation } from '@tanstack/react-query';
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Link, useNavigate } from '@tanstack/react-router';

const SignUpModal = ({ setToken }) => {
    const [formData, setFormData] = useState({
        email: "",
        user_name: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isAutoLoggingIn, setIsAutoLoggingIn] = useState(false);
    const navigate = useNavigate();

    const signUpMutation = useMutation({
        mutationFn: async (userData) => {
            const response = await fetch("http://127.0.0.1:8000/api/users/create/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: userData.email,
                    user_name: userData.user_name,
                    password: userData.password,
                }),
            });

            const data = await response.json();
            if (!response.ok) throw data;
            return data;
        },
        onSuccess: async () => {
            setSuccessMessage("Account created successfully!");

            try {
                setIsAutoLoggingIn(true);
                const loginResponse = await fetch("http://127.0.0.1:8000/api/token/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password,
                    }),
                });

                const loginData = await loginResponse.json();

                if (loginResponse.ok) {
                    setToken(loginData.access);
                    localStorage.setItem("access", loginData.access);
                    localStorage.setItem("refresh", loginData.refresh);
                    navigate({ to: "/" });
                    window.location.reload(); // Force a full refresh
                } else {
                    setError("Account created! Please log in manually.");
                    navigate({ to: "/login" });
                }
            } catch (loginError) {
                setError("Account created! Please log in manually.");
                navigate({ to: "/login" });
            } finally {
                setIsAutoLoggingIn(false);
            }
        },
        onError: (error) => {
            setError(error.error || error.detail || "Sign up failed");
        }
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        if (formData.password !== formData.confirmPassword) {
            signUpMutation.reset();
            setError("Passwords do not match");
            return;
        }

        if (formData.password.length < 8) {
            signUpMutation.reset();
            setError("Password must be at least 8 characters");
            return;
        }

        signUpMutation.mutate(formData);
    };

    return (
        <div className="min-h-screen bg-gray-800 text-white flex flex-col justify-center items-center">
            <div className="bg-gray-900 p-8 rounded-lg w-96 shadow-2xl relative">
                <Link
                    to="/"
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
                >
                    <FaTimes size={18} />
                </Link>

                <h2 className="text-3xl font-semibold text-center mb-6">Sign Up</h2>

                {error && <p className="text-red-500 mb-4">{error}</p>}
                {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

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
                            type="text"
                            name="user_name"
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
                        className={`w-full ${signUpMutation.isPending || isAutoLoggingIn
                            ? 'bg-gray-600 cursor-not-allowed'
                            : 'bg-gray-700 hover:bg-gray-600'
                            } text-white py-2 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg`}
                        disabled={signUpMutation.isPending || isAutoLoggingIn}
                    >
                        {signUpMutation.isPending ? 'Creating Account...' :
                            isAutoLoggingIn ? 'Logging In...' : 'Sign Up'}
                    </button>
                </form>

                <p className="text-center mt-4">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-blue-500 hover:text-blue-400 transition-colors"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUpModal;
