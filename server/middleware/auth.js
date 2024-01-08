"use strict"

const {User, Cart} = require("../models")
const {check_token} = require("../helper/token")

function authenticate(req, res, next){
    try{
        const token = check_token(req.headers.access_token)
        User.findByPk(token.id)
            .then(user=>{
                if(!user){
                    next({message: "User not found"})
                }else{
                    req.userId = token.id
                    next()
                }
            })
    }
    catch(err){
        next(err)
    }
}

function authorizeCart(req, res, next){
    try{
        const cartId = req.params.id
        const userId = req.userId
        console.log(cartId)
        Cart.findOne({
            where: {
                id: cartId,
                user_id: userId
            }
        })
            .then((cart)=>{
                if(!cart){
                    return res.status(403).json({
                        message: "Unauthorized - Access denied" 
                    })
                }else{
                    req.cartId = cart.id
                    next()
                }
            })
    }
    catch(err){
        next
    }
}

module.exports = {
    authenticate,
    authorizeCart
}

