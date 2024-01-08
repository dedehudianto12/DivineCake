"use strict"

const {Admin, Product} = require("../models")
const token = require("../helper/token")
const storage = require('../image/index');

class AdminController{
    static create(req, res, next){
        const body = {
            nickname: req.body.nickname,
            full_name: req.body.full_name,
            email: req.body.email,
            password: req.body.password,
        }
        Admin.create(body)
            .then(admin=>{
                const admin_token = token.generate_token(admin)
                res.status(201).json({
                    access_token: admin_token
                })
            })
            .catch(next)
        
    }

}

module.exports = AdminController