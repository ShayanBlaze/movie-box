import { useEffect, useState, FC } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import MovieDetailSkeleton from "../UI/MovieDetailSkeleton";
import { formatVotes } from "../../utils/formatter";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useFavoriteStatus } from "../../hooks/useFavoriteStatus";

import type { DetailItem, CastMember } from "../../types";

type DetailParams = {
  mediaType: string;
  id: string;
};

const DetailPage: FC = () => {
  const { mediaType, id } = useParams<DetailParams>();

  const [item, setItem] = useState<DetailItem | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { isFavorited, toggleFavorite } = useFavoriteStatus(item);

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovieData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${apiKey}&append_to_response=credits`
        );
        if (!response.ok) {
          throw new Error("Content not found. Please check the URL.");
        }
        const data = await response.json();
        setItem(data);
        setCast(data.credits.cast.slice(0, 12));
      } catch (err: any) {
        console.error("Error fetching details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (mediaType && id) {
      fetchMovieData();
    }
    window.scrollTo(0, 0);
  }, [mediaType, id, apiKey]);

  if (loading) {
    return <MovieDetailSkeleton />;
  }

  if (error) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center text-white">
        <h2 className="text-2xl font-bold text-red-500">An Error Occurred</h2>
        <p className="text-gray-400 mt-2">{error}</p>
      </div>
    );
  }

  if (!item) return null;

  const backdropUrl = `https://image.tmdb.org/t/p/w1280${item.backdrop_path}`;
  const posterUrl = `https://image.tmdb.org/t/p/w500${item.poster_path}`;

  const displayName = item.title || item.name;
  const releaseDate = item.release_date || item.first_air_date;
  const tagline = item.tagline;

  const rating = item.vote_average?.toFixed(1);
  const runtime = item.runtime;
  const seasons = item.number_of_seasons;
  const episodes = item.number_of_episodes;
  const status = item.status;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Backdrop Section */}
      <div className="relative w-full h-[50vh] sm:h-[60vh]">
        <div className="absolute inset-0">
          <img
            src={backdropUrl}
            alt=""
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/70 to-transparent"></div>
        </div>
      </div>

      {/* Content Section - Adjusted negative margin */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-8 pb-16 -mt-28 sm:-mt-32 md:-mt-48">
        <div className="md:flex md:items-start md:space-x-8">
          {/* Poster */}
          <motion.div
            className="w-40 sm:w-56 mx-auto md:mx-6 shrink-0"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
          >
            <img
              src={posterUrl}
              alt={displayName}
              className="rounded-xl shadow-2xl w-full"
            />
          </motion.div>

          {/* Details */}
          <div className="mt-6 md:mt-0 text-white w-full">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-center md:text-left">
              {displayName}
            </h1>
            {tagline && (
              <p className="text-base sm:text-lg text-gray-400 mt-2 italic text-center md:text-left">
                "{tagline}"
              </p>
            )}

            <div className="flex flex-wrap gap-2 mt-5 justify-center md:justify-start">
              {item.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-gray-800 text-gray-300 px-3 py-1 text-xs sm:text-sm rounded-full"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <p className="mt-6 text-gray-300 leading-relaxed max-w-3xl text-sm sm:text-base">
              {item.overview}
            </p>

            <div className="flex justify-center md:justify-start mt-4">
              <motion.button
                onClick={toggleFavorite}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-4 py-2 mt-6 rounded-lg font-bold transition-colors cursor-pointer text-sm sm:text-base ${
                  isFavorited
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-gray-700 hover:bg-gray-600 text-gray-200"
                }`}
              >
                {isFavorited ? <FaHeart /> : <FaRegHeart />}
                <span>
                  {isFavorited ? "Remove from Favorites" : "Add to Favorites"}
                </span>
              </motion.button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-4 mt-8 text-center">
              {/* RATING */}
              <div>
                <p className="text-gray-400 text-sm font-medium">RATING</p>
                <p className="text-xl sm:text-2xl font-bold text-yellow-400 flex items-center gap-2 justify-center">
                  ⭐ {rating}
                </p>
                <span className="text-gray-500 text-xs sm:text-sm">
                  {formatVotes(item.vote_count)} votes
                </span>
              </div>

              {/* DYNAMIC INFO BASED ON MEDIA TYPE */}
              {mediaType === "movie" ? (
                <>
                  <div>
                    <p className="text-gray-400 text-sm font-medium">RUNTIME</p>
                    <p className="text-xl sm:text-2xl font-bold">
                      {runtime} min
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm font-medium">
                      RELEASE DATE
                    </p>
                    <p className="text-base sm:text-xl font-bold">
                      {releaseDate &&
                        new Date(releaseDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <p className="text-gray-400 text-sm font-medium">SEASONS</p>
                    <p className="text-xl sm:text-2xl font-bold">{seasons}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm font-medium">
                      EPISODES
                    </p>
                    <p className="text-xl sm:text-2xl font-bold">{episodes}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm font-medium">Status</p>
                    <p className="text-xl sm:text-2xl font-bold">{status}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Cast Section */}
        {cast.length > 0 && (
          <div className="mt-12 sm:mt-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 border-l-4 border-yellow-400 pl-4">
              Top Billed Cast
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 sm:gap-6">
              {cast.map((actor) => (
                <div key={actor.cast_id} className="text-center">
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                        : "https://placehold.co/185x278/1f2937/e5e7eb?text=No+Image"
                    }
                    alt={actor.name}
                    className="rounded-lg shadow-md mx-auto transition-transform duration-300 hover:scale-105 w-full"
                    loading="lazy"
                  />
                  <p className="text-white font-semibold mt-2 text-xs sm:text-sm">
                    {actor.name}
                  </p>
                  <p className="text-gray-400 text-[10px] sm:text-xs">
                    {actor.character}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default DetailPage;
