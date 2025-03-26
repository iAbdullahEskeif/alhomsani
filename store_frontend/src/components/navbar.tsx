import type React from "react";

import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Menu,
  X,
  LogOut,
  LogIn,
  Home,
  Info,
  Mail,
  Gauge,
  Sun,
  Moon,
} from "lucide-react";
import {
  useAuth,
  useUser,
  SignInButton,
  SignOutButton,
} from "@clerk/clerk-react";
import { useTheme } from "../context/theme-context";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const { theme, toggleTheme } = useTheme();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav
      className={`${theme === "dark" ? "bg-[#0a0a0a] border-zinc-800" : "bg-white border-zinc-200"} border-b p-4 shadow-lg transition-colors duration-200`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className={`${theme === "dark" ? "text-white" : "text-zinc-900"} text-lg font-semibold hover:text-rose-500 transition-colors duration-200 flex items-center`}
        >
          <Gauge className="mr-2 text-rose-600" />
          <span
            className={`text-transparent bg-clip-text bg-gradient-to-r from-rose-500 ${theme === "dark" ? "to-white" : "to-zinc-800"}`}
          >
            Luxury Automotive
          </span>
        </Link>

        <div className="flex items-center md:hidden">
          <button
            className={`mr-4 p-1.5 rounded-full ${theme === "dark" ? "bg-zinc-800 text-zinc-200 hover:bg-zinc-700" : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"} transition-colors duration-200`}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            className={`${theme === "dark" ? "text-white" : "text-zinc-900"} hover:text-rose-500 transition-transform duration-200`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <ul className="hidden md:flex space-x-6 items-center">
          <li>
            <Link
              to="/"
              className={`${theme === "dark" ? "text-zinc-400" : "text-zinc-600"} hover:text-rose-500 transition-colors duration-200 flex items-center`}
              activeProps={{ className: "text-rose-500" }}
            >
              <Home className="mr-1 h-4 w-4" />
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`${theme === "dark" ? "text-zinc-400" : "text-zinc-600"} hover:text-rose-500 transition-colors duration-200 flex items-center`}
              activeProps={{ className: "text-rose-500" }}
            >
              <Info className="mr-1 h-4 w-4" />
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={`${theme === "dark" ? "text-zinc-400" : "text-zinc-600"} hover:text-rose-500 transition-colors duration-200 flex items-center`}
              activeProps={{ className: "text-rose-500" }}
            >
              <Mail className="mr-1 h-4 w-4" />
              Contact
            </Link>
          </li>
          <li>
            <button
              className={`p-1.5 rounded-full ${theme === "dark" ? "bg-zinc-800 text-zinc-200 hover:bg-zinc-700" : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"} transition-colors duration-200 mr-2`}
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </li>
          <li>
            {isSignedIn ? (
              <SignOutButton signOutCallback={() => navigate({ to: "/" })}>
                <button className="flex items-center px-4 py-1.5 rounded-lg transition-all duration-200 shadow-sm bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white">
                  <LogOut className="mr-1 h-4 w-4" />
                  Logout
                </button>
              </SignOutButton>
            ) : (
              <SignInButton mode="modal">
                <button
                  className={`flex items-center ${theme === "dark" ? "bg-zinc-800 hover:bg-zinc-700 border-zinc-700" : "bg-zinc-100 hover:bg-zinc-200 border-zinc-200"} ${theme === "dark" ? "text-white" : "text-zinc-900"} px-4 py-1.5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-lg border`}
                >
                  <LogIn className="mr-1 h-4 w-4 text-rose-500" />
                  Login
                </button>
              </SignInButton>
            )}
          </li>
        </ul>
      </div>

      {/* Hamburger Menu */}
      {isMenuOpen && (
        <div
          className={`md:hidden mt-4 ${theme === "dark" ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200"} rounded-lg border shadow-[0_10px_30px_rgba(0,0,0,0.3)] overflow-hidden`}
        >
          <ul
            className={`divide-y ${theme === "dark" ? "divide-zinc-800" : "divide-zinc-200"}`}
          >
            <li>
              <Link
                to="/"
                className={`flex items-center p-4 ${theme === "dark" ? "text-zinc-400 hover:bg-zinc-800/50" : "text-zinc-600 hover:bg-zinc-100"} hover:text-rose-500 transition-colors`}
                onClick={() => setIsMenuOpen(false)}
                activeProps={{
                  className: `text-rose-500 ${theme === "dark" ? "bg-zinc-800/50" : "bg-zinc-100"}`,
                }}
              >
                <Home className="mr-2 h-5 w-5" />
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`flex items-center p-4 ${theme === "dark" ? "text-zinc-400 hover:bg-zinc-800/50" : "text-zinc-600 hover:bg-zinc-100"} hover:text-rose-500 transition-colors`}
                onClick={() => setIsMenuOpen(false)}
                activeProps={{
                  className: `text-rose-500 ${theme === "dark" ? "bg-zinc-800/50" : "bg-zinc-100"}`,
                }}
              >
                <Info className="mr-2 h-5 w-5" />
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={`flex items-center p-4 ${theme === "dark" ? "text-zinc-400 hover:bg-zinc-800/50" : "text-zinc-600 hover:bg-zinc-100"} hover:text-rose-500 transition-colors`}
                onClick={() => setIsMenuOpen(false)}
                activeProps={{
                  className: `text-rose-500 ${theme === "dark" ? "bg-zinc-800/50" : "bg-zinc-100"}`,
                }}
              >
                <Mail className="mr-2 h-5 w-5" />
                Contact
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  toggleTheme();
                  setIsMenuOpen(false);
                }}
                className={`w-full flex items-center p-4 ${theme === "dark" ? "text-zinc-400 hover:bg-zinc-800/50" : "text-zinc-600 hover:bg-zinc-100"} hover:text-rose-500 transition-colors`}
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="mr-2 h-5 w-5 text-amber-500" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="mr-2 h-5 w-5 text-indigo-500" />
                    Dark Mode
                  </>
                )}
              </button>
            </li>
            <li>
              {isSignedIn ? (
                <SignOutButton signOutCallback={() => navigate({ to: "/" })}>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className={`w-full flex items-center p-4 text-white ${theme === "dark" ? "bg-rose-700/20 hover:bg-rose-700/30" : "bg-rose-500/10 hover:bg-rose-500/20"} transition-colors`}
                  >
                    <LogOut className="mr-2 h-5 w-5 text-rose-500" />
                    Logout
                  </button>
                </SignOutButton>
              ) : (
                <SignInButton mode="modal">
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className={`w-full flex items-center p-4 ${theme === "dark" ? "text-white bg-zinc-800/50 hover:bg-zinc-700/50" : "text-zinc-900 bg-zinc-100 hover:bg-zinc-200"} transition-colors`}
                  >
                    <LogIn className="mr-2 h-5 w-5 text-rose-500" />
                    Login
                  </button>
                </SignInButton>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
