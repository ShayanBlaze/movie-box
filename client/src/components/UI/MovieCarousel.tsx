import React, { useEffect, useState, useRef, FC } from "react";
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

  const carouselRef = useRef<HTMLDivElement>(null);

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

  // تابع مدیریت حرکت با دکمه‌های چپ و راست
  const handleScroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const scrollAmount = container.clientWidth * 0.75; // اسکرول به اندازه ۷۵٪ عرض کانتینر

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="mb-8">
      {/* هدر بخش: عنوان + دکمه‌های ناوبری دسکتاپ */}
      <div className="flex items-center justify-between mb-5 px-4 sm:px-0">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-100">
          {title}
        </h2>

        {/* دکمه‌های چپ و راست - فقط در دسکتاپ/تبلت (sm به بالا) نمایش داده می‌شوند */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => handleScroll("left")}
            aria-label="اسکرول به چپ"
            className="p-2.5 rounded-full bg-gray-800/80 hover:bg-gray-700 text-gray-200 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => handleScroll("right")}
            aria-label="اسکرول به راست"
            className="p-2.5 rounded-full bg-gray-800/80 hover:bg-gray-700 text-gray-200 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

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
        <div
          ref={carouselRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 pl-4 sm:pl-0 touch-pan-x [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {movies.map((movie, index) => (
            <motion.div
              key={movie.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{
                duration: 0.25,
                delay: Math.min(index * 0.04, 0.24),
              }}
              className="w-40 sm:w-48 md:w-52 lg:w-56 shrink-0"
            >
              <MovieCard movie={movie} />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MovieCarousel;