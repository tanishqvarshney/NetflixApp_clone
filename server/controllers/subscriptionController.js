const Stripe = require('stripe');
const User = require('../models/User');
const Subscription = require('../models/Subscription');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Stripe price IDs (replace with your actual Stripe price IDs)
const PRICES = {
  monthly: 'price_monthly_id', // replace with your Stripe price ID for monthly
  yearly: 'price_yearly_id',   // replace with your Stripe price ID for yearly
};

// Get subscription status
exports.getSubscriptionStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ status: user.isSubscribed ? 'active' : 'inactive' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Subscribe user (simplified version without Stripe for now)
exports.subscribe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    user.isSubscribed = true;
    await user.save();
    
    res.json({ message: 'Subscription activated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createCheckoutSession = async (req, res) => {
  try {
    const { plan } = req.body; // 'monthly' or 'yearly'
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer_email: user.email,
      line_items: [
        {
          price: PRICES[plan],
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/subscription-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/subscription-cancel`,
    });
    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Stripe webhook to update subscription status
exports.stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  // Handle subscription events
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const customerEmail = session.customer_email;
    const subscriptionId = session.subscription;
    const user = await User.findOne({ email: customerEmail });
    if (user) {
      user.isSubscribed = true;
      user.subscriptionId = subscriptionId;
      await user.save();
      await Subscription.create({
        user: user._id,
        stripeSubscriptionId: subscriptionId,
        status: 'active',
      });
    }
  } else if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object;
    const user = await User.findOne({ subscriptionId: subscription.id });
    if (user) {
      user.isSubscribed = false;
      user.subscriptionId = null;
      await user.save();
      await Subscription.findOneAndUpdate(
        { stripeSubscriptionId: subscription.id },
        { status: 'canceled' }
      );
    }
  }
  res.json({ received: true });
};
