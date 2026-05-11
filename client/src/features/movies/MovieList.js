import React, { useEffect, useState, useRef } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import MovieModal from './MovieModal';
import Skeleton from '../../components/Skeleton';
import MovieCard from '../../components/MovieCard/MovieCard';
import { getMoviePoster, getMovieBackdrop, handleImageError } from '../../utils/imageUtils';


const MovieList = ({ profile, contentType }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [watchlist, setWatchlist] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch('/api/movies/');
        const data = await res.json();
        console.log('[DEBUG] Movies API Response:', data);
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

  useEffect(() => {
    const loadWatchlist = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const res = await fetch('/api/movies/watchlist', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          console.log('[DEBUG] Watchlist API Response:', data);
          setWatchlist(data.map(movie => movie._id));
        }
      } catch (err) {
        console.error('Failed to load watchlist:', err);
      }
    };
    loadWatchlist();
  }, []);

  const handleAdd = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const res = await fetch(`/api/movies/${id}/watchlist`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });
      if (res.ok) setWatchlist(prev => [...prev, id]);
    } catch (err) { console.error(err); }
  };

  const handleRemove = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const res = await fetch(`/api/movies/${id}/watchlist`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });
      if (res.ok) setWatchlist(prev => prev.filter(mid => mid !== id));
    } catch (err) { console.error(err); }
  };




  if (loading) return (
    <div className="netflix-home">
      <Skeleton type="hero" />
      <div className="movie-rows" style={{ marginTop: '-100px', position: 'relative', zIndex: '2' }}>
        {[1, 2, 3].map(row => (
          <div key={row} className="movie-row">
            <div className="row-title skeleton-title" style={{ width: '200px', height: '30px', background: '#2a2a2a' }}></div>
            <div className="movie-slider">
              {[1, 2, 3, 4, 5, 6].map(card => <Skeleton key={card} type="movie" />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const filteredMovies = contentType 
    ? movies.filter(m => m.type === contentType)
    : movies;

  const boredonBusters = filteredMovies.filter(m => m.isTop10);
  const continueWatching = filteredMovies.filter(m => m.progress);
  const youngAdult = filteredMovies.filter(m => m.genre === 'Young Adult');
  const trendingNow = filteredMovies.filter(m => !m.isTop10 && !m.progress && m.genre !== 'Young Adult');
  
  const featuredMovie = contentType === 'movie'
    ? (filteredMovies.find(m => m.title === 'Dune: Part Two') || filteredMovies[0])
    : (contentType === 'tvshow' 
        ? (filteredMovies.find(m => m.title === 'The Witcher') || filteredMovies[0])
        : (filteredMovies.find(m => m.title === 'Game of Thrones') || filteredMovies[0]));

  const MovieRow = ({ title, items }) => {
    const rowRef = useRef(null);

    const scroll = (direction) => {
      if (rowRef.current) {
        const { scrollLeft, clientWidth } = rowRef.current;
        const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
        rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
      }
    };

    return (
      <div className="movie-row-container-premium">
        <h2 className="row-title-premium">{title}</h2>
        <div className="slider-wrapper-premium">
          <button className="slider-arrow left" onClick={() => scroll('left')}>‹</button>
          <div className="movie-slider-premium" ref={rowRef}>
            {items.map(m => (
              <MovieCard 
                key={m._id} 
                movie={m} 
                onSelect={(movie) => setSelectedMovie({ ...movie, poster: getMoviePoster(movie) })}
                onAdd={handleAdd}
                onRemove={handleRemove}
                inWatchlist={watchlist.includes(m._id)}
              />
            ))}
          </div>
          <button className="slider-arrow right" onClick={() => scroll('right')}>›</button>
        </div>
      </div>
    );
  };



  return (
    <div className="netflix-home">
      {featuredMovie && (
        <div className="hero-section" style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8)), url('${getMovieBackdrop(featuredMovie)}')`
        }}>
          <div className="hero-content">
            <h1 className="hero-title">{featuredMovie.title}</h1>
            <p className="hero-description">{featuredMovie.description}</p>
            <div className="hero-buttons">
              <button className="play-btn" onClick={() => navigate(`/movie/${featuredMovie._id}?play=true`)}>▶ Play</button>
              <button className="info-btn" onClick={() => setSelectedMovie({ ...featuredMovie, poster: getMoviePoster(featuredMovie) })}>ℹ More Info</button>
            </div>
          </div>
        </div>
      )}

      <div className="movie-rows-container">
        {boredonBusters.length > 0 && <MovieRow title={contentType === 'tvshow' ? "Top TV Shows" : (contentType === 'movie' ? "Top Movies" : "Boredom Busters")} items={boredonBusters} />}
        {continueWatching.length > 0 && <MovieRow title={`Continue Watching for ${profile?.name || 'User'}`} items={continueWatching} />}
        {youngAdult.length > 0 && <MovieRow title={contentType === 'tvshow' ? "Young Adult TV Shows" : (contentType === 'movie' ? "Young Adult Movies" : "Young Adult Movies & Shows")} items={youngAdult} />}
        {trendingNow.length > 0 && <MovieRow title="Today's Top Picks for You" items={trendingNow} />}
      </div>


      <MovieModal 
        movie={selectedMovie} 
        onClose={() => setSelectedMovie(null)}
        inWatchlist={selectedMovie && watchlist.includes(selectedMovie._id)}
        onAdd={handleAdd}
        onRemove={handleRemove}
        onPlay={(id) => navigate(`/movie/${id}?play=true`)}
      />
    </div>
  );
};

export default MovieList;
