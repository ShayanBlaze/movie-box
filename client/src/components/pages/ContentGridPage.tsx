import { useEffect, useState, FC } from "react";
import MovieCard from "../UI/MovieCard";
import { motion } from "framer-motion";
import SkeletonCard from "../UI/SkeletonCard";

import type { ContentItem } from "../../types";

interface ContentGridPageProps {
  title: string;
  endpoint: string;
}

const ContentGridPage: FC<ContentGridPageProps> = ({ title, endpoint }) => {
  const [items, setItems] = useState<ContentItem[]>([]);
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
        setItems(data.results);
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setTimeout(() => setLoading(false), 500); // Simulate loading for better UX
      }
    };
    fetchMovies();
  }, [apiKey, endpoint]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  return (
    <div className="min-h-screen pt-24 sm:pt-28 px-4 sm:px-6 lg:px-8">
      <motion.h1
        className="text-3xl sm:text-4xl font-bold text-white mb-6 sm:mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h1>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {loading
          ? Array.from({ length: 12 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : items.map((item) => <MovieCard key={item.id} movie={item} />)}
      </motion.div>
    </div>
  );
};

export default ContentGridPage;
