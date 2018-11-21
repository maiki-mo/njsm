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

    // Choose the handler this request should go to (if not found, use 'Not Found' handler)
    const chosenHandler = router[trimmedPath] ? router[trimmedPath] : handlers.notFound;

    // Construct data object to send to handler
    const data = {
      trimmedPath,
      queryStringObject,
      method,
      headers,
      'payload': buffer,
    }

    // Route the req to the handler specified to the router
    chosenHandler(data, (statusCode, payload) => {
      // Use the default status code or statusCode by callback
      statusCode = typeof(statusCode) === 'number' ? statusCode : 200;

      // Use the default payload or use the payload used by callback
      payload = typeof(payload) === 'object' ? payload : {};

      // Convert payload to a string
      const payloadString = JSON.stringify(payload);

      // Return the response
      res.writeHead(statusCode);
      res.end(payloadString);

      // Log what request
      console.log(`Request was received on this path: ${trimmedPath}\nwith method: ${method}\nwith query strings: ${JSON.stringify(queryStringObject)}\nwith the headers: ${JSON.stringify(headers)}\n with the payload: ${JSON.stringify(payload)}`);
    })
  });
})

// Start the server and listen on port 3000
server.listen(3000, () => {
  console.log('Server listening on port: 3000');
});

// Define our hadlers
const handlers = {
  sample: (data, callback) => {
    callback(406, { 'name': 'Sample Handler'} )
  },
  notFound: (data, callback) => {
    callback(404, {} )
  },
}

// Define a request router
const router = {
  'sample' : handlers.sample,
}