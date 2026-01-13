const router = require('express').Router();
const { register, login } = require('../controllers/auth.controller');

router.post('/register', register);
router.post('/login', login);

router.get('/', (req, res) => {
  res.json({ message: 'Auth API is working' });
});

module.exports = router;
