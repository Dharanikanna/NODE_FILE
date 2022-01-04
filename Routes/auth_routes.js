// Routes for authentication endpoints (Register, Login, refresh token, logout)
//Route --> user model
const express = require('express')
const router = express.Router()
const user = require('../Models/user_model')

router.get('/',user.user)

module.exports = router