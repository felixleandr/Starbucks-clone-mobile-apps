'use strict';
const {hashPassword} = require('../helpers/bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: {
				args: true,
				msg: "Email already registered"
			},
			validate: {
			  notNull: {
          args: true,
          msg:"Email is required"
			  },
			  notEmpty: {
          args: true,
          msg:"Email is required"
			  },
			  isEmail:{
          args: true,
          msg: "Email format is invalid"
			  }
			}
		}, 
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
			  notNull: {
          args: true,
          msg:"Password is required"
			  },
			  notEmpty: {
          args: true,
          msg:"Password is required"
			  },
        len: {
          args: [5],
          msg: 'Password require minimum 5 characters'
          }
			}
    }
  }, {
    hooks: {
			beforeCreate: (user) => {
				user.password = hashPassword(user.password)
			}
		},
    sequelize,
    modelName: 'User',
  });
  return User;
};