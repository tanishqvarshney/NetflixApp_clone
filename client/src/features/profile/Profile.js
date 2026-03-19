import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch profile');
        setProfile(data);
        setName(data.name);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/auth/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, password: password || undefined })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update profile');
      setSuccess('Profile updated successfully!');
      setPassword('');
      setProfile(data);
      localStorage.setItem('user', JSON.stringify(data));
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="loading">Loading account...</div>;

  return (
    <div className="premium-auth-container" style={{ paddingTop: '100px' }}>
      <div className="premium-auth-card" style={{ minHeight: 'auto', padding: '40px' }}>
        <button 
          onClick={() => navigate(-1)} 
          style={{ background: 'none', border: 'none', color: '#808080', cursor: 'pointer', marginBottom: '20px', fontSize: '14px' }}
        >
          ← Back
        </button>
        <h1>Account Settings</h1>
        {error && <div style={{ color: '#e87c03', marginBottom: '20px' }}>{error}</div>}
        {success && <div style={{ color: '#46d369', marginBottom: '20px' }}>{success}</div>}
        
        <form onSubmit={handleSave}>
          <div className="premium-form-group">
            <label style={{ color: '#808080', fontSize: '14px', display: 'block', marginBottom: '8px' }}>Name</label>
            <input 
              type="text" 
              className="premium-input" 
              value={name} 
              onChange={e => setName(e.target.value)} 
            />
          </div>
          <div className="premium-form-group">
            <label style={{ color: '#808080', fontSize: '14px', display: 'block', marginBottom: '8px' }}>Email</label>
            <input 
              type="email" 
              className="premium-input" 
              value={profile?.email} 
              disabled 
              style={{ opacity: 0.6 }}
            />
          </div>
          <div className="premium-form-group">
            <label style={{ color: '#808080', fontSize: '14px', display: 'block', marginBottom: '8px' }}>New Password</label>
            <input 
              type="password" 
              className="premium-input" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="Leave blank to keep current"
            />
          </div>
          <button type="submit" className="premium-auth-btn" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
