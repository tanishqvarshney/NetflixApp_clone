import React from 'react';
import './NotificationDropdown.css';

const notifications = [
  {
    id: 1,
    title: 'New Arrival: The Witcher Season 3',
    time: '2 hours ago',
    image: 'https://i.pinimg.com/736x/11/ee/9c/11ee9ce236f8781d441082b4ed14308b.jpg', // Using Stranger Things image as placeholder for Witcher
    isNew: true
  },
  {
    id: 2,
    title: 'Top 10 Today in India',
    time: '5 hours ago',
    image: 'https://i.pinimg.com/736x/d8/e9/41/d8e941bbb91a9df0afc5170a31cbfba4.jpg', // Using One Piece image
    isNew: true
  },
  {
    id: 3,
    title: 'Resume watching: Wednesday',
    time: '1 day ago',
    image: 'https://i.pinimg.com/736x/d7/b4/2c/d7b42c6f97ccf42d764e9a0cc6cf8504.jpg', // Using Peaky Blinders image
    isNew: false
  }
];

const NotificationDropdown = () => {
  return (
    <div className="notification-dropdown">
      <div className="dropdown-arrow"></div>
      <div className="dropdown-content">
        {notifications.map((notif) => (
          <div key={notif.id} className={`notification-item ${notif.isNew ? 'new' : ''}`}>
            <img 
              src={notif.image} 
              alt={notif.title} 
              className="notif-img" 
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/100x56?text=Netflix';
              }}
            />
            <div className="notif-info">
              <p className="notif-title">{notif.title}</p>
              <span className="notif-time">{notif.time}</span>
            </div>
            {notif.isNew && <div className="new-indicator"></div>}
          </div>
        ))}
        <div className="dropdown-footer">
          See all notifications
        </div>
      </div>
    </div>
  );
};

export default NotificationDropdown;
