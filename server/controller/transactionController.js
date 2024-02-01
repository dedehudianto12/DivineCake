"use strict"

const {User, Transaction, TransactionItem, Product, Cart} = require("../models")

class TransactionController{

    static async checkout(req, res, next){
        try{
            const body = {
                userId: req.userId,
                orderDate: new Date(),
                deliveryDate: req.body.deliveryDate,
                status: "pending",
                paymentMethod: "transfer"
            }

            const transaction = await Transaction.create(body);
            const cartItems = await Cart.findAll({
                where: { user_id: req.userId },
                include: [{ model: Product }]
              });
            
            const transactionItems = cartItems.map((cartItem) => ({
                transactionId: transaction.id,
                productId: cartItem.Product.id,
                quantity: cartItem.quantity,
                unitPrice: cartItem.Product.price,
                subtotal: cartItem.quantity * cartItem.Product.price,
            }));

            await TransactionItem.bulkCreate(transactionItems);

            await Cart.destroy({ where: { user_id: req.userId } });

            const totalAmount = transactionItems.reduce((total, item) => total + item.subtotal, 0);

            await transaction.update({ totalAmount });

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

    static find_by_user(req, res, next) {
      const userId = req.userId;
    
      Transaction.findAll({
        where: { userId: userId }, // Add a where condition to filter by user ID
        include: [
          {
            model: User,
            attributes: ['id', 'nickname', 'email'],
          },
          {
            model: TransactionItem,
            as: 'items',
            attributes: ['quantity', 'unitPrice', 'subtotal'],
            include: [
              {
                model: Product,
                attributes: ['id', 'name', 'price'],
              },
            ],
          },
        ],
      })
        .then((transactions) => {
          if (!transactions) {
            return res.status(404).json({ message: 'Transactions not found' });
          }
          res.status(200).json({
            message: 'Success fetch transactions',
            payload: transactions,
          });
        })
        .catch((error) => {
          next(error);
        });
    }

    static find_all(req, res, next) {
        Transaction.findAll({
          include: [
            {
              model: User,
              attributes: ['id', 'nickname', 'email'], // Include only the desired user attributes
            },
            {
              model: TransactionItem,
              as: 'items',
              attributes: ['quantity', 'unitPrice', 'subtotal'],
              include: [
                {
                  model: Product,
                  attributes: ['id', 'name', 'price'], // Include only the desired product attributes
                },
              ],
            },
          ],
        })
          .then((transactions) => {
            if (!transactions) {
              return res.status(404).json({ message: 'Transactions not found' });
            }
            res.status(200).json({
              message: 'Success fetch transactions',
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


    static update_status = async (req, res, next) => {
      try {
        const transactionId = req.params.id;
        const updatedTransactionData = req.body;
    
        const transaction = await Transaction.findByPk(transactionId, {
          include: [{
            model: TransactionItem,
            as: 'items',
            include: Product,
          }],
        });
    
        if (!transaction) {
          return res.status(404).send("Transaction not found");
        }
    
        const currentStatus = transaction.status;
        const newStatus = updatedTransactionData.status;
    
        const [affectedRows, [updatedTransaction]] = await Transaction.update(updatedTransactionData, {
          where: { id: transactionId },
          returning: true,
        });
    
        if (!affectedRows) {
          return res.status(404).send("Transaction not found");
        }
    
        if (currentStatus === 'pending' && newStatus === 'processing') {
          const updatePromises = transaction.items.map(async (item) => {
            const productId = item.Product.id;
            const newQuantity = item.Product.dataValues.stock - item.quantity;
    
            const [affectedProductRows, [updatedProduct]] = await Product.update(
              { stock: newQuantity },
              { where: { id: productId }, returning: true }
            );
    
            return updatedProduct;
          });
    
          const updatedProducts = await Promise.all(updatePromises);
    
          return res.status(200).json({
            message: "Transaction updated successfully",
            updatedTransaction,
            updatedProducts,
          });
        }
    
        return res.status(200).json({
          message: "Transaction updated successfully",
          updatedTransaction,
        });
      } catch (error) {
        next(error);
      }
    };
    
    

        
}

module.exports = TransactionController