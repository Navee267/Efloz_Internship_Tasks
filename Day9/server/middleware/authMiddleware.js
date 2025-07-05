
const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY

const authticateUser = (req,res,next)=>{
    const token = req.cookies.token

    if(!token){
        res.json({message : "Token missing"})
    }

    jwt.verify(token,SECRET_KEY,(err,user)=>{
        if(err){
            res.json({message : "token invalid"})
        }

        req.user = user
        next()
    })
}

module.exports = authticateUser