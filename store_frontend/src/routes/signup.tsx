import { useMutation } from "@tanstack/react-query";
import { useState, FormEvent, ChangeEvent } from "react";
import { X, Mail, User, Lock, AlertCircle, CheckCircle } from "lucide-react";
import { Link, useNavigate, createFileRoute } from "@tanstack/react-router";
import { API_URL } from "../config";

interface SignUpModalProps {
  setToken: (token: string) => void;
}

interface FormData {
  email: string;
  user_name: string;
  password: string;
  confirmPassword: string;
}

function SignUpModal({ setToken }: SignUpModalProps) {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    user_name: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isAutoLoggingIn, setIsAutoLoggingIn] = useState<boolean>(false);
  const navigate = useNavigate();

  const signUpMutation = useMutation<any, any, FormData>({
    mutationFn: async (userData: FormData) => {
      const response = await fetch(`${API_URL}/api/users/create/`, {
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
        const loginResponse = await fetch(`${API_URL}/api/token/`, {
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
          window.location.reload();
        } else {
          setError("Account created! Please log in manually.");
          navigate({ to: "/login" });
        }
      } catch (loginError: any) {
        setError("Account created! Please log in manually.");
        navigate({ to: "/login" });
      } finally {
        setIsAutoLoggingIn(false);
      }
    },
    onError: (error: any) => {
      setError(error.error || error.detail || "Sign up failed");
    },
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
    <div className="min-h-screen bg-[#0a0a0a] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48cGF0aCBkPSJNNTkuOTk5IDYwSDBWMGg1OS45OTlWNjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTU5Ljk5OSA2MEgzMFYzMGgyOS45OTlWNjB6TTMwIDYwSDBWMzBoMzBWNjB6TTU5Ljk5OSAzMEgzMFYwaDI5Ljk5OVYzMHpNMzAgMzBIMFYwaDMwVjMweiIgZmlsbD0iIzFhMWExYSIgZmlsbC1vcGFjaXR5PSIwLjA1Ii8+PHBhdGggZD0iTTUzLjk5OSA2MEg2VjZoNDcuOTk5VjYweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0zMCA0Ny45OTljLTkuOTQxIDAtMTcuOTk5LTguMDU4LTE3Ljk5OS0xNy45OTlTMjAuMDU5IDEyIDMwIDEyczE3Ljk5OSA4LjA1OCAxNy45OTkgMTcuOTk5UzM5Ljk0MSA0Ny45OTkgMzAgNDcuOTk5eiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0zMCAzNS45OTljLTMuMzE0IDAtNS45OTktMi42ODYtNS45OTktNS45OTlTMjYuNjg2IDI0IDMwIDI0czUuOTk5IDIuNjg2IDUuOTk5IDUuOTk5UzMzLjMxNCAzNS45OTkgMzAgMzUuOTk5eiIgZmlsbD0iIzFhMWExYSIgZmlsbC1vcGFjaXR5PSIwLjA1Ii8+PC9zdmc+')]">
      <div className="flex flex-col justify-center items-center min-h-screen px-4 py-12">
        <div className="relative w-full max-w-md">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-600 to-blue-600 rounded-xl blur opacity-75 transition duration-1000 animate-gradient-xy"></div>

          <div className="relative bg-zinc-900 p-8 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-zinc-800">
            <Link
              to="/"
              className="absolute top-4 right-4 text-zinc-500 hover:text-rose-500 transition-colors"
            >
              <X size={20} />
            </Link>

            <div className="flex items-center justify-center mb-6">
              <div className="w-1 h-8 bg-rose-600 mr-3"></div>
              <h2 className="text-2xl font-bold text-white">Create Account</h2>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-zinc-800/50 border border-rose-900/50 rounded-lg flex items-start">
                <AlertCircle
                  className="text-rose-500 mr-2 flex-shrink-0 mt-0.5"
                  size={18}
                />
                <p className="text-rose-500 text-sm">{error}</p>
              </div>
            )}

            {successMessage && (
              <div className="mb-6 p-3 bg-zinc-800/50 border border-emerald-900/50 rounded-lg flex items-start">
                <CheckCircle
                  className="text-emerald-500 mr-2 flex-shrink-0 mt-0.5"
                  size={18}
                />
                <p className="text-emerald-500 text-sm">{successMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-zinc-400 mb-2 text-sm">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-zinc-500" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 mb-2 text-sm">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-zinc-500" />
                  </div>
                  <input
                    type="text"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                    placeholder="Choose a username"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 mb-2 text-sm">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-zinc-500" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                    placeholder="Create a password"
                  />
                </div>
                <p className="text-zinc-500 text-xs mt-1">
                  Password must be at least 8 characters
                </p>
              </div>

              <div>
                <label className="block text-zinc-400 mb-2 text-sm">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-zinc-500" />
                  </div>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>

              <button
                type="submit"
                className={`w-full mt-2 ${
                  signUpMutation.status === "pending" || isAutoLoggingIn
                    ? "bg-rose-800 cursor-not-allowed"
                    : "bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600"
                } text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-300 shadow-lg shadow-rose-600/20`}
                disabled={
                  signUpMutation.status === "pending" || isAutoLoggingIn
                }
              >
                {signUpMutation.status === "pending"
                  ? "Creating Account..."
                  : isAutoLoggingIn
                    ? "Logging In..."
                    : "Sign Up"}
              </button>
            </form>

            <p className="text-center mt-6 text-zinc-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-rose-500 hover:text-rose-400 transition-colors"
              >
                Login
              </Link>
            </p>

            <div
              className="absolute -z-10 opacity-5 right-10 bottom-10"
              style={{ animation: "rotate 20s linear infinite" }}
            >
              <svg width="150" height="150" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.87653 17.3663 4.02405 17.1457 4.21 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1 12.6104 1 12.08 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/signup")({
  component: SignUpModal,
});
