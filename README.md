# Fortune Farm - Investment Platform

A full-stack investment platform similar to MoneyTree, built with React + Vite frontend and Node.js + Express backend.

## Project Structure

```
fortune-farm/
├── backend/                 # Node.js + Express backend
│   ├── src/
│   │   ├── config/          # DB config, environment setup
│   │   ├── controllers/     # Route logic (business rules)
│   │   ├── models/          # Database models (User, etc.)
│   │   ├── routes/          # API route definitions
│   │   ├── middleware/      # Auth, validation, logging
│   │   ├── utils/           # Helper functions (e.g., token gen)
│   │   ├── app.js           # Express app setup
│   │   └── server.js        # Entry point (start server)
│   ├── package.json
│   └── .env                 # Secrets (DB_URI, JWT_SECRET)
├── frontend/                # React + Vite frontend
│   ├── src/
│   │   ├── assets/          # Images, fonts, icons
│   │   ├── components/      # Reusable UI pieces (Navbar, Button)
│   │   ├── pages/           # Pages (Home, Login, Dashboard)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API calls to backend
│   │   ├── context/         # React Context (Auth, Theme)
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # React DOM entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md                # Project documentation
```

## Setup Instructions

### Backend Setup
1. Navigate to backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Create MySQL database named `fortune_farm_db`
4. Update `.env` file with your database credentials
5. Start development server: `npm run dev`

### Frontend Setup
1. Navigate to frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`

### Database Schema
Create the following table in your MySQL database:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Features

- User authentication (register/login)
- Protected dashboard routes
- Investment portfolio display
- Responsive design with Tailwind CSS
- RESTful API backend
- JWT token authentication

## Tech Stack

**Frontend:**
- React 19
- Vite
- React Router DOM
- Tailwind CSS
- Axios
- Lucide React (icons)

**Backend:**
- Node.js
- Express.js
- MySQL2
- JWT
- bcryptjs
- CORS

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/user/profile` - Get user profile (protected)

## Development

1. Start backend: `cd backend && npm run dev`
2. Start frontend: `cd frontend && npm run dev`
3. Open http://localhost:5173 in your browser

The backend runs on port 5000 and frontend on port 5173.# Fortune-Farm
