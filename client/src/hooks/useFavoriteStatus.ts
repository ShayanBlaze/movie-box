import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { ContentItem } from "../types";

export const useFavoriteStatus = (item: ContentItem | null) => {
  const { user, favorites, addFavorite, removeFavorite } = useAuth();

  const isFavorited = item
    ? favorites.some((fav) => fav.id === item.id)
    : false;

  const toggleFavorite = () => {
    if (!item) return;

    if (!user) {
      toast.error("Please log in to add items to your favorites!");
      return;
    }

    if (isFavorited) {
      removeFavorite(item.id);
    } else {
      const favoriteData = {
        movieId: item.id,
        mediaType: item.media_type || (item.title ? "movie" : "tv"),
      };
      addFavorite(favoriteData);
    }
  };

  return { isFavorited, toggleFavorite };
};
