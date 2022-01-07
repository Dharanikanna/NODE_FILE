// Routes for authentication endpoints (Register, Login, refresh token, logout)
//Route --> user model
const express = require('express')
const router = express.Router()
const user = require('../Controllers/auth_control')
const model = require('../Models/user_model');


router.post('/register',user.register)
router.post('/login',user.login)
router.post('/refresh-token', user.refreshtoken)
router.delete('/logout', user.logout)


module.exports = router