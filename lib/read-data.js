// Library for storing and editing data
const fs = require('fs');
const path = require('path');

// Create a base directory for the data folder
const baseDir = path.join(__dirname, './../.data')

// Create a container for this module
const lib = {
  read: (dir, filename, callback) => {
    fs.readFile(baseDir + dir + filename + '.json', 'utf8', (err, data) => {
      callback(err, data);
    });
  },
}

// Export the module
module.exports = lib;
