import React from 'react';

const MovieModal = ({ movie, onClose, onAdd, onRemove, inWatchlist, onPlay }) => {
  if (!movie) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-hero" style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(20,20,20,1)), url(${movie.poster})`
        }}>
          <div className="modal-hero-content">
            <h1>{movie.title}</h1>
            <div className="modal-actions">
              <button className="play-btn-large" onClick={() => onPlay(movie._id)}>▶ Play</button>
              {inWatchlist ? (
                <button className="circle-btn" onClick={() => onRemove(movie._id)} title="Remove from My List">-</button>
              ) : (
                <button className="circle-btn" onClick={() => onAdd(movie._id)} title="Add to My List">+</button>
              )}
              <button className="circle-btn">👍</button>
            </div>
          </div>
        </div>

        <div className="modal-details">
          <div className="modal-details-left">
            <div className="modal-metadata">
              <span className="match-score">98% Match</span>
              <span className="year">{movie.year}</span>
              <span className="maturity-rating">U/A 16+</span>
              <span className="duration">1h 40m</span>
              <span className="quality-badge">HD</span>
            </div>
            <p className="modal-description">{movie.description}</p>
          </div>
          <div className="modal-details-right">
            <p className="credits"><span>Cast:</span> {movie.cast?.join(', ') || 'Various'}</p>
            <p className="credits"><span>Genres:</span> {movie.genre}</p>
            <p className="credits"><span>This movie is:</span> Ominous, Psychological, Thriller</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
