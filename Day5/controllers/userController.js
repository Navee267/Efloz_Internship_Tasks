
const data ={
    users : require('../models/users.json'),
    setUsers : function(data) {this.users = data}
}

console.log(data.users);

const getAllUsers = (req,res)=>{
    res.status(200).json(data.users)
}
const createUser = (req,res)=>{
    const user = {
        id : data.users?.length ? data.users[data.users.length - 1].id +1 : 1,
        name : req.body.name,
        age : req.body.age
    }

    if(!user.name || !user.age){ 
        return res.status(400).json({"message" : "name and age required"})
    }
    data.setUsers([...data.users,user])
    res.status(200).json(data.users)
}

const updateUser = (req,res)=>{
    const user = data.users.find(user=>user.id === parseInt(req.body.id))
    if(!user){
        return res.statu(404).json({"message" : `the user ${req.body.id} not found`})
    }
    if(req.body.name) user.name = req.body.name
    if(req.body.age) user.age = req.body.age
    const filteredArray = data.users.filter(user=>user.id !==parseInt(req.body.id))
    const unsortedArray = [...filteredArray,user]
    data.setUsers(unsortedArray.sort((a,b)=>a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
    res.json(data.users)
}

const deleteUser =(req,res)=>{
    const user = data.users.find(user=>user.id === parseInt(req.body.id))
    if(!user){
        res.status(404).json({"message" : `the user ${req.body.id} not found`})
    }
    const filteredArray = data.users.filter(user=>user.id !==parseInt(req.body.id))
    data.setUsers(...filteredArray)
    res.status(200).json(data.users)
}

const getUser = (req,res)=>{
    const id = parseInt(req.params.id)
    const user = data.users.find(user=>user.id == id)
    if(!user){
        res.status(404).json({"message" : `the user ${req.body.id} not found`})
    }
    res.json(user)
}

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getUser
}