import type React from "react";

import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, X, LogOut, LogIn, Home, Info, Mail, Gauge } from "lucide-react";
import {
  useAuth,
  useUser,
  SignInButton,
  SignOutButton,
} from "@clerk/clerk-react";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className={"bg-[#0a0a0a] border-b border-zinc-800 p-4 shadow-lg"}>
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-white text-lg font-semibold hover:text-rose-500 transition-colors duration-200 flex items-center"
        >
          <Gauge className="mr-2 text-rose-600" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-white">
            Luxury Automotive
          </span>
        </Link>

        <button
          className="block md:hidden text-white hover:text-rose-500 transition-transform duration-200"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul className="hidden md:flex space-x-6 items-center">
          <li>
            <Link
              to="/"
              className="text-zinc-400 hover:text-rose-500 transition-colors duration-200 flex items-center"
              activeProps={{ className: "text-rose-500" }}
            >
              <Home className="mr-1 h-4 w-4" />
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-zinc-400 hover:text-rose-500 transition-colors duration-200 flex items-center"
              activeProps={{ className: "text-rose-500" }}
            >
              <Info className="mr-1 h-4 w-4" />
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-zinc-400 hover:text-rose-500 transition-colors duration-200 flex items-center"
              activeProps={{ className: "text-rose-500" }}
            >
              <Mail className="mr-1 h-4 w-4" />
              Contact
            </Link>
          </li>
          <li>
            {isSignedIn ? (
              <SignOutButton signOutCallback={() => navigate({ to: "/" })}>
                <button className="flex items-center px-4 py-1.5 rounded-lg transition-all duration-200 shadow-sm bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600">
                  <LogOut className="mr-1 h-4 w-4" />
                  Logout
                </button>
              </SignOutButton>
            ) : (
              <SignInButton mode="modal">
                <button className="flex items-center text-white bg-zinc-800 hover:bg-zinc-700 px-4 py-1.5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-lg border border-zinc-700">
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
        <div className="md:hidden mt-4 bg-zinc-900 rounded-lg border border-zinc-800 shadow-[0_10px_30px_rgba(0,0,0,0.3)] overflow-hidden">
          <ul className="divide-y divide-zinc-800">
            <li>
              <Link
                to="/"
                className="flex items-center p-4 text-zinc-400 hover:text-rose-500 hover:bg-zinc-800/50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
                activeProps={{ className: "text-rose-500 bg-zinc-800/50" }}
              >
                <Home className="mr-2 h-5 w-5" />
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="flex items-center p-4 text-zinc-400 hover:text-rose-500 hover:bg-zinc-800/50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
                activeProps={{ className: "text-rose-500 bg-zinc-800/50" }}
              >
                <Info className="mr-2 h-5 w-5" />
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="flex items-center p-4 text-zinc-400 hover:text-rose-500 hover:bg-zinc-800/50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
                activeProps={{ className: "text-rose-500 bg-zinc-800/50" }}
              >
                <Mail className="mr-2 h-5 w-5" />
                Contact
              </Link>
            </li>
            <li>
              {isSignedIn ? (
                <SignOutButton signOutCallback={() => navigate({ to: "/" })}>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full flex items-center p-4 text-white bg-rose-700/20 hover:bg-rose-700/30 transition-colors"
                  >
                    <LogOut className="mr-2 h-5 w-5 text-rose-500" />
                    Logout
                  </button>
                </SignOutButton>
              ) : (
                <SignInButton mode="modal">
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full flex items-center p-4 text-white bg-zinc-800/50 hover:bg-zinc-700/50 transition-colors"
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
