'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Beverage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Beverage.belongsToMany(models.Ingredient,{through: 'BeverageIngredients'})
      Beverage.belongsTo(models.Category, {foreignKey: 'CategoryId'})
    }
  }
  Beverage.init({
    name:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
			  notNull: {
          args: true,
          msg:"Name is required"
			  },
			  notEmpty: {
          args: true,
          msg:"Name is required"
			  }
			}
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
			  notNull: {
          args: true,
          msg:"Image URL is required"
			  },
			  notEmpty: {
          args: true,
          msg:"Image URL is required"
			  }
			}
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
			  notNull: {
          args: true,
          msg:"Description is required"
			  },
			  notEmpty: {
          args: true,
          msg:"Description is required"
			  }
			}
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
			  notNull: {
          args: true,
          msg:"Price is required"
			  },
			  notEmpty: {
          args: true,
          msg:"Price is required"
			  }
			}
    },
    CategoryId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Categories',
        key: 'id'
      },
      validate: {
			  notNull: {
          args: true,
          msg:"Category is required"
			  },
			  notEmpty: {
          args: true,
          msg:"Category is required"
			  }
			}
    },
    AuthorId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Beverage',
  });
  return Beverage;
};