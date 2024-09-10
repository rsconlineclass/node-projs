const express = require('express');
const multer = require('multer');
const authMiddleware = require('../middlewares/authMiddlewre');
const { uploadFile, downloadFile } = require('../controllers/fileControllers');

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

const router = express.Router();

// File upload route
router.post('/upload', authMiddleware, upload.single('file'), uploadFile);

// File download route
router.get('/download/:filename', authMiddleware, downloadFile);

module.exports = router;
