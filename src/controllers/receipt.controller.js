const Receipt = require('../models/Receipt');

exports.uploadReceipt = async (req, res) => {
  try {
    const userId = req.user.id;
    const filePath = req.file.path;
    const type = req.file.mimetype.includes('csv') ? 'csv' : 'image';

    const receipt = await Receipt.create({ userId, filePath, type });
    res.status(201).json({ message: 'Receipt uploaded', receipt });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getReceipts = async (req, res) => {
  try {
    const userId = req.user.id;
    const receipts = await Receipt.find({ userId });
    res.json(receipts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
