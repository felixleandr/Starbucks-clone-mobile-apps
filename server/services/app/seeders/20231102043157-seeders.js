'use strict';
const {hashPassword} = require('../helpers/bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // const users = 
    //   [
    //     {
    //       email: "felix@gmail.com",
    //       password: hashPassword("felix"),
    //       createdAt: new Date(),
    //       updatedAt: new Date()
    //     },
    //     {
    //       email: "test@gmail.com",
    //       password: hashPassword("test"),
    //       createdAt: new Date(),
    //       updatedAt: new Date()
    //     }
    //   ]
    // await queryInterface.bulkInsert('Users', users)
    const categories = require('../data/categories.json').map(el => {
      el.createdAt = el.updatedAt = new Date()
      return el
    })
    await queryInterface.bulkInsert('Categories', categories)

    const beverages = require('../data/beverages.json').map(el => {
      el.createdAt = el.updatedAt = new Date()
      return el
    })
    await queryInterface.bulkInsert('Beverages', beverages)


    const ingredients = require('../data/ingredients.json').map(el => {
      el.createdAt = el.updatedAt = new Date()
      return el
    })
    await queryInterface.bulkInsert('Ingredients', ingredients)

    const bevIng = require('../data/beverageIngredients.json').map(el => {
      el.createdAt = el.updatedAt = new Date()
      return el
    })
    await queryInterface.bulkInsert('BeverageIngredients', bevIng)

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('BeverageIngredients', null)
    await queryInterface.bulkDelete('Ingredients', null)
    await queryInterface.bulkDelete('Beverages', null)
    await queryInterface.bulkDelete('Categories', null)
  }
};
