const userMethods = require('./methods/users');

// Define our handlers
const handlers = {
  sample: (data, callback) => {
    callback(406, { 'name': 'Sample Handler'})
  },
  ping: (data, callback) => {
    callback(200, {})
  },
  users: (data, callback) => {
    const acceptableMethods = ['post', 'get', 'put', 'delete'];
    if (acceptableMethods.indexOf(data.method) > -1) {
      userMethods[data.method](data, callback);
    } else {
      callback(405)
    };
  },
  notFound: (data, callback) => {
    callback(404, {})
  },
}

module.exports = handlers;