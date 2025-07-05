

const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT
const cookieParser = require('cookie-parser')
const connectTODB = require('./db')

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended : true}))

connectTODB()

app.use('/login',require('./router/loginRouter'))
app.use('/user',require('./router/userRouter'))

app.listen(PORT,()=>{
    console.log(`SERVER is running on PORT ${PORT}`);
})