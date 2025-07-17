const express = require('express');
const authMiddleware = require('../middleware/auth-middleware');
const adminRouteMiddleware = require('../middleware/admin-middleware');
const uploadMiddleware = require('../middleware/image-middleware')
const { uplaodImage } = require('../controllers/image-controller');
const router = express.Router();

router.post('/upload', authMiddleware, adminRouteMiddleware, uploadMiddleware.single('image'), uplaodImage);

module.exports = router;