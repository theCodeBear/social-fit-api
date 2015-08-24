'use strict';

const User = require('./../../models/user');

module.exports = function(req, res) {
  User.authenticate(req.body, function(err, user) {
    if (err) return res.status(500).send(err);
    let token = user.token();
    user = user.sanitize();
    return res.send({user: user, token: token});
  });
};