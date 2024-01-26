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
      

    static find_cart(req, res, next) {
        Cart.findAll({where: {user_id: req.userId}})
          .then((carts) => {
            if (!carts) {
              return res.status(404).json({ message: "Cart not found" });
            }
            res.status(200).json({
              message: "Success fetch a cart",
              payload: carts,
            });
          })
          .catch((error) => {
            next(error);
          });
    }

    static find_all(req, res, next){
      Cart.findAll()
        .then((carts)=>{
          res.status(200).json({
            message: "Success fetch all cart",
            payload: carts
          })
        })
        .catch((error)=>{
          next(error)
        })
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

    static update(req, res, next) {
        const cartId = req.params.id;
        const newQuantity = parseInt(req.body.quantity);
      
        Cart.findByPk(cartId)
          .then((cart) => {
            if (!cart) {
              return res.status(404).json({ message: "Cart not found" });
            }
      
            Product.findByPk(cart.product_id)
              .then((product) => {
                if (!product) {
                  return res.status(404).json({ message: "Product not found" });
                }
      
                if (newQuantity > product.stock) {
                  return res.status(400).json({
                    message: "The new quantity exceeds the available stock",
                  });
                }
      
                cart.quantity = newQuantity;
                return cart.save();
              })
              .then((updatedCart) => {
                res.status(200).json({
                  message: "Successfully updated cart quantity",
                  cart: updatedCart,
                });
              })
              .catch(next);
          })
          .catch(next);
      }
      
}

module.exports = CartController