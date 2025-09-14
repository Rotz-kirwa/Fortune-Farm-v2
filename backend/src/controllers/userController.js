const User = require('../models/User');

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({ user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getProfile };