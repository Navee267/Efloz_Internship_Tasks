

const whitelist = ['http://localhost:5000/','https://www.google.com/','http://localhost:3500','http://localhost:3501']

const corsOptions = {
    origin : (origin,callback)=>{
        if(whitelist.indexOf(origin) !==-1 || !origin){
            callback(true,null)
        }
        callback(new Error('Cors Not Allowed..'))
    },
    optionsStatusSuccess : 200
}

exports.modules = {corsOptions}