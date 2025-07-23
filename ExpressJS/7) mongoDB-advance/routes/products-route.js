const express = require('express');
const { addProducts, getProducts } = require('../controllers/products');

const router = express.Router();

router.post('/add-products', addProducts);
router.get('/get', getProducts)
module.exports = router;