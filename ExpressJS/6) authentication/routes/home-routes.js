const express = require('express');
const  authMiddleware  = require('../middleware/auth-middleware');
const router = express.Router();

router.get('/welcome', authMiddleware, (req, res) => {
    res.json("Welcome Home Page");
});

module.exports = router;