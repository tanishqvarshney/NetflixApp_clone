import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import MovieList from './features/movies/MovieList';
import MovieDetails from './features/movies/MovieDetails';
import Subscription from './features/subscription/Subscription';
import Profile from './features/profile/Profile';
import Watchlist from './features/watchlist/Watchlist';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Home</Link> | <Link to="/login">Login</Link> | <Link to="/register">Register</Link> | <Link to="/subscription">Subscription</Link> | <Link to="/profile">Profile</Link> | <Link to="/watchlist">Watchlist</Link>
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/" element={<MovieList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
