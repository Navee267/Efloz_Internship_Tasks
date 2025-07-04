
const express = require('express')
const router = express.Router()
const upload = require('../middleware/multerConfig')

router.post('/',upload.single('image'),(req,res)=>{
    if(!req.file){
        res.status(400).json({message : "file not uploaded"})
        console.log(file);
    }
    res.json({message : "file uploaded successfully",file : req.file})
})

module.exports = router