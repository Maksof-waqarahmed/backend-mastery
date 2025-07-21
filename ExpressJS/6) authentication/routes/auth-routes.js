const express = require('express');
const { userLogin, userRegister, changePassword } = require('../controllers/auth-controller');
const authMiddleware = require('../middleware/auth-middleware');
const router = express.Router();

// all routes are related to authentication or authorization

router.post('/register', userRegister);
router.post('/login', userLogin);
router.post('/change-password', authMiddleware, changePassword);

module.exports = router;