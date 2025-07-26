import React, { useState, useEffect, FC } from "react";
import { NavLink } from "react-router-dom";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { toast } from "react-toastify";

interface NavbarProps {
  onSearchClick: () => void;
}

const Navbar: FC<NavbarProps> = ({ onSearchClick }) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleAuthClick = () => {
    if (isLoggedIn) {
      if (window.confirm("Are you sure you want to log out?")) {
        setIsLoggedIn(false);
        toast.success("Logged out successfully");
      }
    } else {
      setIsLoggedIn(true);
      toast.success("Logged in successfully");
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeLinkStyle: React.CSSProperties = {
    color: "#ffc107",
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/50 backdrop-blur-lg shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <NavLink
              to="/"
              className="text-3xl font-black text-yellow-400 tracking-wider"
            >
              MovieBox
            </NavLink>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <NavLink
                  to="/"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  style={({ isActive }) =>
                    isActive ? activeLinkStyle : undefined
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/movies"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  style={({ isActive }) =>
                    isActive ? activeLinkStyle : undefined
                  }
                >
                  Movies
                </NavLink>
                <NavLink
                  to="/tv-shows"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  style={({ isActive }) =>
                    isActive ? activeLinkStyle : undefined
                  }
                >
                  TV Shows
                </NavLink>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onSearchClick}
              className="text-gray-300 hover:text-yellow-400 p-2 rounded-full transition cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <button
              onClick={() => handleAuthClick()}
              className="text-gray-300 hover:text-yellow-400 p-2 rounded-full transition cursor-pointer"
            >
              {isLoggedIn ? <FiLogOut size={24} /> : <FiLogIn size={24} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
