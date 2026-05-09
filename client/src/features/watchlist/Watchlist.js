import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getMoviePoster } from '../../utils/imageUtils';
import MovieModal from '../movies/MovieModal';
import MovieCard from '../../components/MovieCard/MovieCard';
import './Watchlist.css';

const Watchlist = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const navigate = useNavigate();

  const fetchWatchlist = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Not authenticated');
      
      const res = await fetch('/api/movies/watchlist', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch watchlist');
      setMovies(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const handleRemove = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/movies/${id}/watchlist`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setMovies(prev => prev.filter(m => m._id !== id));
      }
    } catch (err) {
      console.error('Failed to remove from watchlist:', err);
    }
  };

  const handlePlay = (id) => {
    navigate(`/movie/${id}?play=true`);
  };

  if (loading) return <div className="loading"><div className="netflix-spinner"></div></div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="watchlist-container">
      <div className="watchlist-header">
        <h1>My List</h1>
      </div>
      
      <AnimatePresence mode="wait">
        {movies.length === 0 ? (
          <motion.div 
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="no-results-container"
          >
            <div className="no-results-icon" style={{ fontSize: '4rem', marginBottom: '20px' }}>📋</div>
            <p className="no-results-text">You haven't added anything to your list yet. Start exploring to build your collection!</p>
            <Link to="/" className="explore-btn">Explore Movies</Link>
          </motion.div>
        ) : (
          <motion.div 
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="watchlist-grid"
          >
            {movies.map(movie => (
              <MovieCard 
                key={movie._id} 
                movie={movie} 
                onSelect={(m) => setSelectedMovie({ ...m, poster: getMoviePoster(m) })}
                onRemove={handleRemove}
                inWatchlist={true}
                onAdd={() => {}} // Not needed here as it's already in watchlist
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <MovieModal 
        movie={selectedMovie} 
        onClose={() => setSelectedMovie(null)}
        inWatchlist={true}
        onRemove={handleRemove}
        onPlay={handlePlay}
        onAdd={() => {}}
      />
    </div>
  );
};

export default Watchlist;
