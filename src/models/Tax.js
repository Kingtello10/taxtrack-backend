const mongoose = require('mongoose');

const TaxSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['PAYE', 'VAT', 'Consumption'], required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  details: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Tax', TaxSchema);
