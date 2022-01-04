// Routes for demo developer endpoints (developer, /id, /name, create user, delete user)

const express = require('express')
var router = express.Router();
const db = require('../Models/demoqueries')


router.get('/', db.getAllDeveloper)
router.get('/id', db.getDeveloperById)
router.get('/name', db.getDeveloperByName)
router.post('/', db.createDeveloper)
router.delete('/id', db.deleteDeveloper)

module.exports = router