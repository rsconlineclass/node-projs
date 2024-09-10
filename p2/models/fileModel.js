const db = require('../db');

// Save file info
const saveFile = async (filename, filepath) => {
    await db.query('INSERT INTO files (filename, filepath) VALUES (?, ?)', [filename, filepath]);
};

// Export the functions
module.exports = { saveFile };
