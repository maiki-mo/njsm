// Import local methods
const { read } = require('./../lib/read-data');
const { create } = require('./../lib/create-data');
const { hash } = require('./../helpers/helpers');

const userMethods = {
    post: (data, callback) => {
      // Check that all required fields are filled out
      const firstName = typeof(data.payload.firstName) === 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
      const lastName = typeof(data.payload.lastName) === 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
      const phone = typeof(data.payload.phone) === 'string' && data.payload.phone.trim().length === 10 ? data.payload.phone.trim() : false;
      const password = typeof(data.payload.password) === 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
      const tosAgreement = typeof(data.payload.tosAgreement) === 'boolean' && data.payload.tosAgreement === true ? true : false;

      if (firstName && lastName && phone && password && tosAgreement) {
        // Make sure that the user does not already exist
        read('\\users', '\\' + phone, (err, data) => {
          if (err) {
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
            create('\\users', '\\' + phone, user, (err) => {
              if (err) {
                callback(200);
              } else {
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
  };

  module.exports = userMethods;
