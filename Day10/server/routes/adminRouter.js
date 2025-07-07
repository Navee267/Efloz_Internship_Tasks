
const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const Acc = require('../models/accModel')
const transaction = require('../models/transactionModel')

const roleBased = require('../middleware/roleBased')
const authenticateUser = require('../middleware/authMiddleware')

router.get('/users',authenticateUser,roleBased('admin'),async (req,res)=>{
    try{
        const users = await User.find()
        res.json({message : "users fetched successfully" ,users : users})
    }
    catch(err){
        res.json({error : err.message})
    }
})

router.get('/me', authenticateUser, (req, res) => {
    res.json({ role: req.user.role })
  })
  

router.get('/accounts',authenticateUser,roleBased('admin'),async (req,res)=>{
    try{
        const accs = await Acc.find()
        res.json({message : "accounts fetched successfully" ,accs : accs})
    }
    catch(err){
        res.json({error : err.message})
    }
})

router.get('/transactions',authenticateUser,roleBased('admin'),async(req,res)=>{
    try{
        const transactions = await transaction.find()
        res.status(200).json({message : "all transactions recieved ",transactions : transactions})
    }
    catch(err){
        res.status(500).json({error : err.message})
    }
})

module.exports = router