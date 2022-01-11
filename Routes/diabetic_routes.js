const express = require('express')
const router = express.Router()
const diabetic = require('../Models/diabetic')


router.get('/',diabetic.getAllData)
router.get('/id',diabetic.getDataById)
router.post('/', diabetic.createData)
router.post('/id', diabetic.updateData)
router.delete('/id', diabetic.deleteData)


module.exports = router