const { create } = require('./create-data');
const { update } = require('./update-data');
const { deleteFile } = require('./delete-data');
const { read } = require('./read-data');

module.exports = {
    create,
    update,
    deleteFile,
    read
};
