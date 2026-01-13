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

exports.addTransaction = async (req, res) => {
  try {
    const { amount, type, description, date } = req.body;

    if (!amount || !type) return res.status(400).json({ message: 'Amount and type are required' });

    const transaction = await Tax.create({
      userId: req.userId,
      amount,
      type,
      description: description || '',
      date: date || new Date()
    });

    res.status(201).json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Tax.find({ userId: req.userId });
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
