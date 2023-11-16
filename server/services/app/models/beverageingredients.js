'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BeverageIngredients extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BeverageIngredients.belongsTo(models.Beverage, {foreignKey: "BeverageId"})
      BeverageIngredients.belongsTo(models.Ingredient, {foreignKey: "IngredientId"})
    }
  }
  BeverageIngredients.init({
    BeverageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
			  notNull: {
          args: true,
          msg:"Beverage ID is required"
			  },
			  notEmpty: {
          args: true,
          msg:"Beverage ID is required"
			  }
			}
    },
    IngredientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
			  notNull: {
          args: true,
          msg:"Ingredient ID is required"
			  },
			  notEmpty: {
          args: true,
          msg:"Ingredient ID is required"
			  }
			}
    }
  }, {
    sequelize,
    modelName: 'BeverageIngredients',
  });
  return BeverageIngredients;
};