const express = require('express');
const router = express.Router();
const {
  createMovie,
  updateMovie,
  deleteMovie,
  getMovies,
  getMovie,
} = require('../controllers/movieController');
const { protect, admin } = require('../middleware/auth');

// Admin routes
router.post('/', protect, admin, createMovie);
router.put('/:id', protect, admin, updateMovie);
router.delete('/:id', protect, admin, deleteMovie);

// User routes
router.get('/', getMovies);
router.get('/:id', getMovie);

module.exports = router;
