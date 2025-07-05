
const express = require('express')
const app = express()
const morgan = require('morgan')
require('dotenv').config()
const PORT = process.env.PORT
const cookieParser = require('cookie-parser')

const connectTODB = require('./services/db')

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended : true}))


app.use('/admin',require('./routes/adminRouter'))
app.use('/user',require('./routes/userRouter'))
app.use('/login',require('./routes/loginRouter'))

app.use(morgan('dev'))


connectTODB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`SERVER is running on PORT ${PORT}`);
    })
})