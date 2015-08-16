'use strict';

exports.module = function(req, res) {
  console.log('login body', req.body);
  res.status(200);
};