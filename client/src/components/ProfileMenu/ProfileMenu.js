import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileMenu.css';

const ProfileMenu = ({ profile, user, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div 
      className="profile-menu-container"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="profile-trigger">
        <img 
          src={profile?.avatar || '/assets/avatar1.png'} 
          alt={profile?.name || 'User'} 
          className="nav-avatar" 
        />
        <span className="caret"></span>
      </div>

      {isOpen && (
        <div className="profile-dropdown">
          <div className="dropdown-arrow"></div>
          <div className="dropdown-content">
            <div className="profile-item active">
              <img src={profile?.avatar || '/assets/avatar1.png'} alt="Profile" className="dropdown-avatar" />
              <span>{profile?.name || 'User'}</span>
            </div>
            <div className="dropdown-divider"></div>
            <div className="dropdown-link" onClick={() => navigate('/profiles')}>
              Manage Profiles
            </div>
            <div className="dropdown-link" onClick={() => navigate('/subscription')}>
              Subscription
            </div>
            <div className="dropdown-divider"></div>
            <div className="dropdown-link logout-link" onClick={handleLogout}>
              Logout
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
