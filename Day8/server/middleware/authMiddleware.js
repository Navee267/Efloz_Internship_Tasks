

const jwt = require('jsonwebtoken')
require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY

const authenticateToken = async(req,res,next)=>{
    const authHeader = req.headers['authorization']
    console.log('authHeader', authHeader)

    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        res.status(400).json({message : "token missing "})
    }

    jwt.verify(token,SECRET_KEY,(err,user)=>{
        if(err) res.json({message : "invalid token"})
        req.user = user
        next()
    })
}

module.exports = authenticateToken