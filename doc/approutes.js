const express = require('express')
const app = express()
var router = express.Router()

const user = require('../Controllers/auth_control')
const heroku = require('../Models/heroku')
const healthcare = require('../Models/healthcare')

/**
 * @swagger
 *  tags:
 *  - name: "user"
 *    description: "User operations"
 *    externalDocs:
 *      description: "Find out more"
 *      url: "http://localhost:8080"
 *  - name: "healthcare"
 *    description: "Access healthcare datas"
 *  - name: "heroku"
 *    description: "Accesss heroku database"
 *    externalDocs:
 *      url: "http://localhost:8080"
 *  - name: "Sequalize"
 *    description: "Database sequalize interface"
 *    externalDocs:
 *      url: "http://localhost:8080"
 * 
 *  - name: "developers"
 *    description: "Developers Database interface"
 *    externalDocs:
 *      url: "http://localhost:8080"
 * 
 *  - name: "csv"
 *    description: "Export database data's as csv file"
 *    externalDocs:
 *      url: "http://localhost:8080"
 * 
 *  - name: "email"
 *    description: "This module send email"
 *    externalDocs:
 *      url: "http://localhost:8080"
 * 
 * 
 */  

    
/**
 * @swagger
 *  components:
 *      schema:
 *          users:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *              example:
 *                email: "abc@gmail.com"
 *                password: "abc"
 * 
 *          id:
 *              type: object
 *              properties:
 *                  id:
 *                      type: string
 *              example:
 *                id: "9"
 *          name:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *              example:
 *                name: "ABC"
 * 
 *          developer:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *              example:
 *                name: "ABC"
 *                project: ABC-project
 * 
 *          refreshtoken:
 *              type: object
 *              properties:
 *                  refreshtoken:
 *                      type: string
 *                  
 *              example:
 *                refreshtoken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDI2MDc1MzMsImV4cCI6MTY3NDE2NTEzMywiYXVkIjoiMiJ9.lRZ0iwOvfgI4uan3f2o9OEoD1JTAd2I27gwHP_io8k0"
 */

//user login routes
router.post('/register',user.register)
/**
 * @swagger
 * /user/register:
 *   
 *   post:
 *     tags:
 *       - "user"
 *     description: Register User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/users'
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
 *     tags:
 *       - "user"
 *     summary: Login
 *     description: Login User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/users'
 *     responses:
 *       201:
 *         description: User Logged in successfuly
 *         schema:
 *           type: "string"
 *       "400":
 *         description: "Invalid username/password supplied"
 */


router.post('/refreshtoken', user.refreshtoken)
/**
 * @swagger
 * /user/refreshtoken:
 *   post:
 *     tags:
 *       - "user"
 *     summary: Refreshtoken
 *     description: Refreshtoken
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/refreshtoken'
 *     responses:
 *       200:
 *         description: Generate accesstoken
 *         
 *       "400":
 *         description: "Invalid refreshtoken"
 * 
 */


 router.get('/heroku',heroku.getAllData)

/**
 * @swagger
 * /healthcare/heroku:
 *   get:
 *     tags:
 *       - "heroku"
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
 *     tags:
 *       - "healthcare"
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
 *     tags:
 *       - "healthcare"
 *     description: heroku data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/id'
 *     responses:
 *       201:
 *         description: All data retrieved
 *         schema:
 *           type: "string"
 *       "400":
 *         description: "No data exist"
 * 
 */

  router.post('/create', healthcare.createData)
   /**
 * @swagger
 * /healthcare/create:
 *   post:
 *     tags:
 *       - "healthcare"
 *     description: heroku data
 *     parameters:
 *      - name: Id
 *        in: header
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
 * 
 */
  router.post('/update', healthcare.updateData)
   /**
 * @swagger
 * /healthcare/update:
 *   post:
 *     tags:
 *       - "healthcare"
 *     description: heroku data
 *     parameters:
 *      - name: Id
 *        in: header
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
 * 
 */
  router.delete('/delete', healthcare.deleteData)
   /**
 * @swagger
 * /healthcare/delete:
 *   delete:
 *     tags:
 *       - "healthcare"
 *     description: heroku data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/id'
 * 
 *     responses:
 *       201:
 *         description: All data retrieved
 *         schema:
 *           type: "string"
 *       "400":
 *         description: "No data exist"
 * 
 */
  
const seq = require('../Controllers/sequelize_control')

router.post('/register',seq.create)
/**
 * @swagger
 * /seq/register:
 *   post:
 *     tags:
 *       - "Sequalize"
 *     description: Sequalize data deletion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/users'
 *     responses:
 *       201:
 *         description: User Logged in successfuly
 *         schema:
 *           type: "string"
 *       "400":
 *         description: "Invalid username/password supplied"
 * 
 */

router.post('/login',seq.findOne)

   /**
 * @swagger
 * /seq/login:
 *   post:
 *     tags:
 *       - "Sequalize"
 *     description: Login using sequalize
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/users'
 *     responses:
 *       201:
 *         description: User Logged in successfuly
 *         schema:
 *           type: "string"
 *       "400":
 *         description: "Invalid username/password supplied"
 * 
 */

 const csv = require('../Models/exportCSV')

 router.get('/csv',csv)
/**
 * @swagger
 * /csv:
 *   get:
 *     tags:
 *       - "csv"
 *     description: Download data or export data
 *     responses:
 *       201:
 *         description: Download data or export data
 *         schema:
 *           type: "string"
 *       "400":
 *         description: "Data not downloaded"
 * 
 */


 const email = require('../Models/email')

 app.use('/email',email)
/**
 * @swagger
 * /email:
 *   get:
 *     tags:
 *       - "email"
 *     description: Email sending module
 *     responses:
 *       201:
 *         description: Email sent successfully
 *         schema:
 *           type: "string"
 *       "400":
 *         description: "Error on sending email"
 * 
 */

 const db = require('../Models/demoqueries')


 router.get('/getall', db.getAllDeveloper)
 /**
 * @swagger
 * /developers/getall:
 *   get:
 *     tags:
 *       - "developers"
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

 router.get('/id', db.getDeveloperById)

 /**
 * @swagger
 * /developers/id:
 *   get:
 *     tags:
 *       - "developers"
 *     description: Get unique data using id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/id'
 * 
 *     responses:
 *       201:
 *         description: unique data retrieved
 *         schema:
 *           type: "string"
 *       "400":
 *         description: "No data exist"
 *      
 */


 router.get('/name', db.getDeveloperByName)

  /**
 * @swagger
 * /developers/name:
 *   get:
 *     tags:
 *       - "developers"
 *     description: Get unique data using name
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/name'   
 * 
 *     responses:
 *       201:
 *         description: unique name data retrieved
 *         schema:
 *           type: "string"
 *       "400":
 *         description: "No data exist"
 *      
 */


 router.post('/create', db.createDeveloper)

 /**
 * @swagger
 * /developers/create:
 *   post:
 *     tags:
 *       - "developers"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/developer'
 *      
 *     responses:
 *       201:
 *         description: All data retrieved
 *         schema:
 *           type: "string"
 *       "400":
 *         description: "No data exist"
 */


 router.delete('/delete', db.deleteDeveloper)
 
  /**
 * @swagger
 * /developers/delete:
 *   delete:
 *     tags:
 *       - "developers"
 *     description: Get all data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/id'
 *      
 *     responses:
 *       201:
 *         description: All data retrieved
 *         schema:
 *           type: "string"
 *       "400":
 *         description: "No data exist"
 */



module.exports = router