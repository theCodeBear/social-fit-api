'use strict';

const mongoose = require('mongoose'),
      jwt = require('jwt-simple'),
      moment = require('moment');

const userSchema = new mongoose.Schema({
  email:          { type: String, required: true },
  authCode:       { type: String },   // null value if not currently trying to be verified
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
  payload.email = payload.email.toLowerCase();
  User.findOne({email: payload.email}, function(err, user) {
    if (err) return cb('Error');
    if (user) {
      if (user.name === payload.name) {
        user.authCode = payload.authCode;
        user.save(cb(null));
      } else {
        cb('Name does not match our records');
      }
    } else {
      user = new User(payload);
      user.save(function(err, user) {
        if (err) {
          console.log('err', err);
          return cb('Error Saving User');
        }
        cb(null);
      });
    }
  });
};

userSchema.statics.authenticate = function(payload, cb) {
  User.findOne({email: payload.email, name: payload.name}).exec(function(err, user) {
    if (err) return cb('Error finding user');
    if (!user) return cb('Email and Name have not been submitted yet');
    if (user.authCode && user.authCode === payload.code) {
      user.authCode = null;
      user.save(function(err, user) {
        if (err) {
          console.log('err', err);
          return cb('Error Saving User');
        }
        cb(null, user);
      });
    } else {
      return cb('The code did not match the one sent to your email');
    }
  });
};

userSchema.methods.token = function() {
  let payload = {
    sub: this._id,
    iat: moment().unix()
  };
  return jwt.encode(payload, process.env.TOKEN_SECRET);
};

userSchema.methods.sanitize = function() {
  let userObject = this.toObject();
  delete userObject.authCode;
  return userObject;
};

userSchema.statics.addWorkout = (userId, workoutId, cb) => {
  User.findById(userId, (err, user) => {
    if (err || !user) return cb('Error finding user');
    console.log(user.workouts);
    user.workouts.push(workoutId);
    console.log(user.workouts);
    cb(null);
  });
};

const User = mongoose.model('User', userSchema);
module.exports = User;
