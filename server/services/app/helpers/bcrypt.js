const bcrypt = require('bcryptjs')

function hashPassword(password){
    const hash = bcrypt.hashSync(password)
    return hash;
}

function comparePassword(password, hashedPassword){
    const isValid = bcrypt.compareSync(password, hashedPassword)
    return isValid
}


module.exports = {
    hashPassword,
    comparePassword
}