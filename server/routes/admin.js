"use strict"

const express = require('express')
const admin_controller = require('../controller/adminController')
const product_controller = require('../controller/productController')
const uploadImageMiddleware = require('../middleware/imageUpload')
const router = express.Router()
const multer = require('multer');

const storage = multer.memoryStorage(); // You can customize storage options
const upload = multer({ storage: storage });

router.post('/register', admin_controller.create)

router.post("/product", upload.single('image'), uploadImageMiddleware, product_controller.create);

router.get("/product", product_controller.find_all);

router.get("/product/:id", product_controller.find_by_id)

router.patch("/product/:id", upload.single('image'), uploadImageMiddleware, product_controller.update)

router.delete("/product/:id", product_controller.delete)

module.exports = router