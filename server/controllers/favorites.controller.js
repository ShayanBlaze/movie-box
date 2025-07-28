const Favorite = require("../models/favorite.model");
const axios = require("axios");

// @desc    get user favorites
// @route   GET /api/favorites
// @access  Private
const getFavorites = async (req, res) => {
  const userFavorites = await Favorite.findOne({ userId: req.user._id });

  if (userFavorites && userFavorites.movies.length > 0) {
    res.status(200).json(userFavorites.movies);
  } else {
    res.status(200).json([]);
  }
};

// @desc    add movie to favorites
// @route   POST /api/favorites
// @access  Private
const addFavorite = async (req, res) => {
  const { movieId, mediaType } = req.body;
  const { _id } = req.user;

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/${mediaType}/${movieId}?api_key=${process.env.TMDB_API_KEY}`
    );
    const movieDetails = response.data;

    const movieData = {
      id: movieDetails.id,
      type: mediaType,
      title: movieDetails.title || movieDetails.name,
      poster_path: movieDetails.poster_path,
      runtime:
        movieDetails.runtime ||
        (movieDetails.episode_run_time ? movieDetails.episode_run_time[0] : 90),
    };

    let userFavorites = await Favorite.findOne({ userId: _id });
    if (userFavorites) {
      const isExisting = userFavorites.movies.some(
        (movie) => movie.id === movieData.id
      );
      if (isExisting) {
        return res.status(400).json({ message: "Movie already in favorites" });
      }
      userFavorites.movies.push(movieData);
    } else {
      userFavorites = new Favorite({ userId: _id, movies: [movieData] });
    }

    await userFavorites.save();
    res.status(201).json(userFavorites.movies);
  } catch (error) {
    console.error("Error in addFavorite controller:", error.message);
    res
      .status(500)
      .json({ message: "Failed to add favorite due to a server error." });
  }
};

// @desc    delete movie from favorites
// @route   DELETE /api/favorites/:movieId
// @access  Private
const removeFavorite = async (req, res) => {
  const { movieId } = req.params;
  const { _id } = req.user;

  try {
    const userFavorites = await Favorite.findOne({ userId: _id });

    if (userFavorites) {
      userFavorites.movies = userFavorites.movies.filter(
        (movie) => movie.id.toString() !== movieId
      );
      await userFavorites.save();
      res.status(200).json(userFavorites.movies);
    } else {
      res.status(404).json({ message: "Favorites not found for this user" });
    }
  } catch (error) {
    console.error("Error in removeFavorite controller:", error.message);
    res
      .status(500)
      .json({ message: "Failed to remove favorite due to a server error." });
  }
};

module.exports = {
  getFavorites,
  addFavorite,
  removeFavorite,
};
