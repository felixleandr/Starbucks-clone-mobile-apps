const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET

function createToken(data){
    const token = jwt.sign(data, secret);
    return token;
}

function verifyToken(token){
    console.log(token, 'token');
    const verifyToken = jwt.verify(token, secret)
    return verifyToken
}


module.exports = {
    createToken,
    verifyToken
}
