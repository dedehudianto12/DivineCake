"use strict"

// multer.js
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
  keyFilename: "../image/clean-mountain-329507-74218f6f2950.json",
});

const bucket = storage.bucket('divinecake');

const multerStorage = multer.memoryStorage();
const multerUpload = multer({ storage: multerStorage });

module.exports = { multerUpload, bucket };
