var secrets = require('../config/secrets');
var stripe = require('stripe')(secrets.stripe.secretKey);

/**
 * GET /checkout
 * Stripe API example.
 */
exports.checkout = function(req, res) {
  res.render('checkout/checkout', {
    title: 'Checkout',
    publishableKey: secrets.stripe.publishableKey,
    amount: 250,//req.amount,
    name: 'ken',//req.name,
    price: '$2.50'//req.price
  });
};

/**
 * POST /checkout
 * Make a payment.
 */
exports.postStripe = function(req, res, next) {
  var stripeToken = req.body.stripeToken;
  var stripeEmail = req.body.stripeEmail;
  stripe.charges.create({
    amount: req.body.amount,
    currency: 'usd',
    card: stripeToken,
    description: stripeEmail
  }, function(err, charge) {
    if (err && err.type === 'StripeCardError') {
      req.flash('errors', { msg: 'Your card has been declined.' });
      res.redirect('/checkout');
    }
    console.log(charge);
    req.flash('success', { msg: 'Your card has been charged successfully.' });
    res.render('checkout/postCheckout', {
      charge: charge,
      hello: 'hello'
    });
  });
};
