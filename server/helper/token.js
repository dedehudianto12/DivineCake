"use strict"

const jwt = require('jsonwebtoken')

function generate_token(user){
    const token = jwt.sign({id: user.id, email:user.email}, process.env.JWT_SECRET)
    return token
}

function check_token(token){
    const check = jwt.verify(token, process.env.JWT_SECRET)
    return check
}

module.exports = {
    generate_token,
    check_token
}