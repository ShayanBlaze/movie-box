import React, { useRef, FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import type { ContentItem } from "../../types";
import { FavoriteButton } from "./FavoriteButton";

interface MovieCardProps {
  movie: ContentItem;
}

const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // This check ensures the 3D effect is disabled on touch-enabled devices
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isTouchDevice) return;
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) / 20; // Reduced intensity
    const y = (clientY - top - height / 2) / 20; // Reduced intensity
    cardRef.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current && !isTouchDevice) {
      cardRef.current.style.transform = "rotateY(0deg) rotateX(0deg)";
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const isMovie = movie.title !== undefined;
  const linkPath = isMovie ? `/movie/${movie.id}` : `/tv/${movie.id}`;
  const displayName = movie.title || movie.name;
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://placehold.co/500x750/1f2937/e5e7eb?text=No+Poster";

  return (
    <motion.div variants={cardVariants} className="w-full">
      <Link to={linkPath}>
        <div
          style={{ perspective: "1000px" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full aspect-[2/3] rounded-xl transition-all duration-300 group"
        >
          <motion.div
            ref={cardRef}
            className="w-full h-full bg-gray-800 rounded-xl shadow-lg transition-transform duration-300 ease-out group-hover:shadow-yellow-400/20"
            style={{ transformStyle: "preserve-3d" }}
            whileTap={{ scale: isTouchDevice ? 0.95 : 1 }} // Add tap effect for touch devices
          >
            <img
              src={imageUrl}
              alt={displayName}
              className="w-full h-full object-cover rounded-xl absolute"
              style={{ transform: "translateZ(0px)" }}
            />
            <FavoriteButton movie={movie} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-xl"></div>
            <div
              className="absolute bottom-0 left-0 p-3 sm:p-4" // Adjusted padding for smaller screens
              style={{ transform: "translateZ(40px)" }}
            >
              <h3 className="text-white font-bold text-base sm:text-lg drop-shadow-lg">
                {displayName}
              </h3>
              <span className="text-yellow-400 text-sm">
                ⭐ {movie.vote_average.toFixed(1)}
              </span>
            </div>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
};

export default MovieCard;
