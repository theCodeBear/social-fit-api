'use strict';

const Workout = require('./../../models/workout');

module.exports = (req, res) => {
  console.log('in the update workout route');
  res.status(200).end();
};
