'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Products', 'price', {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isFloat: true,
        min: 0, // Adjust the minimum price as needed
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Products', 'price');
  },
};
