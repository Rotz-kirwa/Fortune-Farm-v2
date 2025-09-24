const express = require('express');
const { initDatabase } = require('../config/database');

const router = express.Router();

// Get all users
router.get('/users', async (req, res) => {
  try {
    const db = await initDatabase();
    const users = await db.all(`
      SELECT id, name, email, created_at 
      FROM users 
      ORDER BY created_at DESC
    `);
    
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

module.exports = router;