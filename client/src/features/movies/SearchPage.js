import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MovieCard from '../../components/MovieCard/MovieCard';
import { getMoviePoster } from '../../utils/imageUtils';

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();

  const performSearch = useCallback(async (query) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const token = localStorage.getItem('token');
      // Using existing backend search but adding frontend secondary check if needed
      const res = await fetch(`/api/movies/search?q=${encodeURIComponent(trimmedQuery)}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!res.ok) throw new Error('Search failed. Please try again.');

      const data = await res.json();
      
      // Filter movies based on title OR name (as per requirement)
      const filtered = data.filter(m => 
        (m.title && m.title.toLowerCase().includes(trimmedQuery.toLowerCase())) ||
        (m.name && m.name.toLowerCase().includes(trimmedQuery.toLowerCase()))
      );

      setSearchResults(filtered);
    } catch (err) {
      setError(err.message);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) performSearch(searchQuery);
      else {
        setSearchResults([]);
        setHasSearched(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, performSearch]);

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setHasSearched(false);
  };

  return (
    <div className="search-page-premium">
      <div className="search-hero">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="search-hero-content"
        >
          <h1>Find your next favorite</h1>
          <p>Search for movies, TV shows, and more...</p>
          
          <div className="search-bar-container">
            <div className="search-input-field">
              <span className="search-bar-icon" onClick={() => performSearch(searchQuery)} style={{ cursor: 'pointer' }}>🔍</span>

              <input
                type="text"
                placeholder="Titles, people, genres..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (!e.target.value) navigate('/');
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') performSearch(searchQuery);
                }}
                autoFocus
              />

              {searchQuery && (
                <button className="search-clear-btn" onClick={clearSearch}>✕</button>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="search-content-area">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="search-status-box"
            >
              <div className="netflix-spinner"></div>
            </motion.div>
          ) : error ? (
            <motion.div 
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="search-status-box error"
            >
              <span className="error-icon">⚠️</span>
              <h2>Something went wrong</h2>
              <p>{error}</p>
              <button onClick={() => performSearch(searchQuery)} className="premium-btn-red">Retry</button>
            </motion.div>
          ) : hasSearched ? (
            <motion.div 
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="search-results-wrapper"
            >
              {searchResults.length > 0 ? (
                <>
                  <div className="results-header">
                    <span>Movies & TV Shows found: {searchResults.length}</span>
                  </div>
                  <div className="premium-grid">
                    {searchResults.map((movie) => (
                      <MovieCard 
                        key={movie._id} 
                        movie={movie} 
                        onSelect={(m) => navigate(`/movie/${m._id}`)}
                        onAdd={() => {}} // Handle watchlist here if needed
                        onRemove={() => {}}
                        inWatchlist={false}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="no-results-premium">
                  <div className="no-results-art">🎬</div>
                  <h2>No results found for "{searchQuery}"</h2>
                  <p>Try different keywords or check out something new.</p>

                </div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="search-placeholder-premium"
            >
              <h3>Popular searches</h3>
              <div className="suggestion-pill-row">
                {['Action', 'Thriller', 'Animation', 'Interstellar', 'The Dark Knight'].map(tag => (
                  <button key={tag} className="suggestion-pill" onClick={() => setSearchQuery(tag)}>
                    {tag}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default SearchPage;

