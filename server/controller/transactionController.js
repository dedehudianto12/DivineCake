"use strict"

const {Transaction, TransactionItem, Product, Cart} = require("../models")

class TransactionController{

    static async checkout(req, res, next){
        try{
            const body = {
                userId: req.userId,
                orderDate: new Date(),
                deliveryDate: req.body.deliveryDate,
                status: "pending",
                paymentMethod: req.body.paymentMethod
            }

            const transaction = await Transaction.create(body);
            const cartItems = await Cart.findAll({
                where: { user_id: req.userId },
                include: [{ model: Product }]
              });
            
            console.log(cartItems)
            const transactionItems = cartItems.map((cartItem) => ({
                transactionId: transaction.id,
                productId: cartItem.Product.id,
                quantity: cartItem.quantity,
                unitPrice: cartItem.Product.price,
                subtotal: cartItem.quantity * cartItem.Product.price,
            }));

            await TransactionItem.bulkCreate(transactionItems);

            await Cart.destroy({ where: { user_id: req.userId } });

            res.status(200).json({ message: 'Checkout successful', transaction });
            
        }catch(error){
            return next(error)
        }
    }

    static async create(req, res, next){
        try{
            const body = {
                userId: req.userId,
                orderDate: new Date(),
                deliveryDate: req.body.deliveryDate,
                status: "pending",
                paymentMethod: req.body.paymentMethod
            }
    
            const transaction = await Transaction.create(body);
            const productItems = req.body.productItems
            const transactionItems = await Promise.all(
                productItems.map(async (productItem)=>{
                    const {productId, quantity} = productItem
                    const product = await Product.findByPk(productId)
    
                    if (!product) {
                        throw new Error(`Product with ID ${productId} not found`);
                      }
              
                    if (quantity > product.stock) {
                    throw new Error(`Insufficient stock for product with ID ${productId}`);
                    }
    
                    return TransactionItem.create({
                    transactionId: transaction.id,
                    productId,
                    quantity,
                    unitPrice: product.price, 
                    subtotal: quantity * product.price,
                    });
                })
            )
            const totalAmount = transactionItems.reduce((total, item) => total + item.subtotal, 0);
    
            await transaction.update({ totalAmount });
    
            return res.status(201).json({
            message: 'Transaction created successfully',
            transaction,
            transactionItems,
            });
        }catch(error){
            return next(error)
        }
    }

    static find_all(req, res, next){
        Transaction.findAll()
            .then((transactions)=>{
                if(!transactions){
                    return res.status(404).json({ message: "Transactions not found" });
                }
                res.status(200).json({
                    message: "Success fetch a cart",
                    payload: transactions,
                  });
            })
            .catch((error) => {
                next(error);
              });
    }

    static delete(req, res, next){
        const transaction_id = req.params.id
        Transaction.destroy({
            where: {
                id: transaction_id
            }
        })
            .then(affected_row =>{
                if(affected_row === 0){
                    return res.status(404).send('Transaction not found');
                }
                res.status(200).json({ message: 'Transaction deleted successfully' });
            })
            .catch(next)
    }

    static update_status(req, res, next){
        const transaction_id = req.params.id
        const updated_transaction_data = req.body
        Transaction.update(updated_transaction_data, {
            where: {id: transaction_id}
        })
            .then(([affected_row])=>{
                if (!affected_row){
                    return res.status(404).send("Transaction not found")
                }
                res.status(200).json({
                    message: "Transaction updated successfully"
                })
            })
            .catch(next)
    }
        
}

module.exports = TransactionController