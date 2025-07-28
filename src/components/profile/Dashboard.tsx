// src/components/profile/Dashboard.tsx

import { FC } from "react";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";

export const Dashboard: FC = () => {
  const { favorites } = useAuth();
  const totalMinutes = favorites.reduce(
    (sum, movie) => sum + (movie.runtime || 0),
    0
  );

  const formatRuntime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold tracking-tighter mb-8">Dashboard</h1>

      <motion.div
        className="bg-gradient-to-br from-yellow-500/80 to-orange-600/80 p-8 rounded-2xl shadow-2xl relative overflow-hidden"
        whileHover={{
          scale: 1.02,
          boxShadow: "0px 10px 30px rgba(255, 193, 7, 0.3)",
        }}
      >
        <h3 className="text-lg font-semibold text-white/80 uppercase tracking-widest">
          Total Watchtime
        </h3>
        <p className="text-6xl font-black mt-2 text-white drop-shadow-lg">
          {formatRuntime(totalMinutes)}
        </p>
        <p className="text-white/70 mt-2">
          Based on your favorited movies and shows.
        </p>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full opacity-50"></div>
        <div className="absolute -top-12 -left-16 w-48 h-48 bg-white/10 rounded-full opacity-40"></div>
      </motion.div>
    </motion.div>
  );
};
