const { initDatabase } = require('../config/database');

class User {
  static async create({ email, password, name }) {
    const db = await initDatabase();
    const result = await db.run(
      'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
      [email, password, name]
    );
    return result.lastID;
  }

  static async findByEmail(email) {
    const db = await initDatabase();
    const user = await db.get(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return user;
  }

  static async findById(id) {
    const db = await initDatabase();
    const user = await db.get(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    return user;
  }
}

module.exports = User;