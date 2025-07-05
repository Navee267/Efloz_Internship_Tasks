
const express = require('express')
const morgan = require('morgan')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT
const connectToDB = require('./services/db')


app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(morgan('dev'))

connectToDB()

app.use('/user',require('./routes/userRouter'))
app.use('/login',require('./routes/loginRouter'))


app.listen(PORT,()=>{
    console.log(`SERVER is running on PORT ${PORT}`);
})