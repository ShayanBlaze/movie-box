import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MovieCard = ({ movie }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) / 25;
    const y = (clientY - top - height / 2) / 25;
    cardRef.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
  };

  const handleMouseLeave = () => {
    cardRef.current.style.transform = "rotateY(0deg) rotateX(0deg)";
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
    <motion.div className="shrink-0" variants={cardVariants}>
      <Link to={linkPath}>
        <div
          style={{ perspective: "1000px" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-52 sm:w-60 h-72 sm:h-80 rounded-xl transition-all duration-300 group"
        >
          <div
            ref={cardRef}
            className="w-full h-full bg-gray-800 rounded-xl shadow-lg transition-transform duration-200 ease-out group-hover:shadow-yellow-400/20"
            style={{ transformStyle: "preserve-3d" }}
          >
            <img
              src={imageUrl}
              alt={displayName}
              className="w-full h-full object-cover rounded-xl absolute"
              style={{ transform: "translateZ(0px)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl"></div>
            <div
              className="absolute bottom-0 left-0 p-4"
              style={{ transform: "translateZ(50px)" }}
            >
              <h3 className="text-white font-bold text-lg drop-shadow-lg">
                {displayName}
              </h3>
              <span className="text-yellow-400 text-sm">
                ⭐ {movie.vote_average.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default MovieCard;
