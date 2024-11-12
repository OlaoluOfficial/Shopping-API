const express = require('express');
const router = express.Router();
const Payment = require('../controllers/payment.controllers');

router.post('/checkout/:user_id', new Payment().checkout);

module.exports = router;