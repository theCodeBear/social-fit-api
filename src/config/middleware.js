'use strict';

module.exports = {
// APPLICATION LEVEL MIDDLEWARE TO BE RUN ON ALL ROUTES
  beforeAll: require('./../middleware/applicationLevel/beforeAll'),
  cors: require('./../middleware/applicationLevel/cors'),

// ROUTER LEVEL MIDDLEWARE TO BE RUN ON SPECIFIC ROUTES
  authentication: require('./../middleware/routerLevel/authentication'),
  identify: require('./../middleware/routerLevel/identify')
};
