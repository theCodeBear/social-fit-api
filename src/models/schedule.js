'use strict';

const mongoose = require('mongoose');
// let Schedule = {};

const scheduleSchema = new mongoose.Schema({
  parent:     { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  workouts:   [{ type: mongoose.Schema.ObjectId, ref: 'WorkoutDate' }],
  createdAt:  { type: Date, default: Date.now, required: true }
});



const Schedule = mongoose.model('Schedule', scheduleSchema);
module.exports = Schedule;