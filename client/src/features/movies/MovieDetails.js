import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

const MovieDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`/api/movies/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch movie');
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  useEffect(() => {
    // Check if play parameter is present
    const playParam = searchParams.get('play');
    if (playParam === 'true') {
      setShowVideo(true);
    }
  }, [searchParams]);

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        
        const res = await fetch('/api/subscription/status', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setIsSubscribed(data.isSubscribed);
      } catch (err) {
        console.error('Failed to check subscription:', err);
      }
    };
    checkSubscription();
  }, []);

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

  // Mock movie details for enhanced information
  const getMovieDetails = (title) => {
    const movieDetails = {
      'The Dark Knight': {
        director: 'Christopher Nolan',
        cast: 'Christian Bale, Heath Ledger, Aaron Eckhart',
        runtime: '152 min',
        releaseDate: '2008-07-18',
        awards: '2 Academy Awards including Best Supporting Actor',
        budget: '$185 million',
        boxOffice: '$1.005 billion'
      },
      'Inception': {
        director: 'Christopher Nolan',
        cast: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page',
        runtime: '148 min',
        releaseDate: '2010-07-16',
        awards: '4 Academy Awards including Best Visual Effects',
        budget: '$160 million',
        boxOffice: '$836.8 million'
      },
      'The Matrix': {
        director: 'Lana and Lilly Wachowski',
        cast: 'Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss',
        runtime: '136 min',
        releaseDate: '1999-03-31',
        awards: '4 Academy Awards including Best Visual Effects',
        budget: '$63 million',
        boxOffice: '$463.5 million'
      }
    };
    return movieDetails[title] || {
      director: 'Unknown Director',
      cast: 'Unknown Cast',
      runtime: '120 min',
      releaseDate: movie?.year || 'Unknown',
      awards: 'Various awards',
      budget: 'Unknown',
      boxOffice: 'Unknown'
    };
  };

  if (loading) return <div className="loading">Loading movie...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!movie) return <div className="error">Movie not found</div>;

  const details = getMovieDetails(movie.title);

  return (
    <div className="movie-details">
      <div className="movie-details-content">
        <div className="movie-poster-section">
          <img 
            src={getMoviePoster(movie.title)} 
            alt={movie.title} 
            className="movie-details-poster"
          />
        </div>
        <div className="movie-info-section">
          <h2>{movie.title}</h2>
          <div className="movie-meta">
            <p className="genre">Genre: {movie.genre}</p>
            <p className="year">Year: {movie.year}</p>
            <p className="rating">Rating: ⭐ {movie.rating}/10</p>
            <p className="runtime">Runtime: {details.runtime}</p>
            <p className="director">Director: {details.director}</p>
            <p className="cast">Cast: {details.cast}</p>
            <p className="release-date">Release Date: {details.releaseDate}</p>
            <p className="awards">Awards: {details.awards}</p>
            <p className="budget">Budget: {details.budget}</p>
            <p className="box-office">Box Office: {details.boxOffice}</p>
          </div>
          <div className="movie-description">
            <h3>Synopsis</h3>
            <p>{movie.description}</p>
          </div>
          
          {showVideo && movie.videoUrl && isSubscribed ? (
            <div className="video-player">
              <h3>Now Playing: {movie.title}</h3>
              <video controls width="100%" autoPlay>
                <source src={movie.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ) : movie.videoUrl && !isSubscribed ? (
            <div className="subscription-required">
              <h3>Subscribe to Watch</h3>
              <p>Get a subscription to watch "{movie.title}" and thousands of other movies!</p>
              <button onClick={() => window.location.href = '/subscription'}>
                Subscribe Now
              </button>
            </div>
          ) : movie.videoUrl && isSubscribed ? (
            <div className="video-player">
              <h3>Watch {movie.title}</h3>
              <button onClick={() => setShowVideo(true)} className="play-button">
                ▶ Play Movie
              </button>
            </div>
          ) : (
            <div className="video-unavailable">
              <p>Video not available for this movie</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
