const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const { uploadReceipt, getReceipts } = require('../controllers/receipt.controller');
const authMiddleware = require('../middleware/auth.middleware');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

router.post('/', authMiddleware, upload.single('file'), uploadReceipt);

router.get('/', authMiddleware, getReceipts);

router.get('/test', (req, res) => {
  res.json({ message: 'Receipts API is working' });
});

module.exports = router;
