// Define our hadlers
const handlers = {
  sample: (data, callback) => {
    callback(406, { 'name': 'Sample Handler'})
  },
  ping: (data, callback) => {
    callback(200, {})
  },
  notFound: (data, callback) => {
    callback(404, {})
  },
}

module.exports = handlers;
