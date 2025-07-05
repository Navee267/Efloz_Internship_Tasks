
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY

router.post('/',async (req,res)=>{
    const {name,password} = req.headers // you can also do this in the body or params by your convinience 

    try{
        const user = await User.findOne({name})

        if(!user){
            res.status(404).json({message : "user not found "})
        }

        if(password != user.password){
            res.status(400).json({message : "invalid password"})
        }

        const token = jwt.sign(
            {name : user.name , password : user.password},
            SECRET_KEY,
            {expiresIn : '1h'}
        )

        res.json({message : "Login Successfull ",token})
    }
    catch(err){
        res.status(500).json({error : "Login Failed"})
    }
})

module.exports = router
