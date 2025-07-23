import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ onSearchClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Style for active NavLink
  const activeLinkStyle = {
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
            <div className="flex-shrink-0">
              <NavLink
                to="/"
                className="text-3xl font-black text-yellow-400 tracking-wider"
              >
                MovieBox
              </NavLink>
            </div>
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
          <div className="flex items-center">
            <button
              onClick={onSearchClick}
              className="text-gray-300 hover:text-yellow-400 p-2 rounded-full"
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
