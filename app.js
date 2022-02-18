// This file is the server of this project

// Importing required modules 
'use strict';
const cors = require('cors');
const helmet = require('helmet');
const express = require('express')
const morgan = require('morgan')
const app = express()
require('dotenv').config()
const multer = require('multer');



const developerRoute= require('./Routes/demo_developer_route')
require('./helpers/init_postgres')
const authroute = require('./Routes/auth_routes')
require('./helpers/sequelize_config')
// require('./helpers/init_redis')
const autho= require('./Controllers/auth0_control')
const seq = require('./Routes/seq_route')
const {verifyAccessToken} = require('./helpers/jwt_helper');
const healthcare = require('./Routes/healthcare_route')
const diabetic = require('./Routes/diabetic_routes')
const csv = require('./Models/exportCSV')
const email = require('./Models/email')
const uploadcsv = require('./Models/uploadcsv')
require('./Models/heroku')
const heroku = require('./Routes/heroku_routes')
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require('swagger-jsdoc');
const docs = require('./doc/approutes');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('swagger.yaml');
const upload = multer({ dest: './Upload' });
// const upload = require('express-fileupload');




// client.SET('foo','Doo')
// client.GET('foo',(err,value) => {
//   if(err) console.log(err.message)
//   console.log(value)
// })

app.use(morgan('dev'))
app.use(helmet())
//json get and post permission

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)

app.use(cors());
// app.use(upload());

//api end points

app.get('/home',verifyAccessToken, async (req, res, next) => {
  // console.log(req.headers['authorization'])
  res.send({
    message: 'Hello User'
  });
});

app.use('/developers',developerRoute)
app.use('/healthcare',healthcare)
app.use('/diabetic',diabetic)
app.use('/heroku',heroku)
app.use('/csv',csv)
app.use('/email',email)
app.use('/user',authroute)
app.use('/',autho)
app.use('/seq',seq)

app.post('/upload', upload.single('file') , uploadcsv)

// app.post('/upload', async function (req, res) {
//   try {
//    const file = req.files;
//    const bodyData = req.body;
//    console.log(file);
//    console.log(bodyData);

//    res.status(200).send({
//    message: "FILE RECEIVED!",
//    data: file
//   });
//   } catch (error) {
//   res.send(error.message);
//   }
//  });

const options  = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: "Node API",
      version: '1.0.0',
      
    },
    // servers: [
    //   {
    //     url: "http://localhost:8080/home",
    //   },
    // ],
  },
  apis: ['./doc/approutes.js'],
};
const swaggerDocs = swaggerJsDoc(options);
console.log(swaggerDocs)
app.use('/apidocs',swaggerUI.serve,swaggerUI.setup(swaggerDocs));


const port = process.env.PORT || 8080
app.use(cors({
  origin: '*'
}));
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

// to start app use the command => nodemon app.js