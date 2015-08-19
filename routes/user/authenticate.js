'use strict';

var User = require('./../../models/user');

module.exports = function(req, res) {
  User.authenticate(req.body, function(err, user) {
    if (err) return res.status(500).send(err);
    user = user.sanitize();
    return res.send({user: user});
  });
};