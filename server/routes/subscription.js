const express = require('express');
const router = express.Router();
const { createCheckoutSession, stripeWebhook } = require('../controllers/subscriptionController');
const { protect } = require('../middleware/auth');

router.post('/create-checkout-session', protect, createCheckoutSession);

// Stripe webhook endpoint (raw body required)
router.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

module.exports = router;
