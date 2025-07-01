
//Day 5 tasks 
//API deisgn using express

const express = require('express')
const app = express()
const users = require('./models/users')
const path = require('path')
require('dotenv').config({ path: './config/.env' })
const PORT = process.env.PORT ;
console.log('PORT from .env:', process.env.PORT);
const cors = require('cors')
const {corsOptions} = require('./middleware/corsoptions')

app.use(express.json())
app.use(express.urlencoded())
app.use(express.static(path.join(__dirname,'public')))

// app.use(cors(corsOptions))
app.use(cors())

app.use('/users',require('./routes/users'))
app.use('/',require('./routes/pages'))

app.listen(PORT,()=>console.log(` SERVER is running on PORT ${PORT}`))