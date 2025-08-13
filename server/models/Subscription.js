const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  stripeSubscriptionId: { type: String, required: true },
  status: { type: String, required: true },
  currentPeriodEnd: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Subscription', SubscriptionSchema);
