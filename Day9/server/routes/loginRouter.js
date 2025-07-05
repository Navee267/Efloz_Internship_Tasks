

const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')
const SECRET_KEY = process.env.SECRET_KEY

router.post('/',async (req,res)=>{
    const {name,password} = req.headers

    try{
        const user = await User.findOne({name})
        if(!user){
            res.status(400).json({message : "user not found "})
        }

        if(password !=user.password){
            res.json({message : "password invalid"})
        }

        const token = jwt.sign(
            {name : user.name , password : user.password,role : user.role},
            SECRET_KEY,
            {expiresIn : '1h'}
        )

        res.cookie('token',token,{
            httpOnly : true,
            secure : false,
            sameSite : 'strict'
        })

        res.json({messsage : 'login successfull with cookies..'})
    }
    catch(err){
        res.json({error : err.message})
    }
})

module.exports = router