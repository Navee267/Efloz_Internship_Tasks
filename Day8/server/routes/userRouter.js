
const express = require('express')
const router = express.Router()
const authenticateToken = require('../middleware/authMiddleware')
const User = require('../models/userModel')

router.route('/')
.get(authenticateToken,async (req,res)=>{
    try{
    const users = await User.find()
    res.json(users)
    }
    catch(err){
        res.json({error : err.message})
    }
})
.post(authenticateToken,async (req,res)=>{
    try{
        console.log(" hello ")
        const {name,password ,email,dept} = req.body
        const user = await User.create({name,password,email,dept})
        res.json({message : "user added successfully",user : user})
    }
    catch(err){
        res.json({error : err.message})
    }
})

router.route('/:id')
.get(authenticateToken,async (req,res)=>{
    try{
        const user = await User.findById(req.params.id,{$set : req.body},{new : true , runValidators : true})
        if(!user) res.json({message : "user not found",user : user})
        res.json(user)
    }
    catch(err){
        res.status(400).json({error : err.message})
    }
})
.put(authenticateToken,async (req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id)
        if(!user) res.json({message : "user not found ",user : user})
        res.status(200).json(user)
    }
    catch(err){
        res.status(400).json({error : err.message})
    }
})

module.exports = router