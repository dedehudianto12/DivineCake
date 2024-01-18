'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('TransactionItems', 'transactionId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Transactions',
        key: 'id',
      },
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('TransactionItems', 'transactionId');
  },
};
