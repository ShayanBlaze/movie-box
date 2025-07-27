import { useState, FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Router رو اضافه کردیم
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/UI/Navbar";
import SearchOverlay from "./components/UI/SearchOverlay";
import HomePage from "./components/pages/HomePage";
import ContentGridPage from "./components/pages/ContentGridPage";
import DetailPage from "./components/pages/DetailPage";
import { AuthProvider } from "./context/AuthContext";
import { Dashboard } from "./components/profile/Dashboard";
import { ProfilePage } from "./components/pages/ProfilePage";
import { FavoritesList } from "./components/profile/FavoriteList";

const App: FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  return (
    <AuthProvider>
      <div className="bg-[#0c0c0c]">
        <Navbar onSearchClick={() => setIsSearchOpen(true)} />

        <SearchOverlay
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />

        <ToastContainer theme="dark" position="bottom-right" />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/movies"
            element={
              <ContentGridPage
                title="Popular Movies"
                endpoint="movie/popular"
              />
            }
          />
          <Route
            path="/tv-shows"
            element={
              <ContentGridPage title="Popular TV Shows" endpoint="tv/popular" />
            }
          />
          <Route path="/:mediaType/:id" element={<DetailPage />} />
          <Route path="/profile" element={<ProfilePage />}>
            <Route index element={<Dashboard />} />
            <Route path="favorites" element={<FavoritesList />} />
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
