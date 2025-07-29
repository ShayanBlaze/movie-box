require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler.middleware");

const authRouter = require("./routes/auth.routes");
const favoritesRouter = require("./routes/favorite.routes");

const app = express();

// domain whitelist
const allowedOrigins = [
  "https://movie-ahusb4btw-shayans-projects-2cbd416c.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
];

// cors options
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "Welcome to the MovieBox API! 🍿" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/favorites", favoritesRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`✅ Server is running on port ${PORT}`));
  } catch (error) {
    console.error("❌ Failed to connect to the database:", error);
    process.exit(1);
  }
};

startServer();
