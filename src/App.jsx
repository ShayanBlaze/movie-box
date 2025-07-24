import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/UI/Navbar";
import SearchOverlay from "./components/UI/SearchOverlay";
import HomePage from "./components/pages/HomePage";
import MoviesPage from "./components/pages/MoviesPage";
import TvShowsPage from "./components/pages/TvShowsPage";
import MovieDetailPage from "./components/pages/MovieDetailPage";
import TvShowDetailPage from "./components/pages/TvShowDetailPage";

const App = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="bg-[#0c0c0c]">
      <Navbar onSearchClick={() => setIsSearchOpen(true)} />

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Toast Container */}
      <ToastContainer />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/tv-shows" element={<TvShowsPage />} />
        <Route path="/movie/:movieId" element={<MovieDetailPage />} />
        <Route path="/tv/:tvId" element={<TvShowDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
