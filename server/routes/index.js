"use strict"

const express = require('express')
const router = express.Router()

const user_routes = require("./user")
const admin_routes = require("./admin")
const auth_routes = require("./auth")


router.use('/users', user_routes)
router.use('/admins', admin_routes)
router.use('/auth', auth_routes)

module.exports = router