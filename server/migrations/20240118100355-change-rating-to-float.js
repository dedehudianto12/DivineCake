'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Reviews', 'rating', {
      type: Sequelize.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true,
        isFloat: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Reviews', 'rating', {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        isInt: true,
      },
    });
  },
};
