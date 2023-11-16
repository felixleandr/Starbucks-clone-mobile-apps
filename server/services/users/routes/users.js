const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

router.get('/', Controller.findAll)
router.post('/', Controller.createUser)
router.get('/:id', Controller.findOne)
router.delete('/:id', Controller.deleteUser)


module.exports = router

