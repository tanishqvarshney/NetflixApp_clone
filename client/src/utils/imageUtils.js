const TMDB_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const TMDB_BACKDROP_BASE = 'https://image.tmdb.org/t/p/original';

const getPlaceholder = (text) => `https://via.placeholder.com/500x750?text=${encodeURIComponent(text || 'No Image')}`;

export const getMoviePoster = (movie) => {
  if (movie?.poster_path) {
    if (movie.poster_path.startsWith('http')) return movie.poster_path;
    return `${TMDB_BASE_URL}${movie.poster_path}`;
  }
  return getPlaceholder(movie?.title);
};

export const getMovieBackdrop = (movie) => {
  if (movie?.backdrop_path) {
    if (movie.backdrop_path.startsWith('http')) return movie.backdrop_path;
    return `${TMDB_BACKDROP_BASE}${movie.backdrop_path}`;
  }
  return `https://via.placeholder.com/1920x1080?text=${encodeURIComponent(movie?.title || 'Backdrop Missing')}`;
};

export const handleImageError = (e, title) => {
  e.target.src = getPlaceholder(title);
};
