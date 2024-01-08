"use strict"

const {Product} = require("../models")

class ProductController{
    static create(req, res, next){
        console.log(req.body)
        const imageUrl = req.imageUrl;
        const product = {
            name : req.body.name,
            description: req.body.description,
            image: imageUrl,
            stock: req.body.stock,
            category_id: req.body.category_id
        }
        
        Product.create(product)
            .then(admin=>{
                res.status(201).json({
                    message: "Succesfully create a product"
                })
            })
            .catch(next)
    }

    static find_all(req, res, next){
        Product.findAll()
            .then(product=>{
                res.status(200).json({
                    message: "Success fetch all product",
                    payload: product
                })
            })
            .catch((next))
    }
    
    static find_by_id(req, res, next){
        const product_id = req.params.id;
        Product.findByPk(product_id)
            .then(product => {
                if (!product) {
                return res.status(404).send('Product not found');
                }
                res.status(200).json({
                    message : "Success fetch a product",
                    payload : product
                });
            })
            .catch(next);
    }

    static update(req, res, next){
        const product_id = req.params.id;
        const updated_product_data = req.body;
        if (req.imageUrl){
            updated_product_data['image'] = req.imageUrl
        }
        Product.update(updated_product_data, {
            where: {id: product_id}
        })
            .then(([affected_row])=>{
                if (!affected_row){
                    return res.status(404).send("Product not found")
                }
                res.status(200).json({
                    message: "Product updated successfully"
                })
            })
            .catch(next) 
    }

    static delete(req, res, next){
        const product_id = req.params.id;
        Product.destroy({
            where: {id: product_id}
        })
            .then(affected_row =>{
                if(affected_row === 0){
                    return res.status(404).send('Product not found');
                }
                res.status(200).json({ message: 'Product deleted successfully' });
            })
            .catch(next)
    }



}

module.exports = ProductController