
const express = require('express')
const app = express()
const path = require('path')
require('dotenv').config()
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'uploads')))

app.use('/uploads',require('./routes/uploadRouter'))

app.listen(PORT,()=>{
    console.log(`SERVER is running on PORT ${PORT}`);
})