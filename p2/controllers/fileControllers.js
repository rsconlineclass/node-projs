const path = require('path');
const { saveFile } = require('../models/fileModel');

// Upload a file
exports.uploadFile = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Please upload a file' });
    }

    const filename = req.file.filename;
    const filepath = req.file.path;

    try {
        await saveFile(filename, filepath);
        res.status(201).json({ message: 'File uploaded successfully', filename });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Download a file
exports.downloadFile = async (req, res) => {
    const filePath = path.join(__dirname, '../uploads/', req.params.filename);
    res.download(filePath);
};
