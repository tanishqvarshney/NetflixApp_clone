import React from 'react';
import './Skeleton.css';

const Skeleton = ({ type }) => {
  if (type === 'hero') {
    return (
      <div className="skeleton-hero">
        <div className="skeleton-hero-content">
          <div className="skeleton-title"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-buttons">
            <div className="skeleton-btn"></div>
            <div className="skeleton-btn"></div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'movie') {
    return (
      <div className="skeleton-movie">
        <div className="skeleton-poster"></div>
        <div className="skeleton-info"></div>
      </div>
    );
  }

  return null;
};

export default Skeleton;
