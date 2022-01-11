const express = require('express')
const router = express.Router()
const healthcare = require('../Models/healthcare')



router.get('/',healthcare.getAllData)
router.get('/id',healthcare.getDataById)
router.post('/', healthcare.createData)
router.post('/id', healthcare.updateData)
router.delete('/id', healthcare.deleteData)


module.exports = router