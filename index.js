/*
*
* Primary file for the API
*
*/

// Dependencies

const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

// The server should respond to all requests with a string
const server = http.createServer((req, res) => {

  // Get the URL and parse it
  const parseURL = url.parse(req.url, true);

  // Get the path from the URL
  const path = parseURL.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');
  
  // Get query string as an object
  const queryStringObject = parseURL.query;

  // Get the HTTP Method
  const method = req.method.toLowerCase();

  // Get the headers
  const headers = req.headers;

  // Get the payload that is sent
  const decoder = new StringDecoder('utf-8');
  let buffer = '';
  req.on('data', (data) => {
    buffer += decoder.write(data);
  });

  req.on('end', () => {
    buffer += decoder.end();

    if (buffer.length < 1) {
      buffer = 'There was no payload';
    }

    // Send a response
    res.end('Hello World\n');

    // Log what request
    console.log(`Request was received on this path: ${trimmedPath}\nwith method: ${method}\nwith query strings: ${JSON.stringify(queryStringObject)}\nwith the headers: ${JSON.stringify(headers)}\n with the payload: ${buffer}`);
  });
})

// Start the server and listen on port 3000
server.listen(3000, () => {
  console.log('Server listening on port: 3000');
});
