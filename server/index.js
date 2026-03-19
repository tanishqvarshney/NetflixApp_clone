require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/assets', express.static(path.join(__dirname, 'public/assets')));

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const movieRoutes = require('./routes/movie');
app.use('/api/movies', movieRoutes);

const subscriptionRoutes = require('./routes/subscription');
app.use('/api/subscription', subscriptionRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));
// The "catchall" handler: for any request that doesn't match API routes, send back React's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;

console.log('Using Mock Database - Skipping MongoDB connection');

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
