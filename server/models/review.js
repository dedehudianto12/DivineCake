"use strict"

module.exports = (sequelize, DataTypes)=>{
    const Model = sequelize.Sequelize.Model;
    class Review extends Model {}

    Review.init({
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
        rating: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notEmpty: {args: true, msg: "Rating is required"},
                isFloat: {args: true, msg: "Rating must be a float"}
            }
        },
        review: {
            type: DataTypes.STRING,
            allowNull : false,
            validate: {
                notEmpty: {args: true, msg: "Name is required"}
            }
        }
    },{
        sequelize,
        modelName: "Review",
    });

    Review.associate = (models) => {
        Review.belongsTo(models.User, {foreignKey : "user_id"});
        Review.belongsTo(models.Product, {foreignKey: "product_id"});
    }

    return Review;
};