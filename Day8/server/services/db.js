
const mongoose = require('mongoose')

require('dotenv').config()
const connectToDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MONGO DB Connected to ${mongoose.connection.host}`);
    }
    catch(err){
        console.log(`Connection Failed ${err}`);
    }
}

module.exports = connectToDB