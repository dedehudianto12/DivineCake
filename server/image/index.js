"use strict"

const Cloud = require('@google-cloud/storage')
const path = require('path')
const serviceKey = path.join(__dirname, './divinecake.json')

const { Storage } = Cloud
const storage = new Storage({
  keyFilename: serviceKey,
  projectId: 'divinecake',
})

module.exports = storage