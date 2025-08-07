import React, { useEffect, useState } from 'react';

const Subscription = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [subscribing, setSubscribing] = useState(false);

  const fetchStatus = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/subscription/status', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch status');
      setStatus(data.status);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStatus(); }, []);

  const handleSubscribe = async () => {
    setSubscribing(true);
    setError('');
    try {
      const res = await fetch('/api/subscription/subscribe', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Subscription failed');
      setStatus('active');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubscribing(false);
    }
  };

  if (loading) return <div>Loading subscription status...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h2>Subscription</h2>
      <p>Status: {status === 'active' ? 'Subscribed' : 'Not Subscribed'}</p>
      {status !== 'active' && (
        <button onClick={handleSubscribe} disabled={subscribing}>
          {subscribing ? 'Subscribing...' : 'Subscribe Now'}
        </button>
      )}
    </div>
  );
};

export default Subscription;
