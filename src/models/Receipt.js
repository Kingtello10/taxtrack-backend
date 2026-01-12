const mongoose = require('mongoose');

const ReceiptSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  filePath: { type: String, required: true }, // path or URL to uploaded file
  type: { type: String, enum: ['image', 'csv'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('Receipt', ReceiptSchema);
