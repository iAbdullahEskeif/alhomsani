import { useMutation } from '@tanstack/react-query';
import { useNavigate } from "react-router-dom";

const LogoutButton = ({ setToken }) => {
    const navigate = useNavigate();

    const performCleanup = () => {
        setToken(null);
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        navigate("/");
        window.location.reload(); // Refresh UI state
    };

    const logoutMutation = useMutation({
        mutationFn: async (refreshToken) => {
            const response = await fetch("http://127.0.0.1:8000/api/logout/blacklist/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refresh: refreshToken }),
            });

            if (!response.ok) {
                throw new Error("Failed to blacklist token");
            }
            return response.json();
        },
        onSettled: performCleanup, // Runs on both success and error
    });

    const handleLogout = () => {
        const refreshToken = localStorage.getItem("refresh");

        if (refreshToken) {
            logoutMutation.mutate(refreshToken);
        } else {
            performCleanup(); // Immediate cleanup if no refresh token
        }
    };

    return (
        <button
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            className={`bg-red-600 text-white py-2 px-4 rounded-lg transition-opacity ${logoutMutation.isPending ? 'opacity-75 cursor-not-allowed' : 'hover:bg-red-500'
                }`}
        >
            {logoutMutation.isPending ? 'Logging Out...' : 'Logout'}
        </button>
    );
};

export default LogoutButton;
