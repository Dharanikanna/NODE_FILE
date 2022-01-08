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
require('./helpers/sequelize_config')
// require('./helpers/init_redis')
const autho= require('./Controllers/auth0_control')
const seq = require('./Routes/seq_route')
const {verifyAccessToken} = require('./helpers/jwt_helper');

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

//api end points

app.get('/home',verifyAccessToken, async (req, res, next) => {
  // console.log(req.headers['authorization'])
  res.send({
    message: 'Hello User'
  });
});

app.use('/developers',verifyAccessToken,developerRoute)
app.use('/user',authroute)

app.use('/',autho)

app.use('/seq',seq)




// const {auth} = require('express-openid-connect');

// const config ={

//     authRequired:false,
//     issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
//     baseURL: process.env.BASE_URL,
//     clientID: process.env.CLIENT_ID,
//     secret: process.env.SECRET,
//     errorOnRequiredAuth: true, // otherwise I get infinite redirect
//     idpLogout: true,

// }

// app.use(auth(config));


// app.get('/',(req,res)=>{
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });

// app.get('/profile',(req,res)=>{
//   res.send(JSON.stringify(req.oidc.user));
// });




//Server setup


const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})


