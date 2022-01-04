// This file is the server of this project

// Importing required modules 
'use strict';

const helmet = require('helmet');
const express = require('express')
const morgan = require('morgan')
const app = express()
require('dotenv').config()
const developerRoute= require('./Routes/demo_developer_route')
require('./helpers/init_postgres')
const authroute = require('./Routes/auth_routes')

app.use(morgan('dev'))
app.use(helmet())
//json get and post permission

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)

//api end points

app.get('/', function(req, res){
  res.json({
    message: 'Hello from a private endpoint.'
  });
});

app.use('/developers',developerRoute)
app.use('/user',authroute)


//Server setup


const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})


