import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from "firebase/auth";
import { toast } from "react-toastify";
import { mockFavorites, FavoriteMovie } from "../data/mockFavorites";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  favorites: FavoriteMovie[];
  addFavorite: (movie: FavoriteMovie) => void;
  removeFavorite: (movieId: number) => void;
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);

      toast.success("Logged in successfully!");
    } catch (error) {
      console.error("Authentication error:", error);
      toast.error("Failed to log in.");
    }
  };

  const logout = () => {
    toast.info(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to log out?</p>
          <div className="flex gap-2 mt-2">
            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => {
                signOut(auth)
                  .then(() => {
                    setUser(null);
                    toast.success("Logged out successfully");
                  })
                  .catch((error) => {
                    console.error("Sign out error:", error);
                    toast.error("Failed to log out.");
                  });
                closeToast();
              }}
            >
              Yes
            </button>
            <button
              className="bg-gray-300 text-black px-3 py-1 rounded"
              onClick={closeToast}
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const [favorites, setFavorites] = useState<FavoriteMovie[]>(mockFavorites);

  const addFavorite = (movie: FavoriteMovie) => {
    if (favorites.find((fav) => fav.id === movie.id)) {
      toast.info(`${movie.title} is already in your favorites!`);
      return;
    }
    setFavorites((prevFavorites) => [...prevFavorites, movie]);
    toast.success(`${movie.title} added to favorites!`);
  };

  const removeFavorite = (movieId: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.id !== movieId)
    );
    toast.warn(`Item removed from favorites.`);
  };

  const value: AuthContextType = {
    user,
    loading,
    loginWithGoogle,
    logout,
    favorites,
    addFavorite,
    removeFavorite,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
