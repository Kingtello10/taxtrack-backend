const Tax = require('../models/Tax'); // Make sure you have a Tax model
const jwt = require('jsonwebtoken');

// Middleware for auth (optional)
exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Add a transaction
exports.addTransaction = async (req, res) => {
  try {
    const { type, amount, date, details } = req.body;
    const tax = await Tax.create({
      user: req.user.id,
      type,
      amount,
      date,
      details
    });
    res.status(201).json(tax);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all transactions for a user
exports.getTransactions = async (req, res) => {
  try {
    const taxes = await Tax.find({ user: req.user.id });
    res.json(taxes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
