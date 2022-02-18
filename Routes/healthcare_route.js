const express = require('express')
const router = express.Router()
const healthcare = require('../Models/healthcare')
const heroku = require('../Models/heroku')



router.get('/getall',healthcare.getAllData)
router.get('/heroku',heroku.getAllData)
router.post('/id',healthcare.getDataById)
router.post('/create', healthcare.createData)
router.post('/update', healthcare.updateData)
router.delete('/delete', healthcare.deleteData)


module.exports = router