import { useEffect, useState, FC } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import MovieDetailSkeleton from "../UI/MovieDetailSkeleton";
import { formatVotes } from "../../utils/formatter";

import type { DetailItem, CastMember, Genre } from "../../types";

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
      <div className="relative w-full h-[50vh] sm:h-[65vh]">
        <div className="absolute inset-0">
          <img
            src={backdropUrl}
            alt=""
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/60 to-transparent"></div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-8 pb-24 -mt-24 sm:-mt-48 lg:-mt-56">
        <div className="md:flex md:items-start md:space-x-10">
          {/* Poster */}
          <motion.div
            className="w-48 sm:w-64 mx-auto md:mx-0 shrink-0"
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
          <div className="mt-6 md:mt-12 text-white mx-4">
            <h1 className="text-3xl lg:text-5xl font-black tracking-tight">
              {displayName}
            </h1>
            {tagline && (
              <p className="text-lg text-gray-400 mt-2 italic">"{tagline}"</p>
            )}

            <div className="flex flex-wrap gap-2 mt-5">
              {item.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-gray-800 text-gray-300 px-3 py-1 text-sm rounded-full"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <p className="mt-6 text-gray-300 leading-relaxed max-w-3xl">
              {item.overview}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-4 mt-8 text-left sm:text-center">
              {/* RATING */}
              <div>
                <p className="text-gray-400 text-sm font-medium">RATING</p>
                <p className="text-xl sm:text-2xl font-bold text-yellow-400 flex items-center gap-2 justify-start sm:justify-center">
                  ⭐ {rating}
                  <span className="text-gray-500 text-sm">/ 10</span>
                </p>
                <span className="text-gray-500 text-sm">
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
                    <p className="text-xl sm:text-2xl font-bold">
                      {releaseDate &&
                        new Date(releaseDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
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
                    <p className="text-gray-400 text-sm font-medium">
                      FIRST AIR DATE
                    </p>
                    <p className="text-xl sm:text-2xl font-bold">
                      {releaseDate &&
                        new Date(releaseDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                    </p>
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
          <div className="mt-16 sm:mt-20">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-yellow-400 pl-4">
              Top Billed Cast
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-8">
              {cast.map((actor) => (
                <div key={actor.cast_id} className="text-center">
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                        : "https://placehold.co/185x278/1f2937/e5e7eb?text=No+Image"
                    }
                    alt={actor.name}
                    className="rounded-lg shadow-lg mx-auto transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                  <p className="text-white font-semibold mt-3 text-sm">
                    {actor.name}
                  </p>
                  <p className="text-gray-400 text-xs">{actor.character}</p>
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
