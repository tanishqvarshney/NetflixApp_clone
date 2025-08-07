exports.requireSubscription = (req, res, next) => {
  if (req.user && req.user.isSubscribed) {
    next();
  } else {
    res.status(402).json({ message: 'Subscription required' });
  }
};
