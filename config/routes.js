'use strict';

var mw = require('./middleware'),
    login = require('./../routes/user/login'),
    authenticate = require('./../routes/user/authenticate');

module.exports = function(router) {
  // app.post('/user', require('./../routes/user/create'));
  router.post('/user/login', login);
  router.post('/user/authenticate', authenticate);
};
