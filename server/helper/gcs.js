"use strict"

// gcs.js
const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
  keyFilename: 'path/to/your/keyfile.json',
});

module.exports = storage;
