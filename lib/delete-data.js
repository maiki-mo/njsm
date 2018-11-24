// Library for storing and editing data
const fs = require('fs');
const path = require('path');

// Create a base directory for the data folder
const baseDir = path.join(__dirname, './../.data')

// Create a container for this module
const lib = {
  deleteFile: (dir, filename, callback) => {
    fs.unlink(baseDir + dir + filename + '.json', (err) => {
      callback(err);
    });
  },
}

// Export the module
module.exports = lib;
