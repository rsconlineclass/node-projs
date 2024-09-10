const jwt = require('jsonwebtoken');

// Secret for JWT (same as in auth.js)
const JWT_SECRET = "your_jwt_secret_key";

function authMiddleware(req, res, next) {
    const token = req.header('Authorization');
    console.log(token)
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log(decoded)
        req.user = decoded;  // Attach the decoded user info to the request object
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}

module.exports = authMiddleware;
