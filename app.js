'use strict';

var express = require('express'),
    logger = require('morgan'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

// running some basic Express middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// middleware
var middleware = require('./config/middleware');
app.use(middleware.beforeAll);
app.use(middleware.cors);

// link to the routes file which links to all the individual routes
require('./config/routes')(app);

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
