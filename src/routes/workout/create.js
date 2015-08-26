'use strict';

const Workout = require('./../../models/workout');

module.exports = (req, res, next) => {
  Workout.create(req.body, req.query.user, (err, user) => {
    if (err) return res.status(500).send(err);
    // setup params for user/show
    req.params.userId = req.query.user;
    next();
  });
};
