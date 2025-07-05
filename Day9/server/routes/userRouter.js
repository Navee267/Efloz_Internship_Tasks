

const express = require('express')
const router = express.Router()
// const User = require('../models/UserModel')

router.route('/')
.get(async (req,res)=>{
    res.json({message : ` Hello  ${req.headers.name}`})
})

module.exports = router