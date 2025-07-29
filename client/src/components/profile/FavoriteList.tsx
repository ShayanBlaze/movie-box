// src/components/FavoritesList.tsx

import { FC } from "react";
import { useAuth } from "../../context/AuthContext";
import { FaArrowRight, FaTrash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { FavoriteSkeletonCard } from "../UI/FavoriteSkeletonCard";
import { Link } from "react-router-dom";

export const FavoritesList: FC = () => {
  const { favorites, removeFavorite, favoritesLoading } = useAuth();

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.95 },
    visible: { y: 0, opacity: 1, scale: 1 },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3 },
    },
  };

  if (favoritesLoading) {
    return (
      <div>
        <h1 className="text-4xl font-bold tracking-tighter mb-8">
          My Favorites
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <FavoriteSkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <p className="text-xl text-gray-400">You have no favorite items yet.</p>
        <p className="text-gray-500 mt-2">Find and add some movies you love!</p>
        <Link to="/movies" className="font-bold text-amber-300">
          <div className="flex items-center justify-center gap-3 mt-2">
            TO THE MOVIES <FaArrowRight />
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold tracking-tighter mb-8">My Favorites</h1>
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6"
        variants={listVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {favorites.map((movie) => (
            <motion.div
              key={movie.id}
              layout
              variants={itemVariants}
              exit="exit"
              className="group relative rounded-xl overflow-hidden shadow-lg cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
              whileHover={{
                y: -10,
                scale: 1.05,
                boxShadow: "0px 20px 30px rgba(0,0,0,0.5)",
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent p-3 flex flex-col justify-end">
                <h4 className="font-bold text-white truncate text-lg">
                  {movie.title}
                </h4>
              </div>
              <motion.div
                className="absolute inset-0 bg-black/70 flex items-center justify-center"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.button
                  onClick={() => removeFavorite(movie.id)}
                  className="p-4 bg-red-600 rounded-full text-white shadow-lg"
                  aria-label={`Remove ${movie.title}`}
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTrash />
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
