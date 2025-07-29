import React, { FC, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { Link } from "react-router-dom";

const AnimatedNumber: FC<{ value: number }> = ({ value }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  const spring = useSpring(0, {
    damping: 20,
    stiffness: 100,
  });

  const displayValue = useTransform(spring, (currentValue) =>
    Math.round(currentValue)
  );

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  return <motion.span ref={ref}>{displayValue}</motion.span>;
};

export const Dashboard: FC = () => {
  const { favorites } = useAuth();
  const totalMinutes = favorites.reduce(
    (sum, movie) => sum + (movie.runtime || 0),
    0
  );

  const hours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <motion.h1
        variants={itemVariants}
        className="text-4xl font-bold tracking-tighter mb-8"
      >
        Dashboard
      </motion.h1>

      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-br from-yellow-500 to-orange-600 p-8 rounded-2xl shadow-2xl relative overflow-hidden"
        whileHover={{
          scale: 1.03,
          boxShadow: "0px 20px 40px rgba(255, 193, 7, 0.4)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <h3 className="text-lg font-semibold text-white/80 uppercase tracking-widest">
          Total Watchtime
        </h3>
        <p className="text-6xl font-black mt-2 text-white drop-shadow-lg">
          <AnimatedNumber value={hours} />h{" "}
          <AnimatedNumber value={remainingMinutes} />m
        </p>
        <p className="text-white/70 mt-2">
          Based on your {favorites.length} favorited items.
        </p>
        {favorites.length === 0 && (
          <div className="flex justify-center items-center">
            <p className="text-white/70 mt-2">
              How about to make some movies
              <Link to="/profile/favorites">
                <span className="capitalize font-bold text-white">
                  {" "}
                  favorite ?
                </span>
              </Link>
            </p>
          </div>
        )}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full opacity-60"></div>
        <div className="absolute -top-12 -left-16 w-48 h-48 bg-white/10 rounded-full opacity-50"></div>
      </motion.div>

      {favorites.length > 0 && (
        <motion.div variants={itemVariants} className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Recent Favorites</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {favorites.slice(0, 4).map((movie, index) => (
              <motion.div
                key={movie.id}
                className="rounded-lg overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-auto object-cover"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
