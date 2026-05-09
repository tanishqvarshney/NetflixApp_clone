import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import NetflixPlayer from '../../components/NetflixPlayer/NetflixPlayer';
import './MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
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
        setIsSubscribed(data.status === 'active' || data.isSubscribed);
      } catch (err) {
        console.error('Failed to check subscription:', err);
      }
    };
    checkSubscription();
  }, []);

  if (loading) return <div className="loading"><div className="netflix-spinner"></div></div>;
  if (error) return <div className="error">{error}</div>;
  if (!movie) return <div className="error">Movie not found</div>;

  const backdropUrl = movie.backdrop_path || movie.image || '';
  const posterUrl = movie.poster_path || movie.image || '';

  return (
    <div className="movie-details-container">
      <div 
        className="movie-hero-backdrop" 
        style={{ backgroundImage: `url(${backdropUrl})` }}
      />
      
      <div className="movie-details-content">
        <button className="back-button" onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>

        <div className="movie-main-info">
          <div className="movie-poster-wrapper">
            <img src={posterUrl} alt={movie.title} className="movie-poster-img" />
          </div>

          <div className="movie-text-details">
            <h1>{movie.title}</h1>
            
            <div className="movie-meta-row">
              <span className="meta-item rating">★ {movie.rating}/10</span>
              <span className="meta-item year">{movie.year}</span>
              <span className="meta-item runtime">{movie.runtime || '2h 15m'}</span>
              <span className="meta-item genre">{movie.genre}</span>
            </div>

            <div className="movie-synopsis">
              <h3>Synopsis</h3>
              <p>{movie.description}</p>
            </div>

            <div className="movie-extra-info">
              <div className="info-field">
                <span className="info-label">Director</span>
                <span className="info-value">{movie.director || 'N/A'}</span>
              </div>
              <div className="info-field">
                <span className="info-label">Cast</span>
                <span className="info-value">{Array.isArray(movie.cast) ? movie.cast.join(', ') : (movie.cast || 'N/A')}</span>
              </div>
              <div className="info-field">
                <span className="info-label">Budget</span>
                <span className="info-value">{movie.budget || 'N/A'}</span>
              </div>
              <div className="info-field">
                <span className="info-label">Revenue</span>
                <span className="info-value">{movie.boxOffice || 'N/A'}</span>
              </div>
            </div>

            <div className="action-section">
              <button className="premium-play-btn" onClick={() => setShowVideo(true)}>
                ▶ Watch Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {showVideo && (
        <NetflixPlayer 
          movie={movie} 
          isSubscribed={isSubscribed} 
          onClose={() => setShowVideo(false)} 
        />
      )}
    </div>
  );
};

export default MovieDetails;
