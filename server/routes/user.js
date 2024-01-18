"use strict"

const express = require('express')
const user_controller = require('../controller/userController')
const product_controller = require('../controller/productController')
const cart_controller = require("../controller/cartController")
const transaction_controller = require("../controller/transactionController")
const {authenticate, authorizeCart} = require("..//middleware/auth")
const { route } = require('./admin')
const router = express.Router()

router.post('/register', user_controller.create)

router.use(authenticate)

router.get("/product", product_controller.find_all);

router.get("/product/:id", product_controller.find_by_id)

router.post("/cart", cart_controller.create)

router.get("/cart", cart_controller.find_cart)

router.use("/cart/:id", authorizeCart)

router.delete("/cart/:id", cart_controller.delete)

router.patch("/cart/:id", cart_controller.update)

router.post("/transaction", transaction_controller.create)

router.post("/checkout", transaction_controller.checkout)

module.exports = router