
const User = require('../model/userModel')
const express = require('express')
const router = express.Router()
const authenticateToken = require('../middleware/authenticateToken')

router.route('/')
.get(authenticateToken,async (req,res)=>{
    try{
        const users = await User.find()
        res.json(users)
    }
    catch(err){
        res.json({error : err.message })
    }
})
.post(authenticateToken,async (req,res)=>{
    try{
        const {name,password} = req.body
        const user = await User.create({name,password})
        res.json({message : 'user added successfully ',user : user})
    }
    catch(err){
        res.json({error : err.message})
    }
})

module.exports = router