// Routes for authentication endpoints (Register, Login, refresh token, logout)
//Route --> user model
const express = require('express')
const router = express.Router()
const user = require('../Controllers/auth_control')
const model = require('../Models/user_model');


router.get('/demo', (req, res, next) => 
   data=model.user.get({attributes: ['email', 'password']})
  .then(data  => {
      console.log({data});
      res.send(200);
    })
  .catch(err => res.render('error', {error: err}
  ))
  )


router.post('/register',user.register)
router.post('/login',user.login)


module.exports = router