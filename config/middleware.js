'use strict';

module.exports = {
// APPLICATION LEVEL MIDDLEWARE TO BE RUN ON ALL ROUTES
  beforeAll: require('./../middleware/applicationLevel/beforeAll'),
  cors: require('./../middleware/applicationLevel/cors')
};
