'use strict';

module.exports = function(app) {
  // app.post('/user', require('./../routes/user/create'));
  app.post('/user/login', require('./../routes/user/login'));
  app.post('/user/authenticate', require('./../routes/user/authenticate'));
};
