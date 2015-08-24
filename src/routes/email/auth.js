'use strict';

var crypto = require('crypto');
var mandrill = require('node-mandrill')(process.env.MANDRILL_ACCESS_KEY);
var User = require('./../../models/user');

// takes receiver email,name
module.exports = function(receiver, cb) {
  // generate 4 byte (8 hex character) code
  var code = crypto.randomBytes(4).toString('hex');
  User.create({name: receiver.name, email: receiver.email, authCode: code}, function(err) {
    if (err) return cb(err);
    // send an e-mail to user about the pending request
    mandrill('/messages/send', {
      message: {
        to: [{email: receiver.email, name: receiver.name}],
        from_email: 'toddkronenberg@gmail.com',
        subject: 'Fit Friend Login Code',
        text: `Hi ${receiver.name}, ready to get fit?! Enter this code into the Fit Friend app in order to login:\n\n${code}\n\nIf you did not just try to login to Fit Friend please ignore and delete this email.`
      }
    },
    function(error, response) {
      // uh oh, there was an error
      if (error) return cb('Error sending email, please try again.');
      else return cb(null);
    });
  });
};