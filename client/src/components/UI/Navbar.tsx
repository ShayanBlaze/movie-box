import { useState, useEffect, FC } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

interface NavbarProps {
  onSearchClick: () => void;
}

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/movies", label: "Movies" },
  { path: "/tv-shows", label: "TV Shows" },
];

const Navbar: FC<NavbarProps> = ({ onSearchClick }) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && !(event.target as Element).closest(".relative")) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

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
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive ? "text-yellow-400" : "text-gray-300"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onSearchClick}
              className="text-gray-300 hover:text-yellow-400 p-2 rounded-full transition cursor-pointer"
            >
              <svg
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
            <div className="relative">
              {user ? (
                <div>
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="block w-10 h-10 rounded-full overflow-hidden border-2 border-gray-600 focus:outline-none focus:border-yellow-400"
                  >
                    <img
                      src={
                        user.profilePicture ||
                        `https://ui-avatars.com/api/?name=${user.username}`
                      }
                      alt="User Avatar"
                      className="w-full h-full object-cover"
                    />
                  </button>
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50">
                      <Link
                        to="/profile"
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                      >
                        Profile
                      </Link>
                      <div className="border-t border-gray-700 my-1"></div>
                      <button
                        onClick={() => {
                          logout();
                          setIsMenuOpen(false);
                        }}
                        className="w-full text-left block px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-yellow-400 p-2 rounded-full transition cursor-pointer"
                >
                  <FiLogIn size={24} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
