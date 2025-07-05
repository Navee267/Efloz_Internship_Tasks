
const mongoose = require('mongoose')
require('dotenv').config()

const connectTODB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MONGODB CONNECTED TO ${mongoose.connection.host}`);
    }
    catch(err){
        console.log(`Connection Failed `);
    }
}

module.exports = connectTODB