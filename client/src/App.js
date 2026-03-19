import React, { useState, useEffect } from 'react';
import { getMoviePoster, handleImageError } from './utils/imageUtils';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import MovieList from './features/movies/MovieList';
import MovieDetails from './features/movies/MovieDetails';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import Subscription from './features/subscription/Subscription';
import Watchlist from './features/watchlist/Watchlist';
import Profile from './features/profile/Profile';
import Profiles from './features/auth/Profiles';
import EditProfile from './features/profile/EditProfile';
import SearchPage from './features/movies/SearchPage';
import Navbar from './components/Navbar/Navbar';
import './App.css';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem('token');
    if (token) console.log('[DEBUG] Session restored from localStorage');
    return !!token;
  });
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem('selectedProfile');
    try {
      return savedProfile ? JSON.parse(savedProfile) : null;
    } catch (e) {
      return null;
    }
  });
  const [authLoading, setAuthLoading] = useState(false);
  const navigate = useNavigate();

  // Unified Auth Success Handler
  const onAuthSuccess = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsLoggedIn(true);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('selectedProfile');
    setIsLoggedIn(false);
    setUser(null);
    setProfile(null);
    navigate('/login');
  };

  const handleSearch = () => {
    navigate('/search');
  };

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    if (!isLoggedIn) return <Navigate to="/login" replace />;
    return children;
  };

  // Profile Route Component
  const ProfileRoute = ({ children }) => {
    if (!isLoggedIn) return <Navigate to="/login" replace />;
    if (!profile) return <Navigate to="/profiles" replace />;
    return children;
  };

  if (authLoading) {
    return (
      <div className="loading-screen">
        <div className="netflix-spinner"></div>
      </div>
    );
  }

    return (
    <div className="App">
      <Navbar 
        isLoggedIn={isLoggedIn} 
        user={user} 
        profile={profile} 
        handleLogout={handleLogout} 
      />


      <Routes>
        <Route 
          path="/" 
          element={
            <ProfileRoute>
              <MovieList profile={profile} />
            </ProfileRoute>
          } 
        />
        <Route 
          path="/tv-shows" 
          element={
            <ProfileRoute>
              <MovieList profile={profile} contentType="tvshow" />
            </ProfileRoute>
          } 
        />
        <Route 
          path="/movies" 
          element={
            <ProfileRoute>
              <MovieList profile={profile} contentType="movie" />
            </ProfileRoute>
          } 
        />
        <Route path="/movie/:id" element={<ProtectedRoute><MovieDetails /></ProtectedRoute>} />
        <Route path="/login" element={<Login onAuthSuccess={onAuthSuccess} />} />
        <Route path="/register" element={<Register onAuthSuccess={onAuthSuccess} />} />
        <Route path="/profiles" element={<ProtectedRoute><Profiles setProfile={setProfile} /></ProtectedRoute>} />
        <Route path="/profiles/edit/:id" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
        <Route path="/subscription" element={<ProtectedRoute><Subscription /></ProtectedRoute>} />
        <Route path="/mylist" element={<ProtectedRoute><Watchlist /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}



function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
