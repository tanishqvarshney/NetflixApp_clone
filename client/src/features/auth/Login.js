import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ onAuthSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = { email, password };
      console.log('[DEBUG] Login Request Payload:', payload);

      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      console.log('[DEBUG] Login API Response:', data);

      if (res.ok) {
        onAuthSuccess(data.user || data, data.token);
        navigate('/profiles');
      } else {
        setError(data.message || 'Incorrect email or password.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="premium-auth-container">
      <div className="premium-auth-card">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="premium-form-group">
            <input
              type="email"
              className="premium-input"
              placeholder="Email or phone number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="premium-form-group">
            <input
              type="password"
              className="premium-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          {error && <div style={{ color: '#e87c03', fontSize: '14px', marginBottom: '16px' }}>{error}</div>}
          
          <button type="submit" className="premium-auth-btn" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
          
          <div className="premium-auth-footer">
            New to Netflix? <Link to="/register">Sign up now.</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
