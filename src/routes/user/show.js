'use strict';

const User = require('./../../models/user');

// takes userId, returns fully populated user
module.exports = (req, res) => {
  User.findById(req.params.userId)
  .populate('friends workouts')
  .exec((err, user) => {
    if (err || !user) return res.status(500).send('Error getting user');
    user = user.sanitize();
    // deserialize the user's workouts' exercises
    user.workouts.forEach((workout) => {
      workout.exercises = workout.exercises.map((exercise) => {
        return JSON.parse(exercise);
      });
    });
    return res.send({user: user});
  });
};