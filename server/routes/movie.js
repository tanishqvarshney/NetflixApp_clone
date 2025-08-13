const express = require('express');
const router = express.Router();
const {
  createMovie,
  updateMovie,
  deleteMovie,
  getMovies,
  getMovie,
  addToWatchlist,
  removeFromWatchlist,
  getWatchlist,
} = require('../controllers/movieController');
const { protect, admin } = require('../middleware/auth');

// Admin routes
router.post('/', protect, admin, createMovie);
router.put('/:id', protect, admin, updateMovie);
router.delete('/:id', protect, admin, deleteMovie);

// User routes
router.get('/', getMovies);

// Watchlist routes - MUST come before /:id route
router.get('/watchlist', protect, getWatchlist);
router.post('/:movieId/watchlist', protect, addToWatchlist);
router.delete('/:movieId/watchlist', protect, removeFromWatchlist);

// Movie detail route - MUST come after watchlist routes
router.get('/:id', getMovie);

module.exports = router;
