"use strict"

const {Cart, Product} = require("../models")

class CartController{
    static create(req, res, next) {
        const cart = {
          user_id: req.userId,
          product_id: req.body.product_id,
          quantity: parseInt(req.body.quantity),
        };
      
        Product.findByPk(req.body.product_id)
            .then((product) => {
                if (!product) {
                next({
                    name: "not found",
                    message: "Product not found",
                });
                return Promise.reject(); // To break the promise chain
                }
    
        
                if (cart.quantity > product.stock) {
                next({
                    name: "forbidden",
                    message: "The product quantity you are trying to add is too many",
                });
                return Promise.reject(); // To break the promise chain
                }
        
                return Cart.create(cart);
            })
            .then((createdCart) => {
                res.status(201).json({
                message: "Successfully added item to cart",
                cart: createdCart,
                });
            })
            .catch((error) => {
                next(error);
            });
    }
      

    static find_one(req, res, next) {
        const cart_id = req.params.id;
        Cart.findByPk(cart_id)
          .then((cart) => {
            if (!cart) {
              return res.status(404).json({ message: "Cart not found" });
            }
      
            res.status(200).json({
              message: "Success fetch a cart",
              payload: cart,
            });
          })
          .catch((error) => {
            next(error);
          });
    }

    static delete(req, res, next){
        const cart_id = req.params.id
        Cart.destroy({
            where: {
                id: cart_id
            }})
            .then(affected_row =>{
                if(affected_row === 0){
                    return res.status(404).send('Product not found');
                }
                res.status(200).json({ message: 'Product deleted successfully' });
            })
            .catch(next)
        
    }
}

module.exports = CartController