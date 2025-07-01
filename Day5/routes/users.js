

const express = require('express')
const app = express()
const router = express.Router()
const {getAllUsers,createUser,updateUser,deleteUser, getUser} = require('../controllers/userController')
const path = require('path')

router.route('/')
.get(getAllUsers)
.post(createUser)
.put(updateUser)
.delete(deleteUser)

router.route('/:id')
.get(getUser)

module.exports = router