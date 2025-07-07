
const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const Acc = require('../models/accModel')
const transaction = require('../models/transactionModel')

const authenticateUser = require('../middleware/authMiddleware')

router.post('/deposit',authenticateUser,async(req,res)=>{
    const {userId,amount} = req.body
    try{
        const user = await Acc.findOne({userId})
        if(!user){
            res.json({message : "user not found"})
        }

        const accNumber = user.accNumber
        const type = "Deposit";
        if(amount<=0){
            return res.json({message : "deposit failed.."})
        }
        const newTransaction = await transaction.create({accNumber,type,amount,note: "Deposit to account"})
        if(newTransaction.amount > 0){
            user.balance += newTransaction.amount 
            await user.save()
        }
        else{
        res.status(400).json({message : "Amount deposited failed "})
        }
        res.status(200).json({message : "Amount deposited success",newTransaction : newTransaction,balance : user.balance})
    }
    catch(err){
        res.status(500).json({error : err.message})
    }
})

router.post('/withdraw',authenticateUser,async(req,res)=>{
    const {userId,amount} = req.body
    try{
        const user = await Acc.findOne({userId})
        if(!user){
            res.json({message : "user not found"})
        }

        const accNumber = user.accNumber
        const type = "Withdraw";
        const newTransaction = await transaction.create({accNumber,type,amount,note: "Withdraw from account"})
        if(newTransaction.amount > 0 && user.balance >= newTransaction.amount){
            user.balance -= newTransaction.amount 
            await user.save()
        }
        else{
        res.status(400).json({message : "Amount Withdrawn failed "})
        }
        res.status(200).json({message : "Amount Withdrawn success",newTransaction : newTransaction,balance : user.balance})
    }
    catch(err){
        res.status(500).json({error : err.message})
    }
})

router.post('/transfer',authenticateUser,async(req,res)=>{
    const {userId,amount,toAcc} = req.body
    try{
        const fromUser = await Acc.findOne({userId})
        if(!fromUser){
            res.json({message : "Account not found"})
        }

        const accNumber = fromUser.accNumber
        const fromAcc = accNumber
        const type = "Transfer";
        const newTransaction = await transaction.create({accNumber,type,amount,fromAcc,toAcc,note: "Transfer to account"})
        const toAccNo = newTransaction.toAcc
        const toUser = await Acc.findOne({accNumber : toAccNo})
        if (!toUser) {
            return res.status(404).json({ message: "Recipient account not found" });
          }
          if (fromUser.balance < amount) {
            return res.status(400).json({ message: "Insufficient funds" });
          }
        if(newTransaction.amount > 0 && fromUser.balance >=newTransaction.amount){
            fromUser.balance -= newTransaction.amount 
            toUser.balance +=newTransaction.amount
            await fromUser.save()
            await toUser.save()
        }
        else{
        res.status(400).json({message : "Amount Transfered failed "})
        }
        res.status(200).json(
        {message : "Amount Transfered success",
        newTransaction : newTransaction,
        fromuserBalance : fromUser.balance,
        toUserBalance : toUser.balance})
    }
    catch(err){
        res.status(500).json({error : err.message})
    }
})

module.exports = router