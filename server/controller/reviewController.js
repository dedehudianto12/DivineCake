"use strict"

const {Review} = require("../models")

class ReviewController{
    static create(req, res, next){
        const body = {
            user_id : req.userId,
            product_id : req.body.product_id,
            rating : req.body.rating,
            review: req.body.review
        }

        Review.create(body)
            .then((review)=>{
                res.status(201).json({
                    message: "Successfully add a review",
                    review: review,
                  });
            })
            .catch((err)=>{
                next(err)
            })
    }

    static update(req, res, next){
        const review_id = req.params.id 
        const updated_review_data = req.body
        Review.update(updated_review_data, {
            where: {id: review_id}
        })
        .then(([affected_row])=>{
            if (!affected_row){
                return res.status(404).send("Review not found")
            }
            res.status(200).json({
                message: "Review updated successfully"
            })
        })
        .catch(next)
    }

    static destroy(req, res, next){
        const review_id = req.params.id
        Review.destroy({
            where: {
                id: review_id
            }
        })
        .then(affected_row=>{
            if(affected_row === 0){
                return res.status(404).send('Transaction not found');
            }
            res.status(200).json({ message: 'Transaction deleted successfully' });
        })
        .catch((err)=>{
            next(err)
        })
    }

    static find_by_product(req, res, next){
        const product_id = req.params.id
        Review.findAll({where: {product_id}})
            .then((reviews)=>{
                if (!reviews) {
                    return res.status(404).json({ message: "Cart not found" });
                  }
                  res.status(200).json({
                    message: "Success fetch reviews for this product",
                    payload: reviews,
                  });
            })
            .catch((error) => {
                next(error);
              });
    }
}

module.exports = ReviewController