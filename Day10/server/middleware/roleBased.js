

const allowUser = (...roles)=>{
    return (req,res,next)=>{

        console.log(roles);
        console.log(req.user);
        if(!req.user || !roles.includes(req.user.role)){
            return res.json({message : "Access Denied"})
        }
        next()
    }
}

module.exports = allowUser