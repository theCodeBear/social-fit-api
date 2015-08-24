'use strict';

const jwt = require('jwt-simple');

// decode token to get user id, validate that it equals req.query.user
module.exports = (req, res, next) => {
  if (req.query.user) {
    let token = req.headers.authorization.split(' ')[1];
    token = jwt.decode(token, process.env.TOKEN_SECRET);
    if (token.sub === req.query.user) next();
    else return res.status(401).end();
  } else next();
};