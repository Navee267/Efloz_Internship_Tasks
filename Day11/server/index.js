
const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT

const connectTODB = require('./services/db')
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use('/upload',require('./router/uploadRouter'))

connectTODB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`SERVER is running on PORT ${PORT}`);
    })
})