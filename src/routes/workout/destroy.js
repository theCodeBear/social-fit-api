'use strict';

const Workout = require('./../../models/workout');

module.exports = (req, res) => {
  console.log('in the destroy workout route');
  const userId = req.query.user;
  const workoutId = req.params.workoutId;
  if (!userId || !workoutId) return res.status(400);
  Workout.destroy(workoutId, (err) => {
    if (err) return res.status(500).send(err);
    Workout.deleteFromUser(workoutId, userId, (err) => {
      if (err) return res.status(500).send(err);
      return res.status(200).end();
    });
  });
};
