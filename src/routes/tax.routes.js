const router = require('express').Router();
const { addTransaction, getTransactions } = require('../controllers/tax.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/', authMiddleware, addTransaction);
router.get('/', authMiddleware, getTransactions);

module.exports = router;
