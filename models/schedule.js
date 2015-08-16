'use strict';

var mongoose = require('mongoose');
var Schedule;

var scheduleSchema = new mongoose.Schema({
  parent:     { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  workouts:   [{ type: mongoose.Schema.ObjectId, ref: 'WorkoutDate' }],
  createdAt:  { type: Date, default: Date.now, required: true }
});



Schedule = mongoose.model('Schedule', scheduleSchema);
module.exports = Schedule;