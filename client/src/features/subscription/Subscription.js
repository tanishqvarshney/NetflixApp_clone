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
        alert('Subscription successful! Welcome to Netflix!');
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
      id: 'basic',
      name: 'Basic',
      price: '$8.99',
      period: 'month',
      features: [
        'Good video quality',
        'Watch on your TV or computer',
        'Unlimited movies and TV shows',
        'Cancel anytime'
      ],
      popular: false,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-gradient-to-br from-blue-500/10 to-blue-600/10',
      borderColor: 'border-blue-500/30'
    },
    {
      id: 'standard',
      name: 'Standard',
      price: '$13.99',
      period: 'month',
      features: [
        'Better video quality',
        'Watch on your TV, computer, or mobile device',
        'Unlimited movies and TV shows',
        'Watch on 2 screens at the same time',
        'Cancel anytime'
      ],
      popular: true,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-gradient-to-br from-red-500/10 to-red-600/10',
      borderColor: 'border-red-500/30'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$17.99',
      period: 'month',
      features: [
        'Best video quality',
        'Watch on your TV, computer, or mobile device',
        'Unlimited movies and TV shows',
        'Watch on 4 screens at the same time',
        '4K + HDR content available',
        'Cancel anytime'
      ],
      popular: false,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-gradient-to-br from-purple-500/10 to-purple-600/10',
      borderColor: 'border-purple-500/30'
    }
  ];

  if (status === 'loading') {
    return (
      <div className="subscription-page">
        <div className="loading-container">
          <div className="loading-spinner">
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
          </div>
          <h2>Loading your subscription...</h2>
        </div>
      </div>
    );
  }

  if (status === 'active') {
    return (
      <div className="subscription-page">
        <div className="success-container">
          <div className="success-card">
            <div className="success-icon">
              <div className="checkmark">
                <div className="checkmark-stem"></div>
                <div className="checkmark-kick"></div>
              </div>
            </div>
            <h1>🎉 Welcome to Netflix!</h1>
            <p className="success-subtitle">You're all set to enjoy unlimited entertainment</p>
            
            <div className="subscription-details">
              <div className="detail-item">
                <span className="detail-label">Plan:</span>
                <span className="detail-value">{selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Status:</span>
                <span className="detail-value active">Active</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Next billing:</span>
                <span className="detail-value">Next month</span>
              </div>
            </div>
            
            <Link to="/" className="watch-now-btn">
              <span>Start Watching</span>
              <div className="btn-arrow">→</div>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="subscription-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="gradient-text">Unlimited</span> movies, TV shows, and more
          </h1>
          <p className="hero-subtitle">Watch anywhere. Cancel anytime.</p>
          <p className="hero-description">
            Ready to watch? Enter your email to create or restart your membership.
          </p>
        </div>
        
        <div className="hero-background">
          <div className="floating-card card-1"></div>
          <div className="floating-card card-2"></div>
          <div className="floating-card card-3"></div>
        </div>
      </div>

      {/* Plans Section */}
      <div className="plans-section">
        <div className="plans-header">
          <h2>Choose the plan that's right for you</h2>
          <p>All plans include our full library of movies and TV shows</p>
        </div>

        <div className="plans-container">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`plan-card ${plan.popular ? 'popular' : ''} ${selectedPlan === plan.id ? 'selected' : ''}`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <div className="popular-badge">
                  <span>MOST POPULAR</span>
                </div>
              )}
              
              <div className="plan-header">
                <h3 className={`plan-name ${plan.color}`}>{plan.name}</h3>
                <div className="plan-price">
                  <span className="price">{plan.price}</span>
                  <span className="period">/{plan.period}</span>
                </div>
              </div>

              <div className="plan-features">
                {plan.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <div className="feature-icon">✓</div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button
                className={`select-plan-btn ${selectedPlan === plan.id ? 'selected' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPlan(plan.id);
                }}
              >
                {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
              </button>
            </div>
          ))}
        </div>

        <div className="subscription-actions">
          <button
            className="subscribe-btn"
            onClick={handleSubscribe}
            disabled={subscribing}
          >
            {subscribing ? (
              <>
                <div className="btn-spinner"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>Subscribe to {plans.find(p => p.id === selectedPlan)?.name}</span>
                <div className="btn-arrow">→</div>
              </>
            )}
          </button>
          
          <p className="terms">
            By subscribing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-large">🎬</div>
            <h3>Unlimited Entertainment</h3>
            <p>Access thousands of movies and TV shows, from classics to the latest releases.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon-large">📱</div>
            <h3>Watch Anywhere</h3>
            <p>Stream on your TV, computer, tablet, or phone. Download for offline viewing.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon-large">👥</div>
            <h3>Multiple Profiles</h3>
            <p>Create up to 5 profiles for different family members with personalized recommendations.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon-large">🚫</div>
            <h3>Cancel Anytime</h3>
            <p>No commitments, no contracts. Cancel your subscription at any time.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
