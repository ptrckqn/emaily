var express       = require('express'),
    router        = express.Router(),
    keys          = require('../config/keys'),
    stripe        = require('stripe')(keys.stripeSecretKey),
    requireLogin  = require("../middlewares/requireLogin");

router.post('/api/stripe',requireLogin, async (req, res) =>{
  var charge = await stripe.charges.create({
    amount: 500,
    currency: 'usd',
    description: '$5 for 5 credits',
    source: req.body.id
  });

  req.user.credits += 5;
  var user = await req.user.save();

  res.send(user);
});

module.exports = router;
