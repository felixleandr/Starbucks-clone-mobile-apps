const {Beverage, Ingredient, Category, User} = require('../models')

class Controller {
    static async fetchBeverages(req, res, next) {
        try {
          const beverages = await Beverage.findAll({
            include: [{
              model: Ingredient,
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              }},
              {model: Category,
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              }},
              {model: User,
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'password']
              }}
            ],
            order: [["id", "DESC"]],
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          });
          res.status(200).json(beverages);
        } catch (err) {
          next(err);
        }
      }
    
      static async fetchBeverageById(req, res, next) {
        try {
          const beverage = await Beverage.findOne({
            include: [{
              model: Ingredient,
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              }},
              {model: Category,
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              }},
              {model: User,
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'password']
              }}
            ],
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            where: { id: req.params.id },
          });
          res.status(200).json(beverage);
        } catch (err) {
          next(err);
        }
      }
}

module.exports = Controller