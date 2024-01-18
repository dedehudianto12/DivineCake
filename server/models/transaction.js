"use strict"

module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('Transaction', {
      orderDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      deliveryDate: {
        type: DataTypes.DATE,
        allowNull: true, // You may adjust this based on your business rules
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['pending', 'processing', 'completed', 'canceled']],
        },
        defaultValue: 'pending',
      },
      paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
        validate: {
          isFloat: true,
        },
      },
      // Add any other fields you need for your transactions
    });
  
    Transaction.associate = (models) => {
      Transaction.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
  
      Transaction.hasMany(models.TransactionItem, {
        foreignKey: 'transactionId',
        as: 'items',
      });
    };
  
    return Transaction;
  };
  