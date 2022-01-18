const express = require('express')
var router = express.Router()

const user = require('../Controllers/auth_control')
const heroku = require('../Models/heroku')
const healthcare = require('../Models/healthcare')

//user login routes
router.post('/login',user.login)
/**
 * @swagger
 * /user/register:
 *   post:
 *     description: Register User
 *     requestBody:
 *       description: Optional description in *Markdown*
 *       required: true
 *       content:
 *         application/json:
 *          
 *     parameters:
 *      - name: Email
 *        in: formData
 *        required: true
 *        type: string
 *      - name: Password
 *        in: formData
 *        required: true
 *        type: password
 *     responses:
 *       201:
 *         description: User registered
 */

//user login routes
router.post('/login',user.login)

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login
 *     description: Login User
 *     parameters:
 *      - name: Email
 *        in: body
 *        required: true
 *        type: string
 *      - name: Password
 *        in: formData
 *        required: true
 *        type: string
 *      
 *     responses:
 *       201:
 *         description: User Logged in successfuly
 *         schema:
 *           type: "string"
 *       "400":
 *         description: "Invalid username/password supplied"
 */

 router.get('/heroku',heroku.getAllData)

/**
 * @swagger
 * /healthcare/heroku:
 *   get:
 *     description: heroku data
 *      
 *     responses:
 *       201:
 *         description: All data retrieved
 *         schema:
 *           type: "string"
 *       "400":
 *         description: "No data exist"
 */


 router.get('/getall',healthcare.getAllData)
 /**
 * @swagger
 * /healthcare/getall:
 *   get:
 *     description: Get all data
 *      
 *     responses:
 *       201:
 *         description: All data retrieved
 *         schema:
 *           type: "string"
 *       "400":
 *         description: "No data exist"
 */

 router.get('/id',healthcare.getDataById)
 /**
 * @swagger
 * /healthcare/id:
 *   get:
 *     description: heroku data
 *     parameters:
 *      - name: Id
 *        in: body
 *        required: true
 *        type: integer     
 * 
 *     responses:
 *       201:
 *         description: All data retrieved
 *         schema:
 *           type: "string"
 *       "400":
 *         description: "No data exist"
 */


//  router.post('/', healthcare.createData)

//  router.post('/id', healthcare.updateData)

//  router.delete('/id', healthcare.deleteData)