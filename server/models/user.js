'use strict';

const bcrypt = require("../helper/bcrypt")

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model {}

  User.init({
    nickname: {
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        notEmpty: {args: true, msg: "nickname is requred"}
      }
    },
    full_name: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {args: true, msg: "full_name is requred"}
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email address already in use!',
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email is required',
        },
        isEmail: {
          args: true,
          msg: 'Invalid email address',
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'password is required' }
      }
    },
    phone_number: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {args: true, msg: "full_name is requred"}
      }
    },
    addres: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {args: true, msg: "full_name is requred"}
      }
    },
    role: {
      type: DataTypes.ENUM,
      values: ['user', 'admin']
    },
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, options) => {
        let pass = user.password
        let new_pass = bcrypt.generate_password(pass)
        user.password = new_pass
      }
    }
  });
  return User;
};