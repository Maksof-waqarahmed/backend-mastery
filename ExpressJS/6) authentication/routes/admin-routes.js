const express = require('express');
const { authMiddleware, adminRouteMiddleware } = require('../middleware/auth-middleware');
const router = express.Router();

router.get('/dashboard', authMiddleware, adminRouteMiddleware, (req, res) => {
    res.json("Welcome To Admin Page");
});

module.exports = router;