const handlers = require('./handlers');

// Define a request router
const router = {
  'sample' : handlers.sample,
  'ping' : handlers.ping,
  'users': handlers.users,
}

module.exports = router;
  