const jwt = require('jsonwebtoken');
require('dotenv').config();

async function authUser (req, res, next) {
    const token = req.header('authToken');
    if(!token){
        return res.status(401).json({
            code : 401,
            message : `Please authenticate using valid token!`
        })
    }
    try {
        const data = await jwt.verify(token, process.env.JSON_SECRET_KEY);
        req.user = data.user
        next();
    } catch (error) {
        return res.status(500).json({
            code : 500,
            message : `internal server error : ${error.message}`
        })
    }
}

module.exports = authUser;