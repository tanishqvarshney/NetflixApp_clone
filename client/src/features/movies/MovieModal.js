import React from 'react';
import './MovieModal.css';

const MovieModal = ({ movie, onClose, onAdd, onRemove, inWatchlist, onPlay }) => {
  if (!movie) return null;

  const backdropUrl = movie.backdrop_path || movie.image || movie.poster || '';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        
        <div className="modal-hero" style={{
          backgroundImage: `linear-gradient(to bottom, rgba(24, 24, 24, 0) 0%, rgba(24, 24, 24, 1) 100%), url(${backdropUrl})`
        }}>
          <div className="modal-hero-content">
            <h1>{movie.title}</h1>
            <div className="modal-actions">
              <button className="play-btn-large" onClick={() => onPlay(movie._id)}>
                ▶ Play
              </button>
              {inWatchlist ? (
                <button 
                  className="circle-btn" 
                  onClick={() => onRemove(movie._id)} 
                  title="Remove from My List"
                >
                  ✓
                </button>
              ) : (
                <button 
                  className="circle-btn" 
                  onClick={() => onAdd(movie._id)} 
                  title="Add to My List"
                >
                  +
                </button>
              )}
              <button className="circle-btn" title="I like this">👍</button>
            </div>
          </div>
        </div>

        <div className="modal-details">
          <div className="modal-details-left">
            <div className="modal-metadata">
              <span className="match-score">98% Match</span>
              <span className="year">{movie.year}</span>
              <span className="maturity-rating">U/A 16+</span>
              <span className="duration">{movie.runtime || '2h 15m'}</span>
              <span className="quality-badge">HD</span>
            </div>
            <p className="modal-description">{movie.description}</p>
          </div>
          <div className="modal-details-right">
            <p className="credits"><span>Cast:</span> {Array.isArray(movie.cast) ? movie.cast.slice(0, 3).join(', ') : (movie.cast || 'Various')}</p>
            <p className="credits"><span>Genres:</span> {movie.genre}</p>
            <p className="credits"><span>This movie is:</span> Ominous, Psychological, Gritty</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
