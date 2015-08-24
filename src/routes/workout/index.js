'use strict';

const Workout = require('./../../models/workout');

// handler for:     GET /workouts     or    GET /workouts?user=userID
// gets all the user's workouts when given a userId querystring
module.exports = function(req, res) {
  console.log('in the workout/index route');
  console.log('req.query', req.query);
  Workout.findById(req.query.user, (err, workouts) => {
    if (err) return res.status(500).send('Error getting workouts');
    return res.send({workouts: workouts});
  });
};