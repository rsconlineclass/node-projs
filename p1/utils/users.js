// This is a simple in-memory store for users (replace with database in production)
const users = [];

// Add user to the store
function addUser(user) {
    users.push(user);
}

// Find user by email
function getUserByEmail(email) {
    return users.find(user => user.email === email);
}

module.exports = { addUser, getUserByEmail };
