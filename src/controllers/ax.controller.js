const TaxRecord = require('../models/TaxRecord');

exports.addTax = async (req, res) => {
  try {
    const { type, amount, period, source } = req.body;
    const userId = req.user.id; // set by auth middleware

    const tax = await TaxRecord.create({ userId, type, amount, period, source });

    res.status(201).json({ message: 'Tax record added', tax });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getTaxes = async (req, res) => {
  try {
    const userId = req.user.id;
    const taxes = await TaxRecord.find({ userId });
    res.json(taxes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
