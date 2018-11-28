// Helpers for various tasks

// Dependencies
const crypto = require('crypto');
const config = require('./../config');

const helpers = {
  hash: (string) => {
    if (typeof (string) === 'string' && string.length > 0) {
      const hash = crypto.createHmac('sha256', config.hashingSecret).update(string).digest('hex');
      return hash;
    } else {
      return false;
    }
  },
  parseJSONtoObject: (buffer) => {
    try {
      return JSON.parse(buffer);
    } catch (err) {
      return {};
    };
  },
}

module.exports = helpers;
