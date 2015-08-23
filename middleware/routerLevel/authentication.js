'use strict';

var jwt = require('jwt-simple');

module.exports = function(req, res, next) {
  var token = req.headers.authorization.split(' ')[1];
  try {
    jwt.decode(token, process.env.TOKEN_SECRET);
  } catch(err) {
    return res.status(500).send('You are not logged in');
  }
  next();
};