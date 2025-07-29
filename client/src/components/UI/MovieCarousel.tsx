import React, { useEffect, useState, FC } from "react";
import MovieCard from "./MovieCard";
import { motion } from "framer-motion";

import type { ContentItem } from "../../types";

interface MovieCarouselProps {
  title: string;
  endpoint: string;
}

const MovieCarousel: FC<MovieCarouselProps> = ({ title, endpoint }) => {
  const [movies, setMovies] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="mb-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-5 text-gray-100 px-4 sm:px-0">
        {title}
      </h2>
      {loading ? (
        <div className="flex space-x-4 overflow-hidden pl-4 sm:pl-0">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="w-40 sm:w-48 md:w-52 lg:w-56 shrink-0 aspect-[2/3] bg-gray-800 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      ) : (
        <motion.div
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 -mb-4 pl-4 sm:pl-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {movies.map((movie) => (
            // This wrapper div controls the size of the card within the carousel
            <motion.div
              key={movie.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="w-40 sm:w-48 md:w-52 lg:w-56 shrink-0"
            >
              <MovieCard movie={movie} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default MovieCarousel;
