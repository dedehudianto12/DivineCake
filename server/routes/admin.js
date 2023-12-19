"use strict"

const express = require('express')
const admin_controller = require('../controller/adminController')
const router = express.Router()

router.post('/register', admin_controller.create)
router.post('/upload', admin_controller.upload)

module.exports = router