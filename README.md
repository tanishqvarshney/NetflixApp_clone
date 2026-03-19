# 🎬 Netflix Clone

A full-stack Netflix clone built with modern web technologies, featuring user authentication, movie browsing, search functionality, subscription management, and personalized watchlists.

![Netflix Clone](https://img.shields.io/badge/Netflix-Clone-red?style=for-the-badge&logo=netflix)
![React](https://img.shields.io/badge/React-19.1.1-blue?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-8.17.0-green?style=for-the-badge&logo=mongodb)

## ✨ Features

### 🎭 Movie Management
- **Browse Movies**: View a curated collection of movies with posters, ratings, and details
- **Movie Details**: Detailed movie pages with descriptions, ratings, and genre information
- **Search Functionality**: Advanced search with filtering by title, genre, and description
- **Movie Categories**: Organized by genres and popularity

### 👤 User Authentication
- **User Registration**: Secure account creation with password hashing
- **User Login**: JWT-based authentication system
- **Profile Management**: User profile customization and settings
- **Session Management**: Persistent login sessions with localStorage

### 📺 Watchlist & Personalization
- **My List**: Add and remove movies from personal watchlist
- **Favorites**: Mark movies as favorites for quick access
- **Personalized Experience**: User-specific movie recommendations

### 💳 Subscription Management
- **Subscription Plans**: Multiple subscription tiers
- **Payment Integration**: Stripe payment processing
- **Billing Management**: Handle subscription renewals and cancellations

### 🎨 Modern UI/UX
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Netflix-like Interface**: Familiar and intuitive user experience
- **Smooth Animations**: Enhanced user interactions and transitions
- **Dark Theme**: Eye-friendly dark color scheme

## 🛠️ Technologies Used

### Frontend
- **React 19.1.1** - Modern JavaScript library for building user interfaces
- **React Router DOM 7.7.1** - Client-side routing and navigation
- **Redux Toolkit 2.8.2** - State management and data flow
- **React Redux 9.2.0** - React bindings for Redux
- **CSS Modules** - Component-scoped styling
- **Create React App** - Development environment and build tool

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js 4.21.2** - Web application framework
- **MongoDB** - NoSQL database for data storage
- **Mongoose 8.17.0** - MongoDB object modeling tool
- **JWT (jsonwebtoken 9.0.2)** - Secure authentication tokens
- **bcryptjs 3.0.2** - Password hashing and security
- **CORS 2.8.5** - Cross-origin resource sharing
- **dotenv 17.2.1** - Environment variable management

### Payment & External Services
- **Stripe 18.4.0** - Payment processing and subscription management
- **TMDB API** - Movie data and poster images

## 📁 Project Structure

```
netflix-clone/
├── client/                 # React frontend application
│   ├── public/            # Static files
│   ├── src/
│   │   ├── app/           # Redux store configuration
│   │   ├── features/      # Feature-based components
│   │   │   ├── auth/      # Authentication components
│   │   │   ├── movies/    # Movie-related components
│   │   │   ├── profile/   # User profile components
│   │   │   ├── subscription/ # Subscription management
│   │   │   └── watchlist/ # Watchlist functionality
│   │   ├── App.js         # Main application component
│   │   └── index.js       # Application entry point
│   └── package.json       # Frontend dependencies
├── server/                # Node.js backend application
│   ├── controllers/       # Request handlers
│   ├── middleware/        # Custom middleware
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── index.js          # Server entry point
│   └── package.json      # Backend dependencies
└── README.md             # Project documentation
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/tanishqvarshney/NetflixApp_clone.git
cd NetflixApp_clone
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the server directory:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
PORT=5000
```

### 3. Frontend Setup
```bash
cd ../client
npm install
```

### 4. Start the Application

#### Development Mode
```bash
# Start backend server (from server directory)
cd server
npm start

# Start frontend development server (from client directory)
cd client
npm start
```

#### Production Mode
```bash
# Build the frontend
cd client
npm run build

# Start production server
cd ../server
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📖 Usage Guide

### Getting Started
1. **Register/Login**: Create an account or sign in to access personalized features
2. **Browse Movies**: Explore the movie collection on the home page
3. **Search**: Use the search functionality to find specific movies or genres
4. **Add to Watchlist**: Click on movies to add them to your personal list
5. **Manage Subscription**: Access subscription plans and payment options

### Key Features
- **Movie Search**: Search by title, genre, or description
- **Watchlist Management**: Add/remove movies from your personal list
- **User Profile**: Update your profile information and preferences
- **Subscription Plans**: Choose and manage your subscription tier

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Movies
- `GET /api/movies/` - Get all movies
- `GET /api/movies/:id` - Get movie by ID
- `POST /api/movies/` - Add new movie (admin)
- `PUT /api/movies/:id` - Update movie (admin)
- `DELETE /api/movies/:id` - Delete movie (admin)

### Watchlist
- `GET /api/watchlist/` - Get user's watchlist
- `POST /api/watchlist/:movieId` - Add movie to watchlist
- `DELETE /api/watchlist/:movieId` - Remove movie from watchlist

### Subscription
- `GET /api/subscription/plans` - Get subscription plans
- `POST /api/subscription/create` - Create subscription
- `PUT /api/subscription/cancel` - Cancel subscription

## 🎯 Key Features Implementation

### Authentication System
- JWT-based authentication with secure token storage
- Password hashing using bcryptjs
- Protected routes and middleware
- Session persistence with localStorage

### Movie Management
- RESTful API for movie CRUD operations
- MongoDB integration with Mongoose ODM
- Image handling with external poster URLs
- Search and filtering capabilities

### Payment Integration
- Stripe payment processing
- Subscription plan management
- Secure payment handling
- Billing cycle management

## 🔒 Security Features

- **Password Hashing**: Secure password storage with bcryptjs
- **JWT Authentication**: Stateless authentication with JSON Web Tokens
- **CORS Protection**: Cross-origin request handling
- **Input Validation**: Server-side validation for all inputs
- **Environment Variables**: Secure configuration management

## 🚀 Deployment

### Frontend Deployment (Netlify/Vercel)
1. Build the React app: `npm run build`
2. Deploy the `build` folder to your hosting platform

### Backend Deployment (Heroku/Railway)
1. Set environment variables in your hosting platform
2. Deploy the server directory
3. Configure MongoDB connection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Tanishq Varshney**
- GitHub: [@tanishqvarshney](https://github.com/tanishqvarshney)
- Project: [Netflix Clone](https://github.com/tanishqvarshney/NetflixApp_clone)

## 🙏 Acknowledgments

- Netflix for the inspiration and UI design patterns
- TMDB for movie data and poster images
- Stripe for payment processing services
- The React and Node.js communities for excellent documentation

---

⭐ **Star this repository if you found it helpful!**

