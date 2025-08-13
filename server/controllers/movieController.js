const Movie = require('../models/Movie');
const User = require('../models/User');

// Admin: Create a new movie
exports.createMovie = async (req, res) => {
  try {
    const { title, description, genre, year, image, video } = req.body;
    const movie = new Movie({
      title,
      description,
      genre,
      year,
      image,
      video,
      createdBy: req.user._id,
    });
    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: Update a movie
exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: Delete a movie
exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json({ message: 'Movie deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// User: Get all movies
exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// User: Get a single movie by ID
exports.getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// User: Add movie to watchlist
exports.addToWatchlist = async (req, res) => {
  try {
    const { movieId } = req.params;
    const userId = req.user._id;

    // Check if movie exists
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    // Add movie to user's watchlist
    const user = await User.findById(userId);
    if (!user.watchlist.includes(movieId)) {
      user.watchlist.push(movieId);
      await user.save();
    }

    res.json({ message: 'Movie added to watchlist', movie });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// User: Remove movie from watchlist
exports.removeFromWatchlist = async (req, res) => {
  try {
    const { movieId } = req.params;
    const userId = req.user._id;

    // Remove movie from user's watchlist
    const user = await User.findById(userId);
    user.watchlist = user.watchlist.filter(id => id.toString() !== movieId);
    await user.save();

    res.json({ message: 'Movie removed from watchlist' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// User: Get user's watchlist
exports.getWatchlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate('watchlist');
    
    res.json(user.watchlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
