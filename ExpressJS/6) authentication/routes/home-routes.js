const express = require('express');
const { authMiddleware } = require('../middleware/auth-middleware');
// const {userLogin, userRegister} = require('../controllers/auth-controller')
const router = express.Router();

// all routes are related to authentication or authorization

router.get('/welcome', authMiddleware, (req, res) => {
    res.json("Welcome Home Page");
});

module.exports = router;