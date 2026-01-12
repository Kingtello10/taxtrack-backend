const mongoose = require('mongoose');

const TaxRecordSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['PAYE', 'VAT', 'CONSUMPTION'], required: true },
  amount: { type: Number, required: true },
  period: { type: String, required: true }, // e.g., "2026-01" or "Q1-2026"
  source: { type: String, enum: ['manual', 'receipt', 'csv'], default: 'manual' }
}, { timestamps: true });

module.exports = mongoose.model('TaxRecord', TaxRecordSchema);
