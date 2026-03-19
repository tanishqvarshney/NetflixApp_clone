import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = ({ onAuthSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = { name, email, password, dateOfBirth };
      console.log('[DEBUG] Register Request Payload:', payload);

      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      console.log('[DEBUG] Register API Response:', data);

      if (res.ok) {
        onAuthSuccess(data.user || data, data.token);
        navigate('/profiles');
      } else {
        setError(data.message || 'Registration failed. Please try again.');
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
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="premium-form-group">
            <input
              type="text"
              className="premium-input"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="premium-form-group">
            <input
              type="email"
              className="premium-input"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="premium-form-group">
            <input
              type="password"
              className="premium-input"
              placeholder="Add a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="premium-form-group">
            <input
              type="date"
              className="premium-input"
              placeholder="Date of Birth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
              style={{ color: '#737373' }}
            />
          </div>
          
          {error && <div style={{ color: '#e87c03', fontSize: '14px', marginBottom: '16px' }}>{error}</div>}
          
          <button type="submit" className="premium-auth-btn" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
          
          <div className="premium-auth-footer">
            Already have an account? <Link to="/login">Sign in now.</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
