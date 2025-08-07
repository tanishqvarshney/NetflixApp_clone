import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch('/api/movie/');
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch movies');
        setMovies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const handleAdd = async (id) => {
    try {
      await fetch(`/api/movie/${id}/watchlist`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setWatchlist(prev => [...prev, id]);
    } catch {}
  };

  const handleRemove = async (id) => {
    try {
      await fetch(`/api/movie/${id}/watchlist`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setWatchlist(prev => prev.filter(mid => mid !== id));
    } catch {}
  };

  if (loading) return <div>Loading movies...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h2>Movies</h2>
      <ul>
        {movies.map(movie => (
          <li key={movie._id}>
            <Link to={`/movie/${movie._id}`}>{movie.title}</Link>
            {watchlist.includes(movie._id) ? (
              <button onClick={() => handleRemove(movie._id)}>Remove from Watchlist</button>
            ) : (
              <button onClick={() => handleAdd(movie._id)}>Add to Watchlist</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
