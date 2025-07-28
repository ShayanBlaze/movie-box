import { FC, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

export const RegisterPage: FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    try {
      await register(username, email, password);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <motion.form
        layout
        onSubmit={handleSubmit}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="p-8 bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-md border border-white/10"
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl font-bold text-white mb-8 text-center tracking-tighter"
        >
          Create Your Account
        </motion.h2>

        {/* فیلد نام کاربری */}
        <motion.div variants={itemVariants} className="relative mb-6">
          <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 pl-12 bg-gray-700/50 rounded-lg text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all peer"
            required
            placeholder="Username"
          />
          <label
            htmlFor="username"
            className="absolute left-12 -top-2.5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-yellow-400 peer-focus:text-sm"
          >
            Username
          </label>
        </motion.div>

        {/* فیلد ایمیل */}
        <motion.div variants={itemVariants} className="relative mb-6">
          <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 pl-12 bg-gray-700/50 rounded-lg text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all peer"
            required
            placeholder="Email"
          />
          <label
            htmlFor="email"
            className="absolute left-12 -top-2.5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-yellow-400 peer-focus:text-sm"
          >
            Email
          </label>
        </motion.div>

        {/* فیلد رمز عبور */}
        <motion.div variants={itemVariants} className="relative mb-6">
          <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 pl-12 bg-gray-700/50 rounded-lg text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all peer"
            required
            placeholder="Password"
          />
          <label
            htmlFor="password"
            className="absolute left-12 -top-2.5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-yellow-400 peer-focus:text-sm"
          >
            Password
          </label>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </motion.div>

        {/* فیلد تایید رمز عبور */}
        <motion.div variants={itemVariants} className="relative mb-8">
          <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            // در صورت عدم تطابق، می‌توانیم رنگ border را قرمز کنیم
            className={`w-full p-3 pl-12 bg-gray-700/50 rounded-lg text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all peer ${
              confirmPassword && password !== confirmPassword
                ? "ring-2 ring-red-500"
                : ""
            }`}
            required
            placeholder="Confirm Password"
          />
          <label
            htmlFor="confirmPassword"
            className="absolute left-12 -top-2.5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-yellow-400 peer-focus:text-sm"
          >
            Confirm Password
          </label>
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </motion.div>

        <motion.button
          variants={itemVariants}
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-yellow-500 text-black font-bold py-3 rounded-lg hover:bg-yellow-600 transition-colors shadow-lg shadow-yellow-500/20"
        >
          Register
        </motion.button>
        <motion.p
          variants={itemVariants}
          className="text-center text-gray-400 mt-6"
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-yellow-400 hover:underline font-semibold"
          >
            Login
          </Link>
        </motion.p>
      </motion.form>
    </div>
  );
};
