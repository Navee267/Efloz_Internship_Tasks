
const express = require('express')
const router = express.Router()
const transaction = require('../models/transactionModel')
const User = require('../models/userModel')
const Acc = require('../models/accModel')

router.get('/history/:accNumber',async(req,res)=>{
    try{
        const {accNumber} = req.params
        const transactionHistory = await transaction.find({accNumber}).sort({ createdAt: -1 });
        res.status(200).json({message : "users transaction history",transactionHistory : [...transactionHistory]})
    }
    catch(err){
        res.json({error : err.message})
    }
})

router.get('/details/:userId',async(req,res)=>{
    try{
        const {userId} = req.params
        const userDetails = await User.findById(userId)
        res.json({message : "user fetched successfully ",userDetails : userDetails})
    }
    catch(err){
        res.status(500).json({error : err.message})
    }
})

router.get('/accdetails',async(req,res)=>{
    try{
        const {accNumber} = req.body
        const accDetails = await Acc.findOne({accNumber : accNumber})
        res.status(200).json({message : "users account details ",accDetails : accDetails})
    }
    catch(err){
        res.json({error : err.message})
    }
})

router.get('/id/:name',async(req,res)=>{
    try{
        const name = req.params.name
        const user = await User.findOne({name})
        if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
        console.log('userid',user._id);
        res.status(200).json({ userId: user._id });
    }
    catch(err){
        res.json({error : err.message})
    }
})

module.exports = router