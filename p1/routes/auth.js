const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../model/db');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
const JWT_SECRET = "your_jwt_secret_key";

// POST /api/auth/register (User Registration)
router.post('/register',  async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: 'Please provide both email and password' });
    }

    try {
        // Check if user already exists
        const [existingUser] =  await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Insert new user into the database
        await db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);

        res.status(201).json({ msg: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});

// POST /api/auth/signin (User Sign-In)
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: 'Please provide both email and password' });
    }

    try {
        // Check if the user exists
        const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (user.length === 0) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user[0].password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Create and sign a JWT token
        const token = jwt.sign({ email: user[0].email }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, msg: 'Sign-in successful' });
    } catch (error) {
        console.error('Error signing in:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});

// POST /api/auth/signout (User Sign-Out)
router.post('/signout', authMiddleware, (req, res) => {
    res.json({ msg: 'Sign-out successful' });
});

module.exports = router;
