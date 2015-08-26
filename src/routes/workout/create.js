'use strict';

const Workout = require('./../../models/workout');

module.exports = (req, res) => {
  console.log('in the workout create route', req.body);
  Workout.create(req.body, req.query.user, (err, user) => {
    console.log('returned from workout create');
    if (err) return res.status(500).send(err);
    user = user.sanitize();
    res.status(200).send({user: user});
  });
};
