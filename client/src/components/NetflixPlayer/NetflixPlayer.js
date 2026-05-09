import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './NetflixPlayer.css';

const NetflixPlayer = ({ movie, isSubscribed, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(!isSubscribed ? false : true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showGate, setShowGate] = useState(!isSubscribed);
  const [showControls, setShowControls] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  // Robust fallback video
  const FALLBACK_VIDEO = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  useEffect(() => {
    let timeout;
    if (showControls && isPlaying) {
      timeout = setTimeout(() => setShowControls(false), 3000);
    }
    return () => clearTimeout(timeout);
  }, [showControls, isPlaying]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleError = () => {
      console.error("Video failed to load:", movie.videoUrl || movie.video);
      setVideoError(true);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('error', handleError);
    };
  }, [movie]);

  const togglePlay = (e) => {
    if (e) e.stopPropagation();
    if (showGate || videoError) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(err => console.error("Play failed:", err));
    }
    setIsPlaying(!isPlaying);
  };

  const skip = (seconds) => {
    if (!isSubscribed || showGate || videoError) return;
    videoRef.current.currentTime += seconds;
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e) => {
    if (!isSubscribed || showGate || videoError) return;
    const rect = e.target.closest('.seek-bar-container').getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, x / rect.width));
    videoRef.current.currentTime = pct * videoRef.current.duration;
  };

  const handleSubscribe = () => {
    navigate('/subscription');
    onClose();
  };

  return (
    <div 
      className={`netflix-player-container ${showControls ? 'show-cursor' : ''}`} 
      onMouseMove={() => setShowControls(true)}
      onClick={() => setShowControls(true)}
    >
      <video 
        ref={videoRef}
        className="video-element"
        autoPlay={isSubscribed && !videoError}
        muted={isMuted}
        src={movie.videoUrl || movie.video || FALLBACK_VIDEO}
        onClick={togglePlay}
        playsInline
      />

      {videoError && !showGate && (
        <div className="video-error-overlay">
          <div className="error-content">
            <div className="error-icon">⚠️</div>
            <h2>Video Unavailable</h2>
            <p>We're having trouble playing this title right now. Please try again later.</p>
            <button className="error-back-btn" onClick={onClose}>Go Back</button>
          </div>
        </div>
      )}

      <div className={`player-controls-overlay ${showControls ? 'visible' : ''}`}>
        <div className="player-header">
          <button className="player-back-btn" onClick={onClose}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h2 className="player-movie-title">{movie.title}</h2>
        </div>

        <div className="center-controls">
          <button className="center-btn secondary" onClick={() => skip(-10)}>
            <span className="skip-icon">↺</span>
            <span className="skip-label">10</span>
          </button>
          
          <button className="center-btn main" onClick={togglePlay}>
            {isPlaying ? '⏸' : '▶'}
          </button>

          <button className="center-btn secondary" onClick={() => skip(10)}>
            <span className="skip-icon">↻</span>
            <span className="skip-label">10</span>
          </button>
        </div>

        <div className="player-bottom-controls">
          <div className="seek-bar-container" onClick={handleSeek}>
            <div className="seek-bar-progress" style={{ width: `${progress}%` }}>
              <div className="seek-bar-handle" />
            </div>
          </div>

          <div className="control-buttons-row">
            <div className="left-controls">
              <button className="control-btn" onClick={togglePlay}>
                {isPlaying ? '⏸' : '▶'}
              </button>
              <button className="control-btn" onClick={() => skip(-10)}>↺</button>
              <button className="control-btn" onClick={() => skip(10)}>↻</button>
              <div className="time-display">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>
            
            <div className="right-controls">
              <button className="control-btn" onClick={() => setIsMuted(!isMuted)}>
                {isMuted ? '🔇' : '🔊'}
              </button>
              <button className="control-btn">💬</button>
              <button className="control-btn" onClick={() => videoRef.current.requestFullscreen()}>⛶</button>
            </div>
          </div>
        </div>
      </div>

      {showGate && (
        <div className="subscription-gate-overlay">
          <div className="gate-background" style={{ backgroundImage: `url(${movie.backdrop_path})` }} />
          <div className="gate-content">
            <div className="gate-icon">🎬</div>
            <h1 className="gate-title">Ready to watch?</h1>
            <p className="gate-text">
              Subscribe to Netflix to enjoy "{movie.title}" and unlimited movies and TV shows on all your devices.
            </p>
            
            <button className="gate-action-btn" onClick={handleSubscribe}>
              View Subscription Plans
            </button>
            
            <a href="#" className="gate-cancel-link" onClick={(e) => { e.preventDefault(); onClose(); }}>
              Back to browsing
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default NetflixPlayer;
