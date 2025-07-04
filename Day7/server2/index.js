
const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT;
const {connectToDB} = require('./services/db')

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use('/sales',require('./routes/salesRoutes'))

connectToDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`SERVER is running on PORT ${PORT}`);
    })
})