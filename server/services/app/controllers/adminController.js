const {
  Beverage,
  User,
  Category,
  Ingredient,
  BeverageIngredients,
  sequelize,
} = require("../models");
const { createToken } = require("../helpers/jwt");
const { comparePassword } = require("../helpers/bcrypt");

class AdminController {
  static async register(req, res, next) {
    try {
      const user = await User.create(req.body);

      res.status(201).json({
        message: `Admin with email ${user.email} is created`,
        email: user.email,
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    const { email, password } = req.body;
    try {
      if (!email) throw { name: "NoEmail/Password" };

      if (!password) throw { name: "NoEmail/Password" };

      const user = await User.findOne({ where: { email } });
      if (!user) throw { name: "InvalidEmail/Password" };

      const isValidPassword = comparePassword(password, user.password);
      if (!isValidPassword) throw { name: "InvalidEmail/Password" };

      const access_token = createToken({ id: user.id });

      res.status(200).json({ access_token, email: user.email });
    } catch (err) {
      next(err);
    }
  }

  static async fetchBeverages(req, res, next) {
    try {
      const beverages = await Beverage.findAll({
        include: [
          {
            model: Category,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: Ingredient,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
        order: [["id", "ASC"]],
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
        include: [
          {
            model: Ingredient,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: Category,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
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

  static async addBeverage(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const { name, imgUrl, description, price, CategoryId, inputIngredients, AuthorId } =
        req.body;
        console.log(req.body);
        console.log(inputIngredients, 'INI');

        if(inputIngredients.length < 3) {
            return res.status(400).json({message: 'Please fill in 3 ingredients'})
        }

      const beverage = await Beverage.create(
        { name, imgUrl, description, price, CategoryId, AuthorId },
        { transaction: t }
      );
      

        const ingredients = await BeverageIngredients.bulkCreate(
        [
            { BeverageId: beverage.id, IngredientId: Number(inputIngredients[0])},
            { BeverageId: beverage.id, IngredientId: Number(inputIngredients[1])},
            { BeverageId: beverage.id, IngredientId: Number(inputIngredients[2])},
        ],
        { transaction: t }
        );


      t.commit();

      res.status(201).json({ message: `'${beverage.name}' added to menu` });
    } catch (err) {
      t.rollback();
      next(err);
    }
  }

  static async editBeverage(req, res, next) {
    try {
      const { name, imgUrl, description, price, CategoryId, AuthorId } = req.body;

      await Beverage.update(
        { name, imgUrl, description, price, CategoryId, AuthorId},
        { where: { id: req.params.id } }
      );

      const beverage = await Beverage.findByPk(req.params.id);

      res
        .status(200)
        .json({ message: `Product with id ${beverage.id} updated` });
    } catch (err) {
      next(err);
    }
  }

  static async deleteBeverage(req, res, next) {
    try {
      await Beverage.destroy({
        where: { id: req.params.id },
      });
      res.status(200).json({ message: "Success deleted from menu" });
    } catch (err) {
      next(err);
    }
  }

  static async fetchIngredients(req, res, next) {
    try {
      const ingredients = await Ingredient.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.status(200).json(ingredients);
    } catch (err) {
      next(err);
    }
  }

  static async fetchCategories(req, res, next) {
    try {
      const categories = await Category.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.status(200).json(categories);
    } catch (err) {
      next(err);
    }
  }

  static async fetchCategoryById(req, res, next) {
    try {
      const category = await Category.findByPk(req.params.id)
      res.status(200).json(category);
    } catch (err) {
      next(err);
    }
  }

  static async addCategory(req, res, next) {
    try {
      const foundCategory = await Category.findOne({
        where: { name: req.body.name },
      });
      if (foundCategory) throw { name: "Already Registered" };
      const category = await Category.create(req.body);
      res
        .status(200)
        .json({ message: `'${category.name}' added to categories list` });
    } catch (err) {
      next(err);
    }
  }

  static async editCategory(req, res, next) {
    try {
      const prevCategory = await Category.findByPk(req.params.id);
      await Category.update(
        {
          name: req.body.name,
        },
        { where: { id: req.params.id } }
      );
      const category = await Category.findByPk(req.params.id);
      res.status(200).json({
        message: `'${prevCategory.name}' updated to '${category.name}'`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      await Category.destroy({
        where: { id: req.params.id },
      });
      res.status(200).json({ message: "Success deleted from categories list" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AdminController;
