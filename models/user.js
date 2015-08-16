'use strict';

var mongoose = require('mongoose');
var User;

var userSchema = new mongoose.Schema({
  email:          { type: String, required: true },
  name:           { type: String, required: true },
  friends:        [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  spotify:        { type: mongoose.Schema.ObjectId, ref: 'Spotify' }, // maybe just String??
  workouts:       [{ type: mongoose.Schema.ObjectId, ref: 'Workout' }],
  todaysWorkout:  { type: mongoose.Schema.ObjectId, ref: 'RecordedWorkout'},
  schedule:       { type: mongoose.Schema.ObjectId, ref: 'Schedule' },
  // playlists: [{ type: mongoose.Schema.ObjectId, ref: 'Playlist'}],
  createdAt:      { type: Date, default: Date.now, required: true }
});

userSchema.statics.create = function(payload, cb) {
  console.log('in model payload', payload);
};


User = mongoose.model('User', userSchema);
module.exports = User;
