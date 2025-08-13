const express = require('express');
const router = express.Router();
const { createCheckoutSession, stripeWebhook, getSubscriptionStatus, subscribe } = require('../controllers/subscriptionController');
const { protect } = require('../middleware/auth');

// Get subscription status
router.get('/status', protect, getSubscriptionStatus);

// Subscribe user
router.post('/subscribe', protect, subscribe);

router.post('/create-checkout-session', protect, createCheckoutSession);

// Stripe webhook endpoint (raw body required)
router.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

module.exports = router;
