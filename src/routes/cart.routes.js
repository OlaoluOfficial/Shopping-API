const express = require('express');
const router = express.Router();
const Cart = require('../controllers/cart.controllers');

router.post('/', new Cart().addItem);

module.exports = router;