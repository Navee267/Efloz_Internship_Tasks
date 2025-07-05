

const express = require('express')
const router = express.Router()
const User = require('../models/UserModel')
const authticateUser = require('../middleware/authMiddleware')
const allowUser = require('../middleware/roleBased')

router.route('/')
.get(authticateUser,allowUser('admin'),async (req,res)=>{
    res.json({message : ` Hello ${req.headers.name}`})
})
.post(authticateUser,allowUser('admin'),async (req,res)=>{
    try{
    const {name,password,role,email } = req.body
    const user = await User.create({name,password,role,email})
    res.status(201).json({message : "user created successfully" , user : user})
    }
    catch(err){
        res.status(400).json({error : err.message})
    }
})

router.get('/users',authticateUser,allowUser('admin'),async(req,res)=>{
    try{
        const users = await User.find()
        res.json(users)
    }
    catch(err){
        res.status(400).json({error : err.message})
    }
})

module.exports = router