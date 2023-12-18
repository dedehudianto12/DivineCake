"use strict"

const express = require('express')
const auth_controller = require('../controller/authController')
const router = express.Router()

router.post('/login', auth_controller.login)

module.exports = router