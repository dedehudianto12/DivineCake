"use strict"

// multer.js
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
  keyFilename: "../image/divinecake.json",
});

const bucket = storage.bucket('divinecake');

const multerStorage = multer.memoryStorage();
const multerUpload = multer({ storage: multerStorage });

module.exports = { multerUpload, bucket };
