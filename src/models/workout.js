'use strict';

const mongoose = require('mongoose');
const User = require('./user');

const workoutSchema = new mongoose.Schema({
  title:      { type: String, required: true },
  type:       { type: String },
  datesDone:  [{ type: Date }],
  exercises:  [{ type: String }],       // exercises and amount are parallel arrays
  amount:     [{ type: Number }],
  createdAt:  { type: Date, default: Date.now, required: true }
});


workoutSchema.statics.destroy = (workoutId, cb) => {
  Workout.findByIdAndRemove(workoutId, (err, workout) => {
    if (err || !workout) return cb('Error deleting workout');
    return cb(null);
  });
};

workoutSchema.statics.deleteFromUser = (workoutId, userId, cb) => {
  User.findById(userId, (err, user) => {
    if (err || !user) return cb('Error finding user');
    console.log('user to delete workout from', user);
    const indexOfWorkout = user.workouts.indexOf(workoutId);
    if (indexOfWorkout !== -1) {
      user.workouts.splice(indexOfWorkout,1);
      user.save((err, user) => {
        if (err) return cb('Error saving updated user');
        cb(null, user);
      });
    }
  });
};

const Workout = mongoose.model('Workout', workoutSchema);
module.exports = Workout;