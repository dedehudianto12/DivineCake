"use strict"

module.exports = (sequelize, DataTypes)=>{
    const Model = sequelize.Sequelize.Model;
    class Promotion extends Model {}

    Promotion.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notEmpty: { args: true, msg: 'name is required' },
            },
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notEmpty: { args: true, msg: 'description is required' },
            },
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: {args: true, msg: "start_date ID is required"}
            }
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: {args: true, msg: "end_date ID is required"}
            }
        },
        discount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {args: true, msg: "discount is required"}
            }
        }
    },{
        sequelize,
        modelName: "Promotion",
    });

    return Promotion;
};