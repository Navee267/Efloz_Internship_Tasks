

const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY

function authenticateToken(req,res,next){
    const token = req.cookies.token

    if(!token){
        res.json({message : "token invalid "})
    }
    
    try{
        jwt.verify(token,SECRET_KEY,(err,user)=>{
            if(err){
                res.json({message : "token invalid"})
            }

            req.user = user
            next()
        })
    }
    catch(err){
        res.json({error : err.message})
    }
}

module.exports = authenticateToken