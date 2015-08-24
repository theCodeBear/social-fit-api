'use strict';

var express = require('express'),
    router = express.Router(),
    middleware = require('./config/middleware'),
    logger = require('morgan'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

// run some basic Express middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// run application-level middleware (before all routes)
app.use(middleware.beforeAll);
app.use(middleware.cors);

// link to routes file which has all routes, then link router to root app path '/'
require('./config/routes')(router);
app.use('/', router);

// run application-level middleware (before all routes)
// ... no 'after' middleware yet

// connect to mongo
mongoose.connect('mongodb://localhost/fitFriend');

// run Express web server
http.listen(3000, function() {
  var port = http.address().port;
  console.log('serving on port %s', port);
});

// socket.io
// io.on('connection', function(socket) {

//   socket.emit('user connected', 'you connected!');

// });

module.exports = app;
