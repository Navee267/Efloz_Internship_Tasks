

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true,
        unique : true
    },
    role : {
        type : String,
        enum : ['admin','user'],
        default : 'user'
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
})

const User = mongoose.model('userDetails',userSchema)

module.exports = User