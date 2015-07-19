var secrets = require('../config/secrets');
var stripe = require('stripe')(secrets.stripe.secretKey);
var Order = require('../models/Order');
var User = require('../models/User');

/**
 * GET /checkout
 * Stripe API example.
 */
exports.checkout = function(req, res) {
  var amount = '';
  var url = 'checkout/checkout';
  if(req.body.price) {
    amount = req.body.price.replace('.', '').replace('$', '');
  } else {
    url = 'checkout/postCheckout';
  }
  res.render(url, {
    title: 'Checkout',
    publishableKey: secrets.stripe.publishableKey,
    amount: amount,
    username: req.body.username,
    price: req.body.price,
    printedFileName: '3d_thingy.stl'
  });
};

/**
 * POST /checkout
 * Make a payment.
 */
exports.postStripe = function(req, res, next) {
  var stripeToken = req.body.stripeToken;
  var stripeEmail = req.body.stripeEmail;
  var order = new Order({
      timeStamp: Date.now,
      fileName: req.body.fileName,
      seller: req.body.sellerName,
      price: req.body.price + " (in USD)",
      rating : 0
  });
  if (req.user) {
      User.findById(req.user.id, function (err, user) {
          if (err) {
              return console.log(err);
          }
          user.accountHistory.orderedPrints.push(order);
          user.save(function (err) {
              if (err) {
                  console.log(err);
              }
          });
      });
  }

  stripe.charges.create({
    amount: req.body.amount,
    currency: 'usd',
    card: stripeToken,
    description: stripeEmail
  }, function(err, charge) {
    if (err && err.type === 'StripeCardError') {
      req.flash('errors', { msg: 'Your card has been declined.' });
      res.redirect('checkout/postCheckout');
    }
    req.flash('success', { msg: 'Your card has been charged successfully.' });
    res.render('checkout/postCheckout', {
      charge: charge
    });
  });
};
