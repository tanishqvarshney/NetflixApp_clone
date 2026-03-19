import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profiles = ({ setProfile }) => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [isManageMode, setIsManageMode] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [error, setError] = useState('');

  const AVATARS = [
    'https://i.pinimg.com/736x/92/b4/e7/92b4e7c57de1b5e1e8c5e883fd915450.jpg',
    'https://i.pinimg.com/736x/b2/a0/29/b2a029a6c2757e9d3a09265e3d07d49d.jpg',
    'https://i.pinimg.com/736x/47/de/89/47de890c173c74fb7a4df30be768b632.jpg',
    'https://i.pinimg.com/736x/37/84/f4/3784f45a3f2f5ceb0be2f20a3356705c.jpg',
    'https://i.pinimg.com/736x/76/ac/cf/76accf256d0bed2c43c0484b3d1a5f55.jpg'
  ];

  const defaultProfiles = [
    { id: '1', name: 'Tanni', avatar: AVATARS[0] },
    { id: '2', name: 'Paari_poori', avatar: AVATARS[1] },
    { id: '3', name: 'Devang', avatar: AVATARS[2] },
    { id: '4', name: 'siuuu', avatar: AVATARS[3] }
  ];



  useEffect(() => {
    const savedProfiles = localStorage.getItem('user_profiles');
    if (savedProfiles) {
      try {
        const parsed = JSON.parse(savedProfiles);
        console.log('[DEBUG] Loaded profiles:', parsed);
        setProfiles(parsed);
      } catch (e) {
        setProfiles(defaultProfiles);
      }
    } else {
      console.log('[DEBUG] Setting default profiles');
      setProfiles(defaultProfiles);
      localStorage.setItem('user_profiles', JSON.stringify(defaultProfiles));
    }
  }, []);

  const saveProfilesToStorage = (updatedProfiles) => {
    setProfiles(updatedProfiles);
    localStorage.setItem('user_profiles', JSON.stringify(updatedProfiles));
  };

  const handleSelect = (profile) => {
    if (isManageMode) {
      // Navigate to edit profile (we'll implement this route or handle it here)
      navigate(`/profiles/edit/${profile.id}`);
    } else {
      setProfile(profile);
      localStorage.setItem('selectedProfile', JSON.stringify(profile));
      navigate('/');
    }
  };

  const handleAddProfile = (e) => {
    e.preventDefault();
    const trimmedName = newName.trim();
    
    // Validation: Alphabets, Numbers, Max 15 chars
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
    if (profiles.length >= 5) {
      setError('Maximum 5 profiles allowed');
      return;
    }

    const newProfile = {
      id: Date.now().toString(),
      name: trimmedName,
      avatar: AVATARS[profiles.length % AVATARS.length]
    };


    const updatedProfiles = [...profiles, newProfile];
    saveProfilesToStorage(updatedProfiles);
    setIsAdding(false);
    setNewName('');
    setError('');
  };

  if (isAdding) {
    return (
      <div className="profiles-container">
        <div className="profiles-wrapper">
          <h1 style={{ fontSize: '3.5rem', marginBottom: '10px' }}>Add Profile</h1>
          <p style={{ color: '#808080', marginBottom: '30px' }}>Add a profile for another person watching Netflix.</p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'center', padding: '20px', borderTop: '1px solid #333', borderBottom: '1px solid #333', marginBottom: '40px' }}>
            <img 
              src={AVATARS[profiles.length % AVATARS.length]} 
              alt="Preview" 
              style={{ width: '10vw', minWidth: '80px', borderRadius: '4px' }}
            />

            <div style={{ flex: 1, maxWidth: '400px', textAlign: 'left' }}>
              <input
                type="text"
                placeholder="Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                style={{ width: '100%', padding: '10px', background: '#666', border: 'none', color: '#fff', fontSize: '1.2rem', marginBottom: '10px' }}
                autoFocus
              />
              {error && <p style={{ color: '#e50914', fontSize: '0.9rem' }}>{error}</p>}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <button 
              onClick={handleAddProfile}
              style={{ padding: '10px 30px', background: '#fff', color: '#000', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
            >
              CONTINUE
            </button>
            <button 
              onClick={() => { setIsAdding(false); setError(''); setNewName(''); }}
              style={{ padding: '10px 30px', background: 'transparent', color: '#808080', border: '1px solid #808080', cursor: 'pointer' }}
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profiles-container">
      <div className="profiles-wrapper">
        <h1>{isManageMode ? 'Manage Profiles:' : "Who's watching?"}</h1>
        <div className="profiles-grid">
          {profiles.map((profile) => (
            <div 
              key={profile.id} 
              className={`profile-card ${isManageMode ? 'manage-mode' : ''}`} 
              onClick={() => handleSelect(profile)}
            >
              <div className="profile-avatar">
                <img src={profile.avatar} alt={profile.name} onError={(e) => e.target.src = AVATARS[0]} />

                {isManageMode && (
                  <div className="edit-overlay">
                    <span className="edit-icon">✎</span>
                  </div>
                )}
              </div>
              <span className="profile-name">{profile.name}</span>
            </div>
          ))}
          {!isManageMode && profiles.length < 5 && (
            <div className="profile-card add-profile" onClick={() => setIsAdding(true)}>
              <div className="profile-avatar">
                <div className="plus-icon">+</div>
              </div>
              <span className="profile-name">Add Profile</span>
            </div>
          )}
        </div>
        <button 
          className={`manage-profiles-btn ${isManageMode ? 'active' : ''}`} 
          onClick={() => setIsManageMode(!isManageMode)}
        >
          {isManageMode ? 'DONE' : 'Manage Profiles'}
        </button>
      </div>
    </div>
  );
};

export default Profiles;
