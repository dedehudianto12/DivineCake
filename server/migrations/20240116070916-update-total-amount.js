"use strict"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transactions', {

      totalAmount: {
        type: Sequelize.FLOAT,
        allowNull: true, // Allow NULL temporarily
        defaultValue: null,
        validate: {
          isFloat: true,
        },
      },

    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Transactions');
  },
};
