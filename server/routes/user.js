"use strict"

const express = require('express')
const user_controller = require('../controller/userController')
const product_controller = require('../controller/productController')
const cart_controller = require("../controller/cartController")
const transaction_controller = require("../controller/transactionController")
const review_controller = require("../controller/reviewController")
const {authenticate, authorizeCart, authorizeReview} = require("..//middleware/auth")
const router = express.Router()

router.post('/register', user_controller.create)

router.use(authenticate)

router.get("/product", product_controller.find_all);

router.get("/product/:id", product_controller.find_by_id)

router.post("/cart", cart_controller.create)

router.get("/cart", cart_controller.find_cart)

router.get("/transaction", transaction_controller.find_by_user)

router.use("/cart/:id", authorizeCart)

router.delete("/cart/:id", cart_controller.delete)

router.patch("/cart/:id", cart_controller.update)

router.post("/review", review_controller.create)

router.get("/review/:id", review_controller.find_by_product)

router.use("/review/:id", authorizeReview)

router.patch("/review/:id", review_controller.update)

router.delete("/review/:id", review_controller.destroy)

router.post("/transaction", transaction_controller.create)

router.post("/checkout", transaction_controller.checkout)

module.exports = router