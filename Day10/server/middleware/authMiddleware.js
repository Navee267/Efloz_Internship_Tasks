
require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY
const jwt = require('jsonwebtoken')

const authenticateUser = async(req,res,next)=>{
    const token = req.cookies.token

    if(!token){
        return res.json({message : "token missing"})
    }

    jwt.verify(token,SECRET_KEY,(err,user)=>{
        if(err){
            return res.json({message : "token is invalid"})
        }
        console.log(user);
        req.user = user
        console.log(req.user);
        next()
    })
}

module.exports = authenticateUser