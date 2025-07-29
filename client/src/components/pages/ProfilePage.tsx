import { FC } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaSignOutAlt, FaHeart, FaTachometerAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export const ProfilePage: FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  } as const;

  const sidebarVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  } as const;

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  } as const;

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4 sm:p-8 md:p-12 lg:p-20 pt-24">
      <motion.div
        className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Sidebar opens from the left */}
        <motion.aside
          variants={sidebarVariants}
          className="w-full md:w-80 flex-shrink-0"
        >
          <div className="sticky top-24 bg-gray-800/60 backdrop-blur-md p-6 rounded-2xl shadow-2xl flex flex-col h-full border border-white/10">
            <motion.div
              className="flex flex-col items-center text-center border-b border-white/10 pb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <motion.img
                src={user?.profilePicture}
                alt="User Avatar"
                className="w-28 h-28 rounded-full border-4 border-yellow-500 object-cover shadow-lg"
                whileHover={{ scale: 1.1, rotate: 8 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              <h2 className="mt-4 text-2xl font-bold tracking-wide">
                {user?.username}
              </h2>
              <p className="text-sm text-gray-400">{user?.email}</p>
            </motion.div>

            <nav className="mt-6 flex-grow">
              <NavLink
                to="/profile"
                end
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 text-lg font-medium ${
                    isActive
                      ? "bg-yellow-500 text-black shadow-lg"
                      : "hover:bg-gray-700/80 hover:pl-6"
                  }`
                }
              >
                <FaTachometerAlt />
                <span>Dashboard</span>
              </NavLink>
              <NavLink
                to="/profile/favorites"
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 mt-2 rounded-lg transition-all duration-300 text-lg font-medium ${
                    isActive
                      ? "bg-yellow-500 text-black shadow-lg"
                      : "hover:bg-gray-700/80 hover:pl-6"
                  }`
                }
              >
                <FaHeart />
                <span>Favorites</span>
              </NavLink>
            </nav>

            <div className="mt-6">
              <motion.button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg transition-colors bg-red-600 text-white font-bold text-lg"
                whileHover={{ scale: 1.05, backgroundColor: "#e53e3e" }}
                whileTap={{ scale: 0.95 }}
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </motion.button>
            </div>
          </div>
        </motion.aside>

        {/* Main Content */}
        <motion.main
          variants={contentVariants}
          className="flex-1 bg-gray-800/60 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-2xl border border-white/10"
        >
          <Outlet />
        </motion.main>
      </motion.div>
    </div>
  );
};
