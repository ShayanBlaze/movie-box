import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

const watchTrailerAction = () => {
  toast.info("Sorry, this is a demo version. No trailer available. 🥲", {
    position: "top-center",
    autoClose: 3000,
    theme: "colored",
  });
};

const Hero = ({ endpoint }) => {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchFeaturedMovie = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${endpoint}?api_key=${apiKey}&language=en-US&page=1`
        );
        const data = await response.json();
        if (data.results?.length) {
          const randomMovie = data.results[Math.floor(Math.random() * 5)];
          setFeaturedMovie(randomMovie);
        }
      } catch (error) {
        console.error("Error fetching featured movie:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedMovie();
  }, [apiKey, endpoint]);

  if (loading || !featuredMovie) {
    return <div className="w-full h-screen bg-gray-900 animate-pulse"></div>;
  }

  const backdropUrl = featuredMovie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`
    : "/fallback-image.jpg";

  const movieOverview = featuredMovie.overview
    ? featuredMovie.overview.length > 200
      ? `${featuredMovie.overview.slice(0, 197)}...`
      : featuredMovie.overview
    : "No overview available.";

  return (
    <div className="relative w-full h-[85vh] sm:h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={backdropUrl}
          alt={featuredMovie.title || "Movie"}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c0c] via-[#0c0c0c]/40 to-transparent"></div>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col justify-end h-full p-4 sm:p-8 lg:p-12 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-shadow-lg">
            {featuredMovie.title}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-300 max-w-xl">
            {movieOverview}
          </p>
          <div className="mt-6 flex items-center gap-4">
            <button
              className="bg-yellow-400 text-black font-bold py-3 px-8 rounded-full hover:bg-yellow-300 transition-colors duration-300 flex items-center gap-2 cursor-pointer"
              onClick={watchTrailerAction}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Watch Trailer
            </button>
            <span className="text-yellow-400 font-bold text-lg">
              ⭐ {featuredMovie.vote_average?.toFixed(1) || "N/A"}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
