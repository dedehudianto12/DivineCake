"use strict"

const {Cart, Product} = require("../models");
const product = require("../models/product");

class CartController{
  static create(req, res, next) {
    const cart_body = {
      user_id: req.userId,
      product_id: req.body.product_id,
      quantity: parseInt(req.body.quantity),
    };

    let foundProduct;
    let existingCart;

    Product.findByPk(req.body.product_id)
      .then((product) => {
        if (!product) {
          next({
            name: 'not found',
            message: 'Product not found',
          });
          return Promise.reject(); // To break the promise chain
        }

        if (cart_body.quantity > product.stock) {
          next({
            name: 'forbidden',
            message: 'The product quantity you are trying to add is too many',
          });
          return Promise.reject(); // To break the promise chain
        }
        foundProduct = product;
        return Cart.findOne({
          where: { user_id: req.userId, product_id: req.body.product_id }
        })
      })
      .then((cart) => {
        existingCart = cart;
        if (existingCart) {
          // Product already in the cart, update the quantity
          const updatedQuantity = existingCart.quantity + cart.quantity;
          return existingCart.update({ quantity: updatedQuantity });
        } else {
          // Product not in the cart, create a new entry
          console.log(cart)
          return Cart.create(cart_body);
        }
      })
      .then((createdCart) => {
        if (!existingCart) {
          // If creating a new entry, use the createdCart
          existingCart = createdCart;
        }
        existingCart.dataValues["Product"] = foundProduct
        res.status(201).json({
          message: 'Successfully added item to cart',
          cart: existingCart,
        });
      })
      .catch((error) => {
        next(error);
      });
    }
      

    static find_cart(req, res, next) {
      Cart.findAll({where: {user_id: req.userId}, include: [Product]})
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
      Cart.findAll({include: [Product]})
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

    static delete(req, res, next) {
      const cart_id = req.params.id;
  
      // Store the user_id before deletion for fetching updated carts later
  
      Cart.destroy({
            where: {
                id: cart_id,
            },
        })
          .then(()=>{
            return Cart.findAll({where: {user_id: req.userId}, include: [Product]})
          })
          .then((carts)=>{
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