import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Subscription = () => {
  const [status, setStatus] = useState('loading');
  const [selectedPlan, setSelectedPlan] = useState('standard');
  const [subscribing, setSubscribing] = useState(false);

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setStatus('not-subscribed');
        return;
      }

      const res = await fetch('/api/subscription/status', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      
      if (data.isSubscribed) {
        setStatus('active');
        setSelectedPlan(data.plan || 'standard');
      } else {
        setStatus('not-subscribed');
      }
    } catch (err) {
      console.error('Error fetching subscription status:', err);
      setStatus('not-subscribed');
    }
  };

  const handleSubscribe = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to subscribe');
        return;
      }

      setSubscribing(true);
      const res = await fetch('/api/subscription/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ plan: selectedPlan })
      });

      const data = await res.json();
      
      if (res.ok) {
        setStatus('active');
      } else {
        alert(data.message || 'Subscription failed. Please try again.');
      }
    } catch (err) {
      console.error('Error subscribing:', err);
      alert('Subscription failed. Please try again.');
    } finally {
      setSubscribing(false);
    }
  };

  const plans = [
    {
      id: 'mobile',
      name: 'Mobile',
      price: '$2.99',
      features: ['Good video quality', '480p resolution', 'Watch on mobile/tablet', '1 screen at a time']
    },
    {
      id: 'basic',
      name: 'Basic',
      price: '$5.99',
      features: ['Good video quality', '720p resolution', 'Watch on any device', '1 screen at a time']
    },
    {
      id: 'standard',
      name: 'Standard',
      price: '$9.99',
      features: ['Better video quality', '1080p resolution', 'Watch on any device', '2 screens at a time']
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$12.99',
      features: ['Best video quality', '4K + HDR resolution', 'Watch on any device', '4 screens at a time']
    }
  ];

  if (status === 'loading') {
    return <div className="loading">Loading...</div>;
  }

  if (status === 'active') {
    return (
      <div className="premium-sub-container" style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>Enjoy Your Premium Access!</h1>
        <p style={{ fontSize: '20px', color: '#b3b3b3', marginBottom: '40px' }}>
          Your {selectedPlan.toUpperCase()} plan is active. Start watching your favorite movies and shows now.
        </p>
        <Link to="/" className="premium-sub-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="premium-sub-container">
      <div className="premium-sub-header">
        <h1>Choose the plan that's right for you</h1>
        <p>Watch everything you want. Ad-free. No extra costs. No contracts.</p>
      </div>

      <div className="premium-plan-grid">
        {plans.map((plan) => (
          <div 
            key={plan.id} 
            className={`premium-plan-card ${selectedPlan === plan.id ? 'selected' : ''}`}
            onClick={() => setSelectedPlan(plan.id)}
          >
            <h3 className="premium-plan-name">{plan.name}</h3>
            <div className="premium-plan-price">{plan.price}<span>/mo</span></div>
            <ul className="premium-plan-features">
              {plan.features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
          </div>
        ))}
      </div>

      <button 
        className="premium-sub-btn" 
        onClick={handleSubscribe}
        disabled={subscribing}
      >
        {subscribing ? 'Processing...' : `Subscribe to ${selectedPlan.toUpperCase()}`}
      </button>
    </div>
  );
};

export default Subscription;
