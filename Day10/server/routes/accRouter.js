
const express = require('express')
const router = express.Router()
const Acc = require('../models/accModel')
require('dotenv').config()
const User = require('../models/userModel')

const authenticateUser = require('../middleware/authMiddleware')

router.post('/',authenticateUser,async(req,res)=>{
    const {name} = req.body
    try{
        console.log("try working");
        const user = await User.findOne({name})
        if(!user){
            res.json({message : "user not found"})
        }

        const userId = user._id
        const newAcc = await Acc.create({userId})
        res.json({message : "account created successfully",newAcc : newAcc})
    }
    catch(err){
        res.json({error : err.message})
    }
})

router.get('/:name',authenticateUser,async(req,res)=>{
    const {name} = req.params
    try{
        const user = await User.findOne({name})
        if(!user){
            res.status(404).json({message : "user not found"})
        }

        const userId = user._id
        if(!userId){
            return res.status(404).json({message : "Account Not Found Create a account"})
        }
        const acc = await Acc.findOne({userId})
        res.status(200).json({acc : acc})
    }
    catch(err){
        res.json({error : err.message})
    }
})

module.exports = router