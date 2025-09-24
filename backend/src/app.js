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
  origin: ["https://fortune-farm-murex.vercel.app", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  console.log('Root endpoint hit');
  res.json({ message: 'Fortune Farm API Server', status: 'running' });
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working', timestamp: new Date().toISOString() });
});

console.log('App configuration complete');
module.exports = app;