"use strict"

require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.POST || 3000
const routes = require('./routes')
const cors = require('cors')
const error_handler = require("./middleware/errorHandler")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', routes)
app.use(error_handler)

app.listen(port, ()=> console.log(`Example app listening on port ${port}!`))