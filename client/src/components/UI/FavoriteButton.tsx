import { FC } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import { ContentItem } from "../../types";
import { useFavoriteStatus } from "../../hooks/useFavoriteStatus";

interface FavoriteButtonProps {
  movie: ContentItem;
}

export const FavoriteButton: FC<FavoriteButtonProps> = ({ movie }) => {
  const { isFavorited, toggleFavorite } = useFavoriteStatus(movie);

  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite();
  };

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={handleFavoriteClick}
      className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-colors duration-300 ${
        isFavorited
          ? "text-red-500 bg-white/30 backdrop-blur-sm"
          : "text-white bg-black/50 backdrop-blur-sm"
      }`}
      aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorited ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
    </motion.button>
  );
};
