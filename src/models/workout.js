'use strict';

const mongoose = require('mongoose');
const User = require('./user');

const workoutSchema = new mongoose.Schema({
  title:      { type: String, required: true },
  type:       { type: String },
  datesDone:  [{ type: Date }],
  exercises:  [{ type: String }],       // serialized objects of each exercise
  // exercises:  [{ type: mongoose.Schema.ObjectId, ref: 'Exercise' }],
  createdAt:  { type: Date, default: Date.now, required: true }
});


workoutSchema.statics.create = (workout, userId, cb) => {
  workout.exercises = workout.exercises.map((exercise) => {
    return JSON.stringify(exercise);
  });
  let newWorkout = new Workout(workout);
  newWorkout.save((err) => {
    if (err) return cb('Failed to save workout');
    User.findById(userId, (err, user) => {
      if (err) return cb('Error finding user');
      user.workouts.push(newWorkout._id);
      user.save((err, user) => {
        if (err || !user) return cb('Error saving new workout to user');
        cb(null, user);
      });
    });
  });
};

workoutSchema.statics.destroy = (workoutId, cb) => {
  Workout.findByIdAndRemove(workoutId, (err, workout) => {
    if (err || !workout) return cb('Error deleting workout');
    return cb(null);
  });
};

// deletes a workout from a user's workouts field
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