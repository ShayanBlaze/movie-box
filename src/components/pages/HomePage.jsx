import Hero from "../UI/Hero";
import MovieCarousel from "../UI/MovieCarousel";

const HomePage = () => {
  return (
    <div className="bg-[#0c0c0c] text-white overflow-x-hidden">
      {/* The Hero section will feature one of the popular movies */}
      <Hero endpoint="movie/popular" />

      <main className="py-8 sm:py-12 px-4 sm:px-8 lg:px-12 space-y-16">
        {/* Different carousels for different categories */}
        <MovieCarousel title="Now Playing" endpoint="movie/now_playing" />
        <MovieCarousel title="Top Rated Movies" endpoint="movie/top_rated" />
        <MovieCarousel title="Top Rated TV Shows" endpoint="tv/top_rated" />
        <MovieCarousel title="Upcoming Releases" endpoint="movie/upcoming" />
        <MovieCarousel
          title="Trending This Week"
          endpoint="trending/movie/week"
        />
      </main>
    </div>
  );
};

export default HomePage;
