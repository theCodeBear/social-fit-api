'use strict';

var emailAuth = require('./../email/auth');

module.exports = function(req, res) {
  emailAuth(req.body, function(err) {
    if (err) return res.status(500).send(err);
    return res.status(200).send();
  });
};