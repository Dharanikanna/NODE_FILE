// Routes for authentication endpoints (Register, Login, refresh token, logout)
//Route --> user model
const express = require('express')
const router = express.Router()
const user = require('../Controllers/auth_control')

router.get('/', user.demo)

// Display add gig form
router.get('/add', (req, res) => res.render('add'));

router.post('/register',user.register)

module.exports = router