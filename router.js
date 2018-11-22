const handlers = require('./handlers');

// Define a request router
const router = {
  'sample' : handlers.sample,
  'ping' : '',
}

module.exports = router;
  