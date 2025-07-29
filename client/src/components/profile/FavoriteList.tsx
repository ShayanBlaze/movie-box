import { FC, useState, useEffect, MouseEvent } from "react";
import { useAuth } from "../../context/AuthContext";
import { FaArrowRight, FaTrash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { FavoriteSkeletonCard } from "../UI/FavoriteSkeletonCard";
import { Link } from "react-router-dom";

interface FavoriteItemProps {
  movie: {
    id: number;
    poster_path?: string;
    title?: string;
    name?: string;
  };
  onRemove: (id: number) => void;
  variants: any;
}

const FavoriteItem: FC<FavoriteItemProps> = ({ movie, onRemove, variants }) => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isTapped, setIsTapped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const onTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(onTouch);
  }, []);

  const handleCardClick = () => {
    if (isTouchDevice) {
      setIsTapped(!isTapped);
    }
  };

  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onRemove(movie.id);
  };

  const showOverlay =
    (!isTouchDevice && isHovered) || (isTouchDevice && isTapped);

  const overlayVariants = {
    hidden: { opacity: 0, transition: { duration: 0.2 } },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    hidden: { scale: 0.8, y: 10 },
    visible: {
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 15 },
    },
  } as const;

  return (
    <motion.div
      layout
      variants={variants}
      exit="exit"
      className="group relative rounded-xl overflow-hidden shadow-lg cursor-pointer aspect-[2/3]"
      onClick={handleCardClick}
      onHoverStart={() => !isTouchDevice && setIsHovered(true)}
      onHoverEnd={() => !isTouchDevice && setIsHovered(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title || movie.name}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-3 flex flex-col justify-end">
        <h4 className="font-bold text-white truncate text-base sm:text-lg">
          {movie.title || movie.name}
        </h4>
      </div>

      {/* Overlay with delete button */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
            onClick={(e) => {
              if (isTouchDevice) {
                e.stopPropagation();
                setIsTapped(false);
              }
            }}
          >
            <motion.button
              variants={buttonVariants}
              onClick={handleDelete}
              onPointerDown={(e) => e.stopPropagation()}
              className="p-4 bg-red-600 rounded-full text-white shadow-2xl flex items-center justify-center"
              aria-label={`Remove ${movie.title || movie.name}`}
            >
              <FaTrash size={20} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

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
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter mb-8">
          My Favorites
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {Array.from({ length: 10 }).map((_, index) => (
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
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter mb-8">
        My Favorites
      </h1>
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-5"
        variants={listVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {favorites.map((movie) => (
            <FavoriteItem
              key={movie.id}
              movie={movie}
              onRemove={removeFavorite}
              variants={itemVariants}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
