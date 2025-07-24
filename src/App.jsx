import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from './components/UI/Navbar'
import SearchOverlay from "./components/UI/SearchOverlay";
import HomePage from "./components/pages/HomePage";
import ContentGridPage from "./components/pages/ContentGridPage";
import DetailPage from "./components/pages/DetailPage";

const App = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="bg-[#0c0c0c]">
      {/* <Navbar onSearchClick={() => setIsSearchOpen(true)} /> */}
      <Navbar />

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Toast Container */}
      <ToastContainer />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/movies"
          element={
            <ContentGridPage title="Popular Movies" endpoint="movie/popular" />
          }
        />
        <Route
          path="/tv-shows"
          element={
            <ContentGridPage title="Popular TV Shows" endpoint="tv/popular" />
          }
        />
        <Route path="/:mediaType/:id" element={<DetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
