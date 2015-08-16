'use strict';

module.exports = function(app) {
  // app.get('/user', require('./../routes/'));
  app.post('/user', require('./../routes/user/create'));
};
