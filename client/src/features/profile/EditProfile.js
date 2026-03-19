import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  useEffect(() => {
    const savedProfiles = localStorage.getItem('user_profiles');
    if (savedProfiles) {
      const parsed = JSON.parse(savedProfiles);
      setProfiles(parsed);
      const found = parsed.find(p => p.id === id);
      if (found) {
        setProfile(found);
        setName(found.name);
      } else {
        navigate('/profiles');
      }
    } else {
      navigate('/profiles');
    }
  }, [id, navigate]);

  const handleSave = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    
    // Validation
    const nameRegex = /^[a-zA-Z0-9 ]+$/;
    if (!trimmedName) {
      setError('Name is required');
      return;
    }
    if (!nameRegex.test(trimmedName)) {
      setError('Only letters and numbers allowed');
      return;
    }
    if (trimmedName.length > 15) {
      setError('Max 15 characters allowed');
      return;
    }

    const updatedProfiles = profiles.map(p => 
      p.id === id ? { ...p, name: trimmedName } : p
    );
    
    localStorage.setItem('user_profiles', JSON.stringify(updatedProfiles));
    
    // If this was the selected profile, update it too
    const selectedProfile = JSON.parse(localStorage.getItem('selectedProfile'));
    if (selectedProfile && selectedProfile.id === id) {
      localStorage.setItem('selectedProfile', JSON.stringify({ ...selectedProfile, name: trimmedName }));
    }


    navigate('/profiles');
  };

  const handleDelete = () => {
    if (profiles.length <= 1) {
      setError('You must have at least one profile');
      setShowConfirmDelete(false);
      return;
    }

    const updatedProfiles = profiles.filter(p => p.id !== id);
    localStorage.setItem('user_profiles', JSON.stringify(updatedProfiles));

    // If this was the selected profile, clear it
    const selectedProfile = JSON.parse(localStorage.getItem('selectedProfile'));
    if (selectedProfile && selectedProfile.id === id) {
      localStorage.removeItem('selectedProfile');
    }

    navigate('/profiles');
  };

  if (!profile) return <div className="loading">Loading...</div>;

  return (
    <div className="profiles-container">
      <div className="profiles-wrapper" style={{ maxWidth: '600px' }}>
        <h1 style={{ fontSize: '3.5rem', textAlign: 'left', marginBottom: '30px' }}>Edit Profile</h1>
        
        <div style={{ display: 'flex', gap: '40px', padding: '20px 0', borderTop: '1px solid #333', borderBottom: '1px solid #333', marginBottom: '40px' }}>
          <div style={{ position: 'relative' }}>
            <img 
              src={profile.avatar} 
              alt={profile.name} 
              style={{ width: '12vw', minWidth: '100px', borderRadius: '4px' }}
            />
            <div style={{ position: 'absolute', bottom: '10px', left: '10px', background: 'rgba(0,0,0,0.6)', borderRadius: '50%', padding: '5px' }}>
               <span style={{ fontSize: '1.2rem' }}>✎</span>
            </div>
          </div>
          
          <div style={{ flex: 1, textAlign: 'left' }}>
            <div style={{ marginBottom: '30px' }}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: '100%', padding: '10px', background: '#666', border: 'none', color: '#fff', fontSize: '1.3rem', marginBottom: '5px' }}
              />
              {error && <p style={{ color: '#e50914', fontSize: '0.9rem' }}>{error}</p>}
            </div>

            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '10px' }}>Settings:</h3>
              <div style={{ padding: '10px', border: '1px solid #333', color: '#808080' }}>
                Maturity Settings: <span style={{ color: '#fff' }}>All Maturity Levels</span>
                <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Show titles of all maturity levels for this profile.</p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <button 
            onClick={handleSave}
            style={{ padding: '10px 30px', background: '#fff', color: '#000', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
          >
            SAVE
          </button>
          <button 
            onClick={() => navigate('/profiles')}
            style={{ padding: '10px 30px', background: 'transparent', color: '#808080', border: '1px solid #808080', cursor: 'pointer' }}
          >
            CANCEL
          </button>
          <button 
            onClick={() => setShowConfirmDelete(true)}
            style={{ padding: '10px 30px', background: 'transparent', color: '#808080', border: '1px solid #808080', cursor: 'pointer' }}
          >
            DELETE PROFILE
          </button>
        </div>

        {showConfirmDelete && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000 }}>
            <div style={{ background: '#141414', padding: '40px', borderRadius: '4px', maxWidth: '400px', textAlign: 'center' }}>
              <h2>Delete Profile?</h2>
              <p style={{ margin: '20px 0', color: '#808080' }}>This profile's history - including My List, ratings and activity - will be gone forever, and you won't be able to get it back.</p>
              <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                <button onClick={handleDelete} style={{ padding: '10px 20px', background: '#e50914', color: '#fff', border: 'none', cursor: 'pointer' }}>DELETE PROFILE</button>
                <button onClick={() => setShowConfirmDelete(false)} style={{ padding: '10px 20px', background: '#fff', color: '#000', border: 'none', cursor: 'pointer' }}>KEEP PROFILE</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
