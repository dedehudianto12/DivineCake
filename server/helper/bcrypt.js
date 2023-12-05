"use strict"

const bcrypt = require("bcrypt")

function generate_password(passwod){
    const salt = bcrypt.genSaltSync(8)
    const hash = bcrypt.hashSync(passwod, salt)
    return hash
}

function check_password(passwod, hash){
    const check = bcrypt.compareSync(passwod, hash)
    return check
}

module.exports = {
    generate_password,
    check_password
}