
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    dept : {
        type : String,
        required : true,
    }
})

const User = mongoose.model('employee',userSchema)

module.exports = User