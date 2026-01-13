const express = require('express');
const cors = require('cors');

// Import routes
const authRoutes = require('./routes/auth.routes');
const taxRoutes = require('./routes/tax.routes');
const receiptRoutes = require('./routes/receipt.routes');

const app = express();

// Middleware
app.use(cors()); // Allow requests from anywhere
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tax', taxRoutes);
app.use('/api/receipts', receiptRoutes);

// Health check endpoint
app.get('/api/health', (_, res) => {
  res.json({ status: 'online' });
  app.get('/', (req, res) => res.send('TaxTrack API running'));
});

module.exports = app;
