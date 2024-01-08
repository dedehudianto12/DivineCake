"use strict"

const express = require('express')
const user_controller = require('../controller/userController')
const product_controller = require('../controller/productController')
const cart_controller = require("../controller/cartController")
const {authenticate, authorizeCart} = require("..//middleware/auth")
const { route } = require('./admin')
const router = express.Router()

router.post('/register', user_controller.create)

router.use(authenticate)

router.get("/product", product_controller.find_all);

router.get("/product/:id", product_controller.find_by_id)

router.post("/cart", cart_controller.create)

router.use("/cart/:id", authorizeCart)

router.delete("/cart/:id", cart_controller.delete)

router.get("/cart/:id", cart_controller.find_one)

module.exports = router