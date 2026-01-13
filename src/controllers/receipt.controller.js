const Receipt = require('../models/Receipt'); // Make sure you have a Receipt model
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

exports.uploadMiddleware = upload.single('file');

exports.uploadReceipt = async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const receipt = await Receipt.create({
      userId,
      filename: req.file.filename,
      type: req.body.type || 'receipt',
      uploadedAt: new Date()
    });

    res.status(201).json({ message: 'Receipt uploaded', transactions: [receipt] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getReceipts = async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const receipts = await Receipt.find({ userId });
    res.json(receipts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
