// Library for storing and editing data
const fs = require('fs');
const path = require('path');

// Create a base directory for the data folder
const baseDir = path.join(__dirname, './../.data')

// Create a container for this module
const lib = {
  update: (dir, filename, data, callback) => {
    fs.open(baseDir + dir + filename + '.json', 'r+', (err, fileDescriptor) => {
      if (!err && fileDescriptor) {

        // Convert data to a string
        const stringData = JSON.stringify(data);

        // Truncate the file
        fs.truncate(fileDescriptor, (err) => {
          if (!err) {
            // Write to the file and close it
            fs.writeFile(fileDescriptor, stringData, (err) => {
              if (!err) {
                fs.close(fileDescriptor, (err) => {
                  if (!err) {
                    callback(false);
                  } else {
                    callback('Error closing the file');
                  }
                })
              } else {
                callback('Error writing to existing file');
              }
            })
          } else {
            callback('Error truncating file');
          }
        })
      } else {
          callback('Could not open file for update');
      }
    });
  },
}

// Export the module
module.exports = lib;
