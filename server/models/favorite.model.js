const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  type: { type: String, required: true },
  title: { type: String, required: true },
  poster_path: { type: String },
  runtime: { type: Number },
});

const favoriteSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  movies: [movieSchema],
});

module.exports = mongoose.model("Favorite", favoriteSchema);
