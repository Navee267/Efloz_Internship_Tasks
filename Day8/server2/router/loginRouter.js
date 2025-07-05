
const jwt = require('jsonwebtoken')
const express = require('express')
const User = require('../model/userModel')
const router = express.Router()
require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY

router.post('/',async (req,res)=>{
    const {name,password} = req.headers

    try{
        const user = await User.findOne({name})
        if(!user) res.status(404).json({message : 'user not found '})

        if(password !=user.password) res.json({message : "invalid password"})

        const token = jwt.sign(
            {name : user.name , password : user.password},
            SECRET_KEY,
            {expiresIn : '1h'}
        )
        res.cookie('token',token,{
            httpOnly : true,
            secure : false,
            sameSite : 'strict',
            maxAge : 60 * 60 * 1000
        })

        res.send("login successfull with cookie")
    }
    catch(err){
        res.json({error : err.message})
    }
})

module.exports = router