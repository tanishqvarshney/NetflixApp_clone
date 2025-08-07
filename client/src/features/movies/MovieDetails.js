import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [checkingSub, setCheckingSub] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`/api/movie/${id}`);
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
    const fetchSub = async () => {
      setCheckingSub(true);
      try {
        const res = await fetch('/api/subscription/status', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const data = await res.json();
        setSubscribed(data.status === 'active');
      } catch {
        setSubscribed(false);
      } finally {
        setCheckingSub(false);
      }
    };
    fetchSub();
  }, []);

  if (loading || checkingSub) return <div>Loading movie...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!movie) return <div>Movie not found.</div>;

  return (
    <div>
      <h2>{movie.title}</h2>
      <p>{movie.description}</p>
      <p>Genre: {movie.genre}</p>
      <p>Year: {movie.year}</p>
      {movie.videoUrl && subscribed ? (
        <div>
          <video width="640" controls>
            <source src={movie.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : movie.videoUrl && !subscribed ? (
        <div style={{ color: 'orange' }}>
          Subscribe to watch this movie. <Link to="/subscription">Go to Subscription</Link>
        </div>
      ) : null}
    </div>
  );
};

export default MovieDetails;
