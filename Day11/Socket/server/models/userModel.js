
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    age : {
        type : Number,
        required : true,
    },
    dept : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    dob : {
        type : String,
        required : true
    }
})

const User = mongoose.model('example',userSchema,'example')
module.exports = User