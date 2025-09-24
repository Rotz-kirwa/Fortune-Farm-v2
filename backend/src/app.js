console.log('Loading app.js...');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
console.log('Express and dependencies loaded');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

const app = express();
console.log('Express app created');

app.use(cors({
  origin: [
    "https://fortune-farm-murex.vercel.app",
    "https://fortune-farm-git-main-eliuds-projects-ebf8c589.vercel.app",
    "https://fortune-farm-6ci3e05b5-eliuds-projects-ebf8c589.vercel.app",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

try {
  const mpesaRoutes = require('./routes/mpesa');
  app.use('/api/mpesa', mpesaRoutes);
  console.log('M-Pesa routes loaded successfully');
} catch (error) {
  console.error('Failed to load M-Pesa routes:', error.message);
}

app.get('/', (req, res) => {
  console.log('Root endpoint hit');
  res.json({ message: 'Fortune Farm API Server', status: 'running' });
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working', timestamp: new Date().toISOString() });
});

console.log('App configuration complete');
module.exports = app;