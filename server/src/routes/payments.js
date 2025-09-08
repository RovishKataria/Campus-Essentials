const express = require('express');
const router = express.Router();
const { createCheckoutSession } = require('../controllers/paymentController');
const { authenticate } = require('../middleware/auth');

router.post('/create-checkout-session', authenticate, createCheckoutSession);

module.exports = router;


