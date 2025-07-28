const express = require("express");
const router = express.Router();
const {
  getFavorites,
  addFavorite,
  removeFavorite,
} = require("../controllers/favorites.controller");
const authMiddleware = require("../middleware/auth.middleware");

// all routes require authentication
router.use(authMiddleware);

router.route("/").get(getFavorites).post(addFavorite);

router.route("/:movieId").delete(removeFavorite);

module.exports = router;
