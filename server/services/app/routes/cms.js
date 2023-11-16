const express = require('express')
const router = express.Router()
const AdminController = require('../controllers/adminController')
const authentication = require('../middlewares/authentication')



router.post('/login', AdminController.login)

// router.use(authentication)

router.post('/register', AdminController.register)
router.get('/beverages', AdminController.fetchBeverages)
router.post('/beverages', AdminController.addBeverage)
router.get('/beverages/:id', AdminController.fetchBeverageById)
router.put('/beverages/:id', AdminController.editBeverage)
router.delete('/beverages/:id', AdminController.deleteBeverage)
router.get('/ingredients', AdminController.fetchIngredients)
router.get('/categories', AdminController.fetchCategories)
router.post('/categories', AdminController.addCategory)
router.get('/categories/:id', AdminController.fetchCategoryById)
router.put('/categories/:id', AdminController.editCategory)
router.delete('/categories/:id', AdminController.deleteCategory)




module.exports = router