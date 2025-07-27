// src/components/profile/FavoritesList.tsx

import { FC } from "react";
import { useAuth } from "../../context/AuthContext";
import { FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";

export const FavoritesList: FC = () => {
  const { favorites, removeFavorite } = useAuth();

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
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  };

  if (favorites.length === 0) {
    return <p>You have no favorite items yet.</p>;
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
        {favorites.map((movie) => (
          <motion.div
            key={movie.id}
            variants={itemVariants}
            whileHover={{
              y: -10,
              scale: 1.05,
              boxShadow: "0px 15px 25px rgba(0,0,0,0.5)",
            }}
            className="group relative rounded-xl overflow-hidden shadow-lg cursor-pointer"
            style={{ transformStyle: "preserve-3d" }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <motion.button
                onClick={() => removeFavorite(movie.id)}
                className="p-4 bg-red-600 rounded-full text-white shadow-lg"
                aria-label={`Remove ${movie.title}`}
                whileHover={{ scale: 1.2, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTrash />
              </motion.button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
              <h4 className="font-bold text-white truncate text-lg">
                {movie.title}
              </h4>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
