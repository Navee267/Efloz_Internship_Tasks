
const express = require('express')
const router = express.Router()

const Galary = require('../models/uploadModel')
const upload = require('../middleware/uploadConfig')

router.post('/',upload.array('files',3),async(req,res)=>{
    console.log(req.files);
    console.log('req.file.size', req.files)
    try{
        const fileData = req.files.map(file=>({
            
            fileName : file.fileName,
            path : file.path
        }
    ))
        const newFiles = new Galary({files : fileData})
        await newFiles.save()
        res.json({message : "File Uploaded Successfully.."})
    }
    catch(err){
        res.status(500).json({error : err.message})
    }
})

module.exports = router