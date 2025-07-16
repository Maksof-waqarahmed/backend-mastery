const express = require('express');
const {userLogin, userRegister} = require('../controllers/auth-controller')
const router = express.Router();

// all routes are related to authentication or authorization

router.post('/register', userRegister);
router.post('/login', userLogin);

module.exports = router;