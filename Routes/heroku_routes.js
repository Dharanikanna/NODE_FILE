const express = require('express')
const router = express.Router()
const heroku = require('../Models/heroku')



router.get('/',heroku.getAllData)

module.exports = router