import React from 'react';
import { motion } from 'framer-motion';
import { getMoviePoster, handleImageError } from '../../utils/imageUtils';
import './MovieCard.css';

const MovieCard = ({ movie, onSelect, onAdd, onRemove, inWatchlist }) => {
  return (
    <motion.div 
      className="movie-card-premium"
      whileHover={{ scale: 1.08, zIndex: 10 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={() => onSelect(movie)}
    >
      <div className="card-image-container">
        <img 
          src={getMoviePoster(movie)} 
          alt={movie.title} 
          className="card-image"
          onError={(e) => handleImageError(e, movie.title)}
          loading="lazy"
        />
        
        {movie.isTop10 && (
          <div className="top-10-badge-premium">
            <span className="badge-text">TOP 10</span>
          </div>
        )}

        <div className="card-overlay-premium">
          <div className="overlay-content">
            <button 
              className="overlay-play-btn"
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = `/movie/${movie._id}?play=true`;
              }}
            >
              ▶
            </button>
            {inWatchlist ? (
              <button 
                className="overlay-action-btn remove"
                onClick={(e) => { e.stopPropagation(); onRemove(movie._id); }}
                title="Remove from My List"
              >
                ✓
              </button>
            ) : (
              <button 
                className="overlay-action-btn add"
                onClick={(e) => { e.stopPropagation(); onAdd(movie._id); }}
                title="Add to My List"
              >
                +
              </button>
            )}
          </div>
          <div className="overlay-info">
            <h4 className="card-title">{movie.title}</h4>
            <div className="card-meta">
              <span className="card-rating">★ {movie.rating || 'N/A'}</span>
              <span className="card-year">{movie.year}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;
