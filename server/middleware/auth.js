"use strict"

const {User, Cart, Admin, Review} = require("../models")
const {check_token} = require("../helper/token")

function authenticate(req, res, next){
    try{
        const token = check_token(req.headers.access_token)
        if (token.type === "user"){
            User.findByPk(token.id)
                .then(user=>{
                    if(!user){
                        next({message: "User not found"})
                    }else{
                        req.userId = token.id
                        next()
                    }
                })
        }else{
            next({
                name: "Forbidden",
                message: "You are not authorize"
            })
        }
    }
    catch(err){
        next(err)
    }
}

function authenticateAdmin(req, res, next){
    try{
        const token = check_token(req.headers.access_token)
        if (token.type === "admin"){
            Admin.findByPk(token.id)
                .then((admin)=>{
                    if(!admin){
                        next({message: "Admin not found"})
                    }else{
                        req.adminId = token.id
                        next()
                    }
                })
        }else{
            next({
                name: "Forbidden",
                message: "You are not authorize"
            })
        }
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

function authorizeReview(req, res, next){
    try{
        const reviewId = req.params.id
        const userId = req.userId

        Review.findOne({
            where: {
                id: reviewId,
                user_id: userId
            }
        })
            .then((review)=>{
                if(!review){
                    return res.status(403).json({
                        message: "Unauthorized - Access denied" 
                    })
                }else{
                    req.reviewId = review.id
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
    authorizeCart,
    authorizeReview,
    authenticateAdmin
}

