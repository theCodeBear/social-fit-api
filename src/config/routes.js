'use strict';

const mw = require('./middleware');

module.exports = function(router) {
// users
  router.post('/users/login', require('./../routes/user/login'));
  router.post('/users/authenticate', require('./../routes/user/authenticate'));
// workouts
  router.get('/workouts', 
              mw.authentication,
              mw.identify,
              require('./../routes/workout/index'));

  router.post('/workouts',
               mw.authentication,
               mw.identify,
               require('./../routes/workout/create'));

  router.get('/workouts/:workoutId',
              require('./../routes/workout/show'));

  router.put('/workouts/:workoutId',
              require('./../routes/workout/update'));

  router.delete('/workouts/:workoutId',
                 mw.authentication,
                 mw.identify,
                 require('./../routes/workout/destroy'));

  // router.get('/example', mw.authentication, function(req, res) { console.log('in example'); res.send();});
};
