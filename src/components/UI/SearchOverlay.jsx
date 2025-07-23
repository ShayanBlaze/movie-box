import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDebounce } from "../../hooks/useDebounce";
import { Link } from "react-router-dom"; // <-- وارد کردن Link

const SearchOverlay = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 500);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    if (debouncedQuery) {
      setLoading(true);
      const searchMulti = async () => {
        try {
          // **استفاده از جستجوی چندگانه برای یافتن فیلم و سریال**
          const response = await fetch(
            `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${debouncedQuery}`
          );
          const data = await response.json();
          // فیلتر کردن نتایجی که فیلم یا سریال نیستند (مثلا بازیگران)
          setResults(
            data.results.filter(
              (item) => item.media_type === "movie" || item.media_type === "tv"
            )
          );
        } catch (error) {
          console.error("Search error:", error);
        } finally {
          setLoading(false);
        }
      };
      searchMulti();
    } else {
      setResults([]);
    }
  }, [debouncedQuery, apiKey]);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col items-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl mt-12"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ... (بخش input بدون تغییر) ... */}
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a movie or TV show..."
                autoFocus
                className="w-full bg-gray-700/50 text-white text-2xl placeholder-gray-400 rounded-full py-4 px-6 pr-16 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button
                onClick={onClose}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* **بخش نتایج جستجو (اصلاح شده)** */}
            <div className="mt-6 max-h-[60vh] overflow-y-auto space-y-3">
              {loading && (
                <p className="text-center text-gray-400">Searching...</p>
              )}
              {results.map((item) => {
                const linkPath =
                  item.media_type === "movie"
                    ? `/movie/${item.id}`
                    : `/tv/${item.id}`;
                const displayName = item.title || item.name;
                const displayDate = item.release_date || item.first_air_date;

                return (
                  // **هر نتیجه یک لینک است که با کلیک، صفحه جستجو را می‌بندد**
                  <Link key={item.id} to={linkPath} onClick={onClose}>
                    <div className="bg-gray-800/70 rounded-lg p-3 flex items-center gap-4 hover:bg-gray-700 transition-colors">
                      <img
                        src={
                          item.poster_path
                            ? `https://image.tmdb.org/t/p/w92${item.poster_path}`
                            : "https://placehold.co/92x138/1f2937/e5e7eb?text=N/A"
                        }
                        alt={displayName}
                        className="w-16 h-24 object-cover rounded"
                      />
                      <div className="flex-grow">
                        <h3 className="text-white font-bold">{displayName}</h3>
                        <p className="text-gray-400 text-sm">
                          {displayDate?.substring(0, 4)}
                        </p>
                      </div>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          item.media_type === "movie"
                            ? "bg-blue-500/50 text-blue-200"
                            : "bg-green-500/50 text-green-200"
                        }`}
                      >
                        {item.media_type === "movie" ? "Movie" : "TV"}
                      </span>
                    </div>
                  </Link>
                );
              })}
              {debouncedQuery && !loading && results.length === 0 && (
                <p className="text-center text-gray-400">
                  No results found for "{debouncedQuery}"
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
