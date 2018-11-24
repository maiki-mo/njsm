/*
*
* Primary file for the API
*
*/

// Import Node dependencies
const http = require('http');
const https = require('https');
const fs = require('fs');

// Import local files
const config = require('./config');
const singleServer = require('./single-server');
const { create, updae, read, deleteFile } = require('./lib/index');

// TESTING
// @TODO delete this

// Create
// create('\\test', '\\newFile', { "dog": "cat" }, (result) => {
//   console.log('Result:', result);
// })

// Read
// read('\\test', '\\newFile', (err, result) => {
//   if (!err) {
//     console.log('Result:', result);
//   } else {
//     console.log('There was an error:', err);
//   }
// })

// Update
// update('\\test', '\\newFile', { "fizz": "buzz" }, (err) => {
//   console.log('There was an error:', err);
// })

// Delete
// deleteFile('\\test', '\\newFile', (err) => {
//   console.log('There was an error:', err);
// });

// The server should respond to all requests with a string
const httpServer = http.createServer((req, res) => {
  singleServer(req, res);
})

// The server should respond to all requests with a string
const httpsServerOptions = {
  key: fs.readFileSync('./https/key.pem'),
  cert: fs.readFileSync('./https/cert.pem'),
};

const httpsServer = https.createServer(httpsServerOptions, (req, res) => {
  singleServer(req, res);
})

const { httpPort, httpsPort } = config;

// Start the server and listen on port
  httpsServer.listen(httpsPort, () => {
  console.log('Server listening on port', httpsPort);
});

// Start the server and listen on port
httpServer.listen(httpPort, () => {
  console.log('Server listening on port', httpPort);
});