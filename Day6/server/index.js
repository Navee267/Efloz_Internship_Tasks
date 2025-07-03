
const express = require('express')
const app = express()
require('dotenv').config()

const {connectToDB} = require('./services/db')
const morgan = require('morgan')

const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(morgan('dev'))

app.use('/user',require('./routes/userRoute'))

connectToDB().then(()=>{
    app.listen(port,console.log(`SERVER is running on PORT ${port}`))
})