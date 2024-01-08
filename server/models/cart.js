"use strict"

module.exports = (sequelize, DataTypes)=>{
    const Model = sequelize.Sequelize.Model;
    class Cart extends Model {}

    Cart.init({
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {args: true, msg: "User ID is required"},
                isInt: {args: true, msg: "User ID must be an integer"}
            }
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {args: true, msg: "Product ID is required"},
                isInt: {args: true, msg: "Product ID must be an integer"}
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {args: true, msg: "Product ID is required"},
                isInt: {args: true, msg: "Product ID must be an integer"}
            }
        }
    },{
        sequelize,
        modelName: "Cart",
    });

    Cart.associate = (models) => {
        Cart.belongsTo(models.User, {foreignKey : "user_id"});
        Cart.belongsTo(models.Product, {foreignKey: "product_id"});
    }

    return Cart;
};