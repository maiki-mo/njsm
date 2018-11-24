// Library for storing and editing data
const fs = require('fs');
const path = require('path');

// Create a base directory for the data folder
const baseDir = path.join(__dirname, './../.data')

// Create a container for this module
const lib = {
  create: (dir, filename, data, callback) => {
    console.log(baseDir + dir + '/' + filename);
    fs.open(baseDir + dir + filename + '.json', 'wx', (err, descrip) => {
      if (!err && descrip) {
        
        // Convert data to a string and write the file to data
        fs.writeFile(descrip, JSON.stringify(data), (err) => {
          if (!err) {
            fs.close(descrip, (err) => {
              if (!err) {
                callback('File created');
              } else {
                callback('Error closing new file');
              }
            })
          } else {
            callback('Error writing to file');
          }
        })
      } else {
        callback('Could not create new file--it may already exist');
      }
    });
  },
}

// Export the module
module.exports = lib;
