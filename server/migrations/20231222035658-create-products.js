'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: 'Name is required' }
        }
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: 'Description is required' }
        }
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true // Adjust based on image storage
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: 'Stock is required' },
          isInt: { args: true, msg: 'Stock must be an integer' }
        }
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: 'Category ID is required' },
          isInt: { args: true, msg: 'Category ID must be an integer' }
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};
