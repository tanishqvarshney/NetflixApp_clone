import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getMoviePoster, handleImageError } from '../../utils/imageUtils';
import MovieModal from '../movies/MovieModal';

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

  if (loading) return <div className="loading">Loading your list...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="watchlist-page" style={{ paddingTop: '100px', minHeight: '100vh', padding: '100px 4% 0' }}>
      <h1 style={{ marginBottom: '30px', fontSize: '2rem' }}>My List</h1>
      
      {movies.length === 0 ? (
        <div className="no-results" style={{ textAlign: 'center', marginTop: '100px' }}>
          <p style={{ color: '#808080', fontSize: '1.2rem' }}>You haven't added anything to your list yet.</p>
          <Link to="/" style={{ color: '#e50914', textDecoration: 'none', marginTop: '20px', display: 'inline-block' }}>Explore Movies</Link>
        </div>
      ) : (
        <div className="movie-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
          gap: '30px 10px' 
        }}>
          {movies.map(movie => (
            <div key={movie._id} className="movie-card" onClick={() => setSelectedMovie({ ...movie, poster: getMoviePoster(movie) })}>
              <div className="movie-poster">
                <img 
                  src={getMoviePoster(movie)} 
                  alt={movie.title} 
                  onError={(e) => handleImageError(e, movie.title)}
                />
                <div className="movie-overlay">
                  <button className="play-icon" onClick={(e) => { e.stopPropagation(); navigate(`/movie/${movie._id}?play=true`); }}>▶</button>
                  <button className="remove-btn" onClick={(e) => { e.stopPropagation(); handleRemove(movie._id); }}>-</button>
                </div>
              </div>
              <div className="movie-info">
                <h3>{movie.title}</h3>
              </div>
            </div>
          ))}
        </div>
      )}

      <MovieModal 
        movie={selectedMovie} 
        onClose={() => setSelectedMovie(null)}
        inWatchlist={true}
        onRemove={handleRemove}
        onPlay={(id) => navigate(`/movie/${id}?play=true`)}
      />
    </div>
  );
};

export default Watchlist;
