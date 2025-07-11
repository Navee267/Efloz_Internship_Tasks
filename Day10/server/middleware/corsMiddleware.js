
const whitelist = ['http://localhost:5173','http://localhost:5000']

const corsOptions = {
    origin :(origin,callback)=>{
        console.log(origin);
        if(whitelist.indexOf(origin) !==-1  || !origin){
            callback(null,true)
        }
        else{
            callback(new Error ("not allowed by CORS"))
        }
    },
    credentials: true,
    optionsSuccessStatus : 200
}

module.exports = corsOptions