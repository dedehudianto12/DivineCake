"use strict"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transactions', {

      totalAmount: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0, // Set your desired default value
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
