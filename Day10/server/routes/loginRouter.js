

const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY

router.post('/',async(req,res)=>{
    const {name,password} = req.body
    try{
        const user = await User.findOne({name})
        if(!user) {
            return res.status(404).json({message : "user not found go to register"})
        }

        if(password !== user.password) {
            return res.status(400).json({message : "invalid password"})
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, SECRET_KEY, { expiresIn: '1h' })

        res.cookie('token',token,{
            httpOnly : false,
            secure : false,
            sameSite : 'lax',
            maxAge : 60 * 60 * 1000
        })
        res.status(200).json({ message: 'LOG IN successful with cookies' })
        console.log("Sending token cookie...");
    }
    catch(err){
        res.json({error : err.message})
    }
})

router.get('/logout', (req, res) => {
    res.clearCookie('token', {
      httpOnly: false,  
      secure: false,
      sameSite: 's'
    })
    res.status(200).json({ message: "Logged out successfully" })
  })
  

router.post('/reg',async(req,res)=>{
    const {name,email,password,phone,role} = req.body
    try{
        const user = await User.create({name,email,password,phone,role})
        console.log("User Created =>", user);
        res.status(200).json({message : "Registration Successful Go to login",user : user})
    }
    catch(err){
        res.json({error : err.message })
    }
})

module.exports = router