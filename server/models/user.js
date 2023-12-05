'use strict';

module.exports = (sequelize, DataTypes) => {
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
      validate: {
        notEmpty: { args: true, msg: 'email is required' },
        checkUnique(data) {
          return User.findOne({ where: { email: data } })
            .then(user => {
              if (user) {
                throw new Error('Email address already in use!')
              }
            })
        }
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
  });
  return User;
};