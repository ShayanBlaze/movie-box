import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/api";
import { FavoriteMovie } from "../types";

interface User {
  _id: string;
  email: string;
  username: string;
  profilePicture: string;
}

interface AddFavoritePayload {
  movieId: number;
  mediaType: "movie" | "tv";
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  favorites: FavoriteMovie[];
  favoritesLoading: boolean;
  addFavorite: (payload: AddFavoritePayload) => Promise<void>;
  removeFavorite: (movieId: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("userToken")
  );
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);
  const [favoritesLoading, setFavoritesLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem("userToken", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      localStorage.removeItem("userToken");
      delete api.defaults.headers.common["Authorization"];
    }
  }, [token]);

  useEffect(() => {
    const verifyUser = async () => {
      if (token) {
        try {
          const { data } = await api.get("/auth/me");
          setUser(data);
        } catch (error) {
          console.error("Failed to verify user:", error);
          logout();
        }
      }
      setLoading(false);
    };
    verifyUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await api.post("/auth/login", { email, password });
      setUser(data);
      setToken(data.token);
      toast.success("Logged in successfully!");
      navigate("/profile");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
      throw error;
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const { data } = await api.post("/auth/register", {
        username,
        email,
        password,
      });
      setUser(data);
      setToken(data.token);
      toast.success("Registered successfully!");
      navigate("/profile");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed");
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    navigate("/login");
  };

  const getFavorites = async () => {
    if (!user) return;
    setFavoritesLoading(true);
    try {
      const response = await api.get("/favorites");
      setFavorites(response.data);
    } catch (error) {
      console.error("Failed to fetch favorites:", error);
      toast.error("Could not load your favorites.");
    } finally {
      setFavoritesLoading(false);
    }
  };

  const addFavorite = async (payload: AddFavoritePayload) => {
    try {
      await api.post("/favorites", payload);
      toast.success(`Item added to favorites!`);
      await getFavorites();
    } catch (error) {
      console.error("Failed to add favorite:", error);
      toast.error("Failed to add favorite.");
    }
  };

  const removeFavorite = async (movieId: number) => {
    try {
      await api.delete(`/favorites/${movieId}`);
      toast.warn("Item removed from favorites.");
      await getFavorites(); // update the list
    } catch (error) {
      console.error("Failed to remove favorite:", error);
      toast.error("Failed to remove favorite.");
    }
  };

  useEffect(() => {
    if (user || token) {
      getFavorites();
    } else {
      setFavorites([]);
    }
  }, [user, token]);

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    favorites,
    favoritesLoading,
    addFavorite,
    removeFavorite,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
