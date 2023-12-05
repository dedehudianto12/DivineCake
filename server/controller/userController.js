"use strict"


const {User} = require("../models")
const token = require('../helper/token')

class UserController{
    static create(req, res, next){
        const body = {
            nickname: req.body.nickname,
            full_name: req.body.full_name,
            email: req.body.email,
            password: req.body.password,
            phone_number: req.body.phone_number,
            addres: req.body.addres,
            role: "user"
        }
        User.create(body)
            .then(user=>{
                const user_token = token.generate_token(user)
                res.status(201).json({
                    access_token: user_token
                })
            })
            .catch(next)
        
    }
}

module.exports = UserController