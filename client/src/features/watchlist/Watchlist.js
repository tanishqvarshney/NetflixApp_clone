import React, { useEffect, useState } from 'react';

const Watchlist = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWatchlist = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('/api/movies/watchlist', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
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
    fetchWatchlist();
  }, []);

  if (loading) return <div>Loading watchlist...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h2>My Watchlist</h2>
      <ul>
        {movies.map(movie => (
          <li key={movie._id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Watchlist;
