// Import local methods
const { read, create } = require('./lib/read-data');
const { hash } = require('./helpers/helpers');

// Define our handlers
const handlers = {
  sample: (data, callback) => {
    callback(406, { 'name': 'Sample Handler'})
  },
  ping: (data, callback) => {
    callback(200, {})
  },
  users: {
    func: (data, callback) => {
      const acceptableMethods = ['post', 'get', 'put', 'delete'];
      if (acceptableMethods.indexOf(data.method) > -1) {
        handlers.users[data.method](data, callback);
      } else {
        callback(405)
      };
    },
    methods: {
      post: (data, callback) => {
        // Check that all required fields are filled out
        const firstName = typeof(data.payload.firstName) === 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
        const lastName = typeof(data.payload.lastName) === 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
        const phone = typeof(data.payload.phone) === 'string' && data.payload.phone.trim().length === 10 ? data.payload.phone.trim() : false;
        const password = typeof(data.payload.password) === 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
        const tosAgreement = typeof(data.payload.tosAgreement) === 'boolean' && data.payload.tosAgreement === true ? true : false;

        if (firstName && lastName && phone && password && tosAgreement) {
          // Make sure that the user does not already exist
          read('users', phone, (err, data) => {
            if (!err) {
              // Hash the password
              const hashedPassword = hash(password);

              // Create the user
              const user = {
                firstName,
                lastName,
                phone,
                password: hashedPassword,
                tosAgreement,
              };

              // Store the user
              create('\\users', phone, user, (err) => {
                if (!err) {
                  callback(200);
                } else {
                  console.log(err);
                  callback(400, { "Error": "Could not create a new user" })
                }
              })

            } else {
              callback(400, { "Error": "User with phone number already exists" })
            }
          })
        } else {
          callback(400, { "Error": "Missing required fields" })
        }
      },
      get: (data, callback) => {

      },
      put: (data, callback) => {

      },
      delete: (data, callback) => {

      },
    }
  },
  notFound: (data, callback) => {
    callback(404, {})
  },
}

module.exports = handlers;
