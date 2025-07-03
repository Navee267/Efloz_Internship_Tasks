
const {MongoClient} = require('mongodb')
require('dotenv').config()
const uri = process.env.MONGO_URI
const client = new MongoClient(uri)

let db ;

async function connectToDB(){
    try{
        await client.connect()
        db = client.db('example')
        console.log("MongoDB Connection Success..");
    }
    catch(err){
        console.log("Connection Failed..");
        process.exit(1)
    }
}

function getDB(){
    return db;
}

module.exports = {connectToDB,getDB}