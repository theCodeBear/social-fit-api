'use strict';

var mongoose = require('mongoose');
var WorkoutDate;

var workoutDateSchema = new mongoose.Schema({
  datetime:   { type: Date, requied: true },
  title:      String,
  friend:     { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  workout:    { type: mongoose.Schema.ObjectId, ref: 'Workout' },
  createdAt:  { type: Date, default: Date.now, required: true }
});



WorkoutDate = mongoose.model('WorkoutDate', workoutDateSchema);
module.exports = WorkoutDate;