'use strict';

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class Category extends Model {}

  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'Category name is required' },
      },
    },
  }, {
    sequelize,
    modelName: 'Category',
  });

  Category.associate = (models) => {
    // A Category has many Products
    Category.hasMany(models.Product, { foreignKey: 'category_id' });
  };

  return Category;
};
