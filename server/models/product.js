'use strict';

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class Product extends Model {}

  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'Name is required' },
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'Description is required' },
      },
    },
    image: {
      type: DataTypes.STRING, // You might want to use a different data type depending on how you store images
      allowNull: true, // Adjust this based on your requirements
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isFloat: true,
        min: 0, // Adjust the minimum price as needed
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'Stock is required' },
        isInt: { args: true, msg: 'Stock must be an integer' },
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'Category ID is required' },
        isInt: { args: true, msg: 'Category ID must be an integer' },
      },
    },
  }, {
    sequelize,
    modelName: 'Product',
  });

  
  Product.associate = (models) => {
    Product.belongsTo(models.Category, { foreignKey: 'category_id' });
  };

  return Product;
};
