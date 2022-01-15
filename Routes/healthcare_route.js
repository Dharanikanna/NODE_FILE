const express = require('express')
const router = express.Router()
const healthcare = require('../Models/healthcare')
const heroku = require('../Models/heroku')



router.get('/',healthcare.getAllData)
router.get('/heroku',heroku.getAllData)
router.get('/id',healthcare.getDataById)
router.post('/', healthcare.createData)
router.post('/id', healthcare.updateData)
router.delete('/id', healthcare.deleteData)


module.exports = router