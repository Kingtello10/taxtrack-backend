const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const { uploadReceipt, getReceipts } = require('../controllers/receipt.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Configure multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/'); // make sure this folder exists
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

router.post('/', authMiddleware, upload.single('file'), uploadReceipt);
router.get('/', authMiddleware, getReceipts);

module.exports = router;

