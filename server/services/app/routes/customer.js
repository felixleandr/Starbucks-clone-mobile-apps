const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

router.get('/beverages', Controller.fetchBeverages)
router.get('/beverages/:id', Controller.fetchBeverageById)


module.exports = router

