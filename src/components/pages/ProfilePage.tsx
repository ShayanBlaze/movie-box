import { FC } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaSignOutAlt, FaHeart, FaTachometerAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export const ProfilePage: FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/");
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4 md:p-28 pt-24">
      <motion.div
        className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Sidebar */}
        <motion.aside
          variants={itemVariants}
          className="w-full md:w-72 flex-shrink-0"
        >
          <div className="sticky top-24 bg-gray-800/50 backdrop-blur-sm p-5 rounded-2xl shadow-2xl flex flex-col h-full border border-white/10">
            <div className="flex flex-col items-center text-center border-b border-white/10 pb-5">
              <motion.img
                src={
                  user.photoURL ||
                  `https://ui-avatars.com/api/?name=${user.displayName}&background=27272a&color=fff`
                }
                alt="User Avatar"
                className="w-28 h-28 rounded-full border-4 border-gray-700 object-cover shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
              />
              <h2 className="mt-4 text-2xl font-bold tracking-wide">
                {user.displayName}
              </h2>
              <p className="text-sm text-gray-400">{user.email}</p>
            </div>
            <nav className="mt-6 flex-grow">
              <NavLink
                to="/profile"
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-lg ${
                    isActive
                      ? "bg-yellow-500 text-black font-bold"
                      : "hover:bg-gray-700"
                  }`
                }
              >
                <FaTachometerAlt />
                <span>Dashboard</span>
              </NavLink>
              <NavLink
                to="/profile/favorites"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 mt-2 rounded-lg transition-colors text-lg ${
                    isActive
                      ? "bg-yellow-500 text-black font-bold"
                      : "hover:bg-gray-700"
                  }`
                }
              >
                <FaHeart />
                <span>Favorites</span>
              </NavLink>
            </nav>
            <div className="mt-6">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg transition-colors bg-red-600 hover:bg-red-700 text-white font-bold text-lg"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </motion.aside>

        {/* Content Area */}
        <motion.main
          variants={itemVariants}
          className="flex-1 bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-white/10"
        >
          <Outlet />
        </motion.main>
      </motion.div>
    </div>
  );
};
