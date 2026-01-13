const Tax = require('../models/Tax');

// Add a new tax transaction
exports.addTransaction = async (req, res) => {
  try {
    const { type, amount, date, details } = req.body;

    const tax = await Tax.create({
      user: req.user.id, // make sure authMiddleware sets req.user
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

// Get all transactions for the logged-in user
exports.getTransactions = async (req, res) => {
  try {
    const taxes = await Tax.find({ user: req.user.id });
    res.json(taxes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
