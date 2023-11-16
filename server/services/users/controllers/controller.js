const User = require('../models/User')
const { getDb } = require("../config/mongo");
const { hashPassword } = require('../helpers/bcrypt');

class Controller{
    static async findAll(req, res) {
        try {
            const users = await User.findAll()
            
            res.status(200).json(users)
        } catch (err) {
            res.status(500).json({message: 'Internal Server Error'})
        }
    }
    
    static async findOne(req, res){
        try {
            const {id} = req.params
            const user = await User.findOne(id)
            res.status(200).json(user)
        } catch (err) {
            res.status(500).json({message: 'Internal Server Error'})
        }
    }

    static async createUser(req, res){
        try {
            const {email, password} = req.body

            if(!email) return res.status(400).json({message: 'Email is required'})
            if(!password) return res.status(400).json({message: 'Password is required'})
            
            const isUserExists = await getDb().collection('users').findOne({email})
            if(isUserExists) return res.status(400).json({message: 'Email already registered'})

            const user = await User.createUser({
                email, password: hashPassword(password)
            })

            res.status(200).json({message: 'Success register admin'})
        } catch (err) {
            res.status(500).json({message: 'Internal Server Error'})
            
        }
    }

    static async deleteUser(req, res){
        try {
            const {id} = req.params
            await User.deleteUser(id)
            res.status(200).json({message: 'Admin successfully deleted'})
        } catch (err) {
            res.status(500).json({message: 'Internal Server Error'})
        }
    }
}

module.exports = Controller