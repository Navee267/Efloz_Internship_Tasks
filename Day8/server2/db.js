
const mongoose = require('mongoose')

require('dotenv').config()

const connectTODB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MONGO DB Connected to ${mongoose.connection.host}`);
    }
    catch(err){
        console.log("Connection failed");
        process.exit(1)
    }
}

module.exports = connectTODB