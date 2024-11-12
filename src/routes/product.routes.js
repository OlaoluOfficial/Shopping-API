const express = require('express');
const router = express.Router();
const Product = require('../controllers/product.controllers');

// Add Validators
router.post('/', new Product().addProduct);
router.get('/', new Product().getProductCache);

module.exports = router;