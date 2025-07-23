import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { motion } from "framer-motion";

const MovieCarousel = ({ title, endpoint }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${endpoint}?api_key=${apiKey}&language=en-US&page=1`
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error(`Error fetching ${title}:`, error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [apiKey, endpoint, title]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section>
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-200">
        {title}
      </h2>
      {loading ? (
        <div className="flex space-x-4 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="w-60 h-80 bg-gray-800 rounded-lg animate-pulse shrink-0"
            ></div>
          ))}
        </div>
      ) : (
        <motion.div
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 -mb-4"
          style={{ scrollbarWidth: "none", "-ms-overflow-style": "none" }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default MovieCarousel;
