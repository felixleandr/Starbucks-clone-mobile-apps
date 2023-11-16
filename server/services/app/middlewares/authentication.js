const {User} = require('../models')
const { verifyToken } = require('../helpers/jwt')


const authentication = async (req, res, next) => {
    try {

        const {access_token} = req.headers;
        
        if(!access_token) throw {name: "InvalidToken"}
        
        const verified = verifyToken(access_token)
        console.log(verified, 'dari server');

        const user = await User.findByPk(verified.id)

        if(!user) throw {name: "InvalidToken"}
        req.user = user;
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = authentication