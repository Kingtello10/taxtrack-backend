const router = require('express').Router();
const { addTax, getTaxes } = require('../controllers/tax.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/', authMiddleware, addTax);   
router.get('/', authMiddleware, getTaxes);  

module.exports = router;
