// Routes for authentication endpoints (Register, Login, refresh token, logout)
//Route --> user model
const express = require('express')
const router = express.Router()
const seq = require('../Controllers/sequelize_control')
const model = require('../Models/user_model');



router.post('/create',seq.create)
router.post('/findall',seq.findAll)
router.post('/findone',seq.findOne)

module.exports = router