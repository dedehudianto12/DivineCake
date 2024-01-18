"use strict"

const express = require('express')
const admin_controller = require('../controller/adminController')
const product_controller = require('../controller/productController')
const cart_controller = require("../controller/cartController")
const transaction_controller = require("../controller/transactionController")
const uploadImageMiddleware = require('../middleware/imageUpload')
const {authenticateAdmin} = require("../middleware/auth")
const router = express.Router()
const multer = require('multer');

const storage = multer.memoryStorage(); // You can customize storage options
const upload = multer({ storage: storage });

router.post('/register', admin_controller.create)

router.use(authenticateAdmin)

router.post("/product", upload.single('image'), uploadImageMiddleware, product_controller.create);

router.get("/product", product_controller.find_all);

router.get("/product/:id", product_controller.find_by_id)

router.patch("/product/:id", upload.single('image'), uploadImageMiddleware, product_controller.update)

router.delete("/product/:id", product_controller.delete)

router.get("/transaction", transaction_controller.find_all)

router.delete("/transaction/:id", transaction_controller.delete)

router.patch("/transaction/:id", transaction_controller.update_status)

module.exports = router