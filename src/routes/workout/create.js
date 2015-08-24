'use strict';

const Workout = require('./../../models/workout');

module.exports = (req, res) => {
  console.log('in the workout create route');
  res.status(200).end();
};
