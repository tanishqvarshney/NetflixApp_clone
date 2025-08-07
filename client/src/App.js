import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import MovieList from './features/movies/MovieList';
import MovieDetails from './features/movies/MovieDetails';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import Subscription from './features/subscription/Subscription';
import Watchlist from './features/watchlist/Watchlist';
import Profile from './features/profile/Profile';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    navigate('/');
  };

  const handleSearch = () => {
    navigate('/search');
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/" className="netflix-logo">
            <span className="netflix-text">NETFLIX</span>
          </Link>
          <Link to="/mylist" className="nav-link">My List</Link>
        </div>
        
        <div className="nav-right">
          <div className="search-icon" onClick={handleSearch}>
            🔍
          </div>
          
          {isLoggedIn ? (
            <>
              <span className="welcome-text">Welcome, {user?.name?.split(' ')[0] || 'User'}!</span>
              <Link to="/subscription" className="auth-link">Subscription</Link>
              <Link to="/profile" className="auth-link">Profile</Link>
              <button onClick={handleLogout} className="auth-link logout-btn">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="auth-link">Login</Link>
              <Link to="/register" className="auth-link">Register</Link>
              <Link to="/subscription" className="auth-link">Subscription</Link>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
        <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/mylist" element={<Watchlist />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </div>
  );
}

// Enhanced Search Page Component
function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setHasSearched(true);
    
    try {
      const res = await fetch('/api/movies/');
      if (!res.ok) throw new Error('Failed to fetch movies');
      
      const movies = await res.json();
      const filtered = movies.filter(movie => 
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
    } catch (err) {
      console.error('Search error:', err);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const getMoviePoster = (title) => {
    const posterUrls = {
      'The Dark Knight': 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
      'Inception': 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
      'The Matrix': 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
      'Interstellar': 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
      'The Avengers': 'https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg',
      'Goodfellas': 'https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg',
      'The Silence of the Lambs': 'https://image.tmdb.org/t/p/w500/rplLJ2hPcOQmkFhTqUte0MkEaO2.jpg',
      'The Green Mile': 'https://image.tmdb.org/t/p/w500/velWPhVMQeQKcxggNEU8YmIo52R.jpg',
      'Schindler\'s List': 'https://image.tmdb.org/t/p/w500/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg',
      'The Shawshank Redemption': 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
      'The Godfather': 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
      'Pulp Fiction': 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
      'Fight Club': 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
      'Forrest Gump': 'https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg',
      'Titanic': 'https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg',
      'The Lion King': 'https://image.tmdb.org/t/p/w500/2bXbqYdUdNVa8VIWXVfclP2ICtT.jpg',
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
    
    return posterUrls[title] || `https://via.placeholder.com/200x300/000000/FFFFFF?text=${encodeURIComponent(title)}`;
  };

  return (
    <div className="search-page">
      <div className="search-header">
        <button onClick={() => navigate('/')} className="back-btn">
          <span>←</span> Back to Home
        </button>
        <form onSubmit={handleSearch} className="search-form-large">
          <input
            type="text"
            placeholder="Search movies, TV shows, genres..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input-large"
            autoFocus
          />
          <button type="submit" className="search-btn-large">
            🔍
          </button>
        </form>
      </div>
      
      <div className="search-results-container">
        {loading ? (
          <div className="search-loading">
            <div className="loading-spinner">
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
            </div>
            <p>Searching for "{searchQuery}"...</p>
          </div>
        ) : hasSearched ? (
          searchResults.length > 0 ? (
            <>
              <div className="search-results-header">
                <h2>Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchQuery}"</h2>
              </div>
              <div className="search-results-grid">
                {searchResults.map(movie => (
                  <div key={movie._id} className="search-result-card">
                    <Link to={`/movie/${movie._id}`}>
                      <div className="search-result-image">
                        <img 
                          src={getMoviePoster(movie.title)} 
                          alt={movie.title} 
                        />
                        <div className="search-result-overlay">
                          <div className="play-icon">▶</div>
                        </div>
                      </div>
                      <div className="search-result-info">
                        <h3>{movie.title}</h3>
                        <p className="search-result-rating">⭐ {movie.rating}</p>
                        <p className="search-result-genre">{movie.genre}</p>
                        <p className="search-result-year">{movie.year}</p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h2>No movies found</h2>
              <p>We couldn't find any movies matching "{searchQuery}"</p>
              <p>Try searching for a different title, genre, or description</p>
              <button onClick={() => setHasSearched(false)} className="try-again-btn">
                Try Another Search
              </button>
            </div>
          )
        ) : (
          <div className="search-placeholder">
            <div className="search-placeholder-icon">🎬</div>
            <h2>Search for your favorite movies</h2>
            <p>Enter a movie title, genre, or description to get started</p>
            <div className="search-suggestions">
              <p>Try searching for:</p>
              <div className="suggestion-tags">
                <span className="suggestion-tag">Action</span>
                <span className="suggestion-tag">Comedy</span>
                <span className="suggestion-tag">Drama</span>
                <span className="suggestion-tag">Horror</span>
                <span className="suggestion-tag">Sci-Fi</span>
                <span className="suggestion-tag">The Dark Knight</span>
                <span className="suggestion-tag">Inception</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
