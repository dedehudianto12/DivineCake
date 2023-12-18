"use strict"


const {User} = require("../models")
const token = require('../helper/token')
const {check_password} = require("../helper/bcrypt")

class UserController{
    static create(req, res, next){
        const body = {
            nickname: req.body.nickname,
            full_name: req.body.full_name,
            email: req.body.email,
            password: req.body.password,
            phone_number: req.body.phone_number,
            address: req.body.address,
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

    static login(req, res, next) {
        User.findOne({ where: { email: req.body.email } })
            .then(user => {
                if (!user){
                    next({message: "email/password salah"})
                }else{
                    if (check_password(req.body.password, user.password)){
                        const user_token = token.generate_token(user)
                        res.status(201).json({
                            message: "Success Login",
                            access_token: user_token,
                            user: user
                        })                    
                    }else{
                        next({message: "email/password salah"})
                    }
                }
            })
            .catch(next)
    }
}

module.exports = UserController