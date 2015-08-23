'use strict';

module.exports = function(req, res, next) {
  console.log('in the cors middleware');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
};