"use strict"

const express = require('express')
const user_controller = require('../controller/userController')
const router = express.Router()

router.post('/register', user_controller.create)

module.exports = router