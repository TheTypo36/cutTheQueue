"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Sun, Moon, Menu, X, User, LogOut, FileText, Home } from "lucide-react";

function Header() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDarkMode(!isDarkMode);
  };

  const handleSignOut = () => {
    signOut();
    navigate("/signin");
    setIsMenuOpen(false);
  };

  const handleFetchMedicalHistory = () => {
    navigate("/medical-history");
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-gray-900/95 shadow-lg backdrop-blur-sm py-2"
          : "bg-transparent py-3"
      }`}
    >
      <div className="w-full px-2 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center space-x-2 text-2xl font-bold text-primary dark:text-primary-dark transition-all duration-300 hover:scale-105 ml-2"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-8 h-8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
          <span className="animate-fade-in bg-gradient-to-r from-primary to-purple-600 dark:from-primary-dark dark:to-purple-400 text-transparent bg-clip-text">
            CutTheQueue
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 mr-4">
          {user ? (
            <>
              <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-50 dark:bg-gray-800">
                <User size={18} className="text-primary dark:text-primary-dark" />
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {user.name ? user.name : "User"}
                </span>
              </div>

              <button
                onClick={handleFetchMedicalHistory}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all transform hover:scale-105 ${
                  isActive("/medical-history")
                    ? "bg-primary/10 text-primary dark:bg-primary-dark/20 dark:text-primary-dark"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <FileText size={18} />
                <span>Medical History</span>
              </button>

              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 px-4 py-2 rounded-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all transform hover:scale-105"
              >
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/adminLogin"
                className={`px-4 py-2 rounded-full transition-all transform hover:scale-105 ${
                  isActive("/adminLogin")
                    ? "bg-primary/10 text-primary dark:bg-primary-dark/20 dark:text-primary-dark"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                Admin Panel
              </Link>
              <Link
                to="/signin"
                className={`px-4 py-2 rounded-full transition-all transform hover:scale-105 ${
                  isActive("/signin")
                    ? "bg-primary/10 text-primary dark:bg-primary-dark/20 dark:text-primary-dark"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-6 py-2 rounded-full bg-gradient-to-r from-primary to-purple-600 dark:from-primary-dark dark:to-purple-400 text-white hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Sign Up
              </Link>
            </>
          )}

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all transform hover:scale-110 hover:rotate-12"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4 md:hidden mr-2">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all transform hover:scale-110"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg animate-fade-in border-t dark:border-gray-800">
          <div className="px-2 py-4 flex flex-col space-y-4">
            {user ? (
              <>
                <div className="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <User
                    size={18}
                    className="text-primary dark:text-primary-dark"
                  />
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {user.name ? `Welcome, ${user.name}` : "Welcome"}
                  </span>
                </div>

                <Link
                  to="/"
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Home size={18} />
                  <span>Home</span>
                </Link>

                <button
                  onClick={handleFetchMedicalHistory}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-left w-full transition-colors"
                >
                  <FileText size={18} />
                  <span>Medical History</span>
                </button>

                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 text-left w-full transition-colors"
                >
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/adminLogin"
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin Panel
                </Link>
                <Link
                  to="/signin"
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="p-2 rounded-lg bg-gradient-to-r from-primary to-purple-600 dark:from-primary-dark dark:to-purple-400 text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
