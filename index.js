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
const { create } = require('./lib/data');

// TESTING
// @TODO delete this
create('\\test', '\\newFile', { "dog": "cat" }, (result) => {
  console.log('Result:', result);
})

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