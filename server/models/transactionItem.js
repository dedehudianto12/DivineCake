"use strict"

module.exports = (sequelize, DataTypes) => {
    const TransactionItem = sequelize.define('TransactionItem', {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1, // Ensure quantity is at least 1
        },
      },
      unitPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          isFloat: true,
          min: 0, // Ensure unit price is non-negative
        },
      },
      subtotal: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          isFloat: true,
          min: 0, // Ensure subtotal is non-negative
        },
      },
      transactionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Transactions',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      // Add any other fields you need for your transaction items
    });
  
    TransactionItem.associate = (models) => {
      TransactionItem.belongsTo(models.Transaction, {
        foreignKey: 'transactionId',
        onDelete: 'CASCADE',
      });
  
      TransactionItem.belongsTo(models.Product, {
        foreignKey: 'productId',
        onDelete: 'CASCADE',
      });
    };
  
    // Calculate subtotal before saving the transaction item
    TransactionItem.beforeCreate((transactionItem) => {
      transactionItem.subtotal = transactionItem.quantity * transactionItem.unitPrice;
    });
  
    return TransactionItem;
  };
  