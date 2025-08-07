import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [watchlist, setWatchlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch('/api/movies/');
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

  // Load user's watchlist on component mount
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
      if (!token) {
        alert('Please login to add movies to your watchlist');
        return;
      }
      
      const res = await fetch(`/api/movies/${id}/watchlist`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (res.ok) {
        setWatchlist(prev => [...prev, id]);
        alert('Movie added to My List!');
      } else {
        const errorData = await res.json();
        alert(errorData.message || 'Failed to add movie to My List');
      }
    } catch (err) {
      console.error('Error adding to watchlist:', err);
      alert('Error adding to My List');
    }
  };

  const handleRemove = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to remove movies from your watchlist');
        return;
      }
      
      const res = await fetch(`/api/movies/${id}/watchlist`, {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (res.ok) {
        setWatchlist(prev => prev.filter(mid => mid !== id));
        alert('Movie removed from My List!');
      } else {
        const errorData = await res.json();
        alert(errorData.message || 'Failed to remove movie from My List');
      }
    } catch (err) {
      console.error('Error removing from watchlist:', err);
      alert('Error removing from My List');
    }
  };

  const handlePlayMovie = (movieId) => {
    // Navigate to movie details page with video player
    navigate(`/movie/${movieId}?play=true`);
  };

  const handleMoreInfo = (movieId) => {
    // Navigate to movie details page
    navigate(`/movie/${movieId}`);
  };

  const getMoviesByGenre = (genre) => {
    return movies.filter(movie => movie.genre === genre);
  };

  const getFeaturedMovie = () => {
    return movies.find(movie => movie.rating >= 8.5) || movies[0];
  };

  // Function to get movie poster URL based on title
  const getMoviePoster = (title) => {
    const posterUrls = {
      // Action Movies
      'The Dark Knight': 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
      'Inception': 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
      'The Matrix': 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
      'Interstellar': 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
      'The Avengers': 'https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg',
      'Goodfellas': 'https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg',
      'The Silence of the Lambs': 'https://image.tmdb.org/t/p/w500/rplLJ2hPcOQmkFhTqUte0MkEaO2.jpg',
      'The Green Mile': 'https://image.tmdb.org/t/p/w500/velWPhVMQeQKcxggNEU8YmIo52R.jpg',
      'Schindler\'s List': 'https://image.tmdb.org/t/p/w500/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg',
      
      // Drama Movies
      'The Shawshank Redemption': 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
      'The Godfather': 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
      'Pulp Fiction': 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
      'Fight Club': 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
      'Forrest Gump': 'https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg',
      'Titanic': 'https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg',
      'The Lion King': 'https://image.tmdb.org/t/p/w500/2bXbqYdUdNVa8VIWXVfclP2ICtT.jpg',
      
      // Comedy Movies
      'The Grand Budapest Hotel': 'https://image.tmdb.org/t/p/w500/eWdyYQreja6JGCzqHWXpWHDrrOph.jpg',
      'La La Land': 'https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg',
      'The Big Lebowski': 'https://image.tmdb.org/t/p/w500/aHaVjVoXeNanfwUwQ92SG7tosFM.jpg',
      'Groundhog Day': 'https://image.tmdb.org/t/p/w500/gCgt1WARPZaXnLcz0Scth43T6x0.jpg',
      'The Princess Bride': 'https://image.tmdb.org/t/p/w500/6VC0a1hOw5dJQrByuMitAy18zF5.jpg',
      'Superbad': 'https://image.tmdb.org/t/p/w500/4i6ZNuiLok7fXQwv1bV9e3Z5N0D.jpg',
      'Bridesmaids': 'https://image.tmdb.org/t/p/w500/6tVYTlBA0lzF4SZz1eJZ1NpfCz3.jpg',
      'The Hangover': 'https://image.tmdb.org/t/p/w500/ulXLoaL9Mn6NyaipxOZ7yyEQqEL.jpg',
      'Shaun of the Dead': 'https://image.tmdb.org/t/p/w500/1nUL8a1xcM6ATkP0CkzBm51PQqZ.jpg',
      'Office Space': 'https://image.tmdb.org/t/p/w500/2yus0ytNKjpN5aoO85WooVeGqGL.jpg',
      
      // Sci-Fi Movies
      'Blade Runner': 'https://image.tmdb.org/t/p/w500/63N9uy8nd9j7Eog2YPQihWJU6QZ.jpg',
      'Back to the Future': 'https://image.tmdb.org/t/p/w500/fNOH9f1aA7XRTzl1sAOx9iF553Q.jpg',
      'E.T. the Extra-Terrestrial': 'https://image.tmdb.org/t/p/w500/an0nD6uq6byfxCfk1pe92Sw3VPX.jpg',
      'Jurassic Park': 'https://image.tmdb.org/t/p/w500/oU7Oq2kFAAlGqbU4VoAE36g4hoI.jpg',
      'The Terminator': 'https://image.tmdb.org/t/p/w500/qvktm0BHcnmDpul4Hz01GIazWPr.jpg',
      '2001: A Space Odyssey': 'https://image.tmdb.org/t/p/w500/ve72VxNqjGM69Uky4WTo2becNhR.jpg',
      'Close Encounters of the Third Kind': 'https://image.tmdb.org/t/p/w500/9n5e1vToDVnqz3hW10Jdlvmzpo0.jpg',
      'The Empire Strikes Back': 'https://image.tmdb.org/t/p/w500/2l05cFWJacyIsTpsqSgH0wQXe4V.jpg',
      'Raiders of the Lost Ark': 'https://image.tmdb.org/t/p/w500/ceG9VTiRAcyoahDp1e8WSX5U7mJ.jpg',
      'Indiana Jones and the Last Crusade': 'https://image.tmdb.org/t/p/w500/7k2gFZ8Pjeb69lmB7O3aej0Cl8g.jpg',
      
      // Horror Movies
      'The Shining': 'https://image.tmdb.org/t/p/w500/9fgh3Ns1iRzlQNYuJyK0ARQZU7w.jpg',
      'Alien': 'https://image.tmdb.org/t/p/w500/vfrQk5IPloGg1v9Rzbh2Eg3VGyH.jpg',
      'The Thing': 'https://image.tmdb.org/t/p/w500/tzGY49kseSE9QAKk47uuDGwnSCu.jpg',
      'Halloween': 'https://image.tmdb.org/t/p/w500/aO9Nnv9GdwiPdkNO79TISlQ5bbG.jpg',
      'The Exorcist': 'https://image.tmdb.org/t/p/w500/4ucLGcXVVSVnsfkGtbLY4XAiusC.jpg',
      'A Nightmare on Elm Street': 'https://image.tmdb.org/t/p/w500/wSzpkawnD5lDv9yZP4kqDP3ZfMk.jpg',
      'Jaws': 'https://image.tmdb.org/t/p/w500/l1ylTVz4a9FzUI8iK3P4jW9wz2t.jpg',
      'Scream': 'https://image.tmdb.org/t/p/w500/3O3klyyYpAZBBE4n7IngzTomRDp.jpg',
      'Psycho': 'https://image.tmdb.org/t/p/w500/81d8oyEFj7L8XKHZ5NLi1M3B7rz.jpg',
      'The Sixth Sense': 'https://image.tmdb.org/t/p/w500/4TFCA5Lm5miseV3Wy02yxurEQL.jpg'
    };
    
    return posterUrls[title] || `https://via.placeholder.com/300x450/000000/FFFFFF?text=${encodeURIComponent(title)}`;
  };

  if (loading) return <div className="loading">Loading movies...</div>;
  if (error) return <div className="error">{error}</div>;

  const featuredMovie = getFeaturedMovie();
  const actionMovies = getMoviesByGenre('Action');
  const dramaMovies = getMoviesByGenre('Drama');
  const comedyMovies = getMoviesByGenre('Comedy');
  const scifiMovies = getMoviesByGenre('Sci-Fi');
  const horrorMovies = getMoviesByGenre('Horror');

  return (
    <div className="netflix-home">
      {/* Hero Section */}
      {featuredMovie && (
        <div className="hero-section" style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8)), url('${getMoviePoster(featuredMovie.title)}')`
        }}>
          <div className="hero-content">
            <h1 className="hero-title">{featuredMovie.title}</h1>
            <p className="hero-description">{featuredMovie.description}</p>
            <div className="hero-buttons">
              <button 
                className="play-btn" 
                onClick={() => handlePlayMovie(featuredMovie._id)}
              >
                ▶ Play
              </button>
              <button 
                className="info-btn" 
                onClick={() => handleMoreInfo(featuredMovie._id)}
              >
                ℹ More Info
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Movie Rows */}
      <div className="movie-rows">
        {actionMovies.length > 0 && (
          <div className="movie-row">
            <h2 className="row-title">Action Movies</h2>
            <div className="movie-slider">
              {actionMovies.map(movie => (
                <div key={movie._id} className="movie-card">
                  <Link to={`/movie/${movie._id}`}>
                    <div className="movie-poster">
                      <img src={getMoviePoster(movie.title)} alt={movie.title} />
                      <div className="movie-overlay">
                        <button className="play-icon">▶</button>
                        {watchlist.includes(movie._id) ? (
                          <button onClick={(e) => { e.preventDefault(); handleRemove(movie._id); }} className="remove-btn">-</button>
                        ) : (
                          <button onClick={(e) => { e.preventDefault(); handleAdd(movie._id); }} className="add-btn">+</button>
                        )}
                      </div>
                    </div>
                  </Link>
                  <div className="movie-info">
                    <h3>{movie.title}</h3>
                    <p className="movie-rating">⭐ {movie.rating}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {dramaMovies.length > 0 && (
          <div className="movie-row">
            <h2 className="row-title">Drama Movies</h2>
            <div className="movie-slider">
              {dramaMovies.map(movie => (
                <div key={movie._id} className="movie-card">
                  <Link to={`/movie/${movie._id}`}>
                    <div className="movie-poster">
                      <img src={getMoviePoster(movie.title)} alt={movie.title} />
                      <div className="movie-overlay">
                        <button className="play-icon">▶</button>
                        {watchlist.includes(movie._id) ? (
                          <button onClick={(e) => { e.preventDefault(); handleRemove(movie._id); }} className="remove-btn">-</button>
                        ) : (
                          <button onClick={(e) => { e.preventDefault(); handleAdd(movie._id); }} className="add-btn">+</button>
                        )}
                      </div>
                    </div>
                  </Link>
                  <div className="movie-info">
                    <h3>{movie.title}</h3>
                    <p className="movie-rating">⭐ {movie.rating}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {comedyMovies.length > 0 && (
          <div className="movie-row">
            <h2 className="row-title">Comedy Movies</h2>
            <div className="movie-slider">
              {comedyMovies.map(movie => (
                <div key={movie._id} className="movie-card">
                  <Link to={`/movie/${movie._id}`}>
                    <div className="movie-poster">
                      <img src={getMoviePoster(movie.title)} alt={movie.title} />
                      <div className="movie-overlay">
                        <button className="play-icon">▶</button>
                        {watchlist.includes(movie._id) ? (
                          <button onClick={(e) => { e.preventDefault(); handleRemove(movie._id); }} className="remove-btn">-</button>
                        ) : (
                          <button onClick={(e) => { e.preventDefault(); handleAdd(movie._id); }} className="add-btn">+</button>
                        )}
                      </div>
                    </div>
                  </Link>
                  <div className="movie-info">
                    <h3>{movie.title}</h3>
                    <p className="movie-rating">⭐ {movie.rating}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {scifiMovies.length > 0 && (
          <div className="movie-row">
            <h2 className="row-title">Sci-Fi Movies</h2>
            <div className="movie-slider">
              {scifiMovies.map(movie => (
                <div key={movie._id} className="movie-card">
                  <Link to={`/movie/${movie._id}`}>
                    <div className="movie-poster">
                      <img src={getMoviePoster(movie.title)} alt={movie.title} />
                      <div className="movie-overlay">
                        <button className="play-icon">▶</button>
                        {watchlist.includes(movie._id) ? (
                          <button onClick={(e) => { e.preventDefault(); handleRemove(movie._id); }} className="remove-btn">-</button>
                        ) : (
                          <button onClick={(e) => { e.preventDefault(); handleAdd(movie._id); }} className="add-btn">+</button>
                        )}
                      </div>
                    </div>
                  </Link>
                  <div className="movie-info">
                    <h3>{movie.title}</h3>
                    <p className="movie-rating">⭐ {movie.rating}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {horrorMovies.length > 0 && (
          <div className="movie-row">
            <h2 className="row-title">Horror Movies</h2>
            <div className="movie-slider">
              {horrorMovies.map(movie => (
                <div key={movie._id} className="movie-card">
                  <Link to={`/movie/${movie._id}`}>
                    <div className="movie-poster">
                      <img src={getMoviePoster(movie.title)} alt={movie.title} />
                      <div className="movie-overlay">
                        <button className="play-icon">▶</button>
                        {watchlist.includes(movie._id) ? (
                          <button onClick={(e) => { e.preventDefault(); handleRemove(movie._id); }} className="remove-btn">-</button>
                        ) : (
                          <button onClick={(e) => { e.preventDefault(); handleAdd(movie._id); }} className="add-btn">+</button>
                        )}
                      </div>
                    </div>
                  </Link>
                  <div className="movie-info">
                    <h3>{movie.title}</h3>
                    <p className="movie-rating">⭐ {movie.rating}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieList;
