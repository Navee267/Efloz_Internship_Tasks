

const express = require('express')
const app = express()
const morgan = require('morgan')
require('dotenv').config()
const PORT = process.env.PORT
const connectTODB = require('./services/db')
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors')
// const corsOptions = require('./middleware/corsMiddleware')

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.static(path.join(__dirname,'public')))
app.use(cookieParser())
app.use(morgan('dev'))

app.use('/login',require('./routes/loginRouter'))
app.use('/acc',require('./routes/accRouter'))
app.use('/admin',require('./routes/adminRouter'))
app.use('/transaction',require('./routes/transactionRouter'))
app.use('/user',require('./routes/userRouter'))

connectTODB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`SERVER is running on PORT ${PORT}`);
    })
})