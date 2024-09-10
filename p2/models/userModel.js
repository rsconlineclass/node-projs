const db = require('../db');

// Create a new user
const createUser = async (name, email, password) => {
    await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
};

// Get a user by email
const getUserByEmail = async (email) => {
    const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return user[0];
};

// Get a user by ID
const getUserById = async (id) => {
    const [user] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return user[0];
};

// Export the functions
module.exports = { createUser, getUserByEmail, getUserById };
