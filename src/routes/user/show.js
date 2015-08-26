'use strict';

const User = require('./../../models/user');

// takes userId, returns fully populated user
module.exports = (req, res) => {
  User.findById(req.params.userId)
  .populate('friends workouts')
  .exec((err, user) => {
    if (err || !user) return res.status(500).send('Error getting user');
    console.log('popped user', user);
    user = user.sanitize();
    // deserialize the user's workout's exercises
    user.workouts = user.workouts.map((workout) => {
      return workout.exercises.map((exercise) => {
        return JSON.parse(exercise);
      });
    });
    return res.send({user: user});
  });
};