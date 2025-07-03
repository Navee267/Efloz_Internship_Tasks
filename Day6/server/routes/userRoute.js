
const express = require('express')
const app = express()
const router = express.Router()

const {getDB} = require('../services/db')
const {ObjectId} = require('mongodb')

router.route('/')
.get(async (req,res)=>{
    try{
        const users = await getDB().collection('example').find().toArray()
        res.json(users)
    }
    catch(err){
        res.status(500).json({error : "Cannot Fetch the users.."})
    }
})
.post(async (req,res)=>{
    try{
        const result = await getDB().collection('example').insertOne(req.body)
        res.json({message : "one user inserted",result})
    }
    catch(err){
        res.status(500).json({error : "Cannot add the user.."})
    }
})

router.post('/addmany',async (req,res)=>{
        try{
            const result = await getDB().collection('example').insertMany(req.body)
            res.status(500).json({message : "users inserted",result})
        }
        catch(err){
            res.status(500).json({error : "Cannot add the users.."})
        }
})

router.put('/update/:name',async (req,res)=>{
    const Name = req.params.name
    try{
        const user = await getDB().collection('example').updateMany({name : Name},{$set : req.body})
        res.json({message : "user updated successfully",user})
    }
    catch(err){
        res.status(500).json({err : "failed to update user"})
    }
})

router.route('/:id')
.get(async (req,res)=>{
    const id = req.params.id
    try{
        const user = await getDB().collection('example').findOne({id : parseInt(id)})
        res.json(user)
    }
    catch(err){
        console.log({error : "failed to find the user"});
    }
})
.put(async (req,res)=>{
    const id = req.params.id
    try{
        const user = await getDB().collection('example').updateOne({_id : new ObjectId(id)},{$set : req.body})
        res.json({message : "user updated successfully"})
    }
    catch(err){
        res.status(500).json({err : "failed to update user"})
    }
})

router.delete('/delete/:id',async (req,res)=>{
    const id = req.params.id
    try{
        const user = await getDB().collection('example').deleteOne({_id : new ObjectId(id)})
        res.json({message : "user deleted successfully",user})
    }
    catch(err){
        res.status(500).json({error : "failed to delete user"})
    }
})

module.exports = router