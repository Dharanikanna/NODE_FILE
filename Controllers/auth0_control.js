
const express = require('express')
const router = express.Router()
require('dotenv').config()


const app = express()

const {auth} = require('express-openid-connect');

const config ={

    authRequired:false,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
    errorOnRequiredAuth: true, // otherwise I get infinite redirect
    idpLogout: true,

}

app.use(auth(config));


app.get('/',(req,res)=>{
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/profile',(req,res)=>{
  res.send(JSON.stringify(req.oidc.user));
});

// app.get('/login', (req, res) => res.oidc.login({ returnTo: '/profile' }));



module.exports=app

//https://dev-hsoy6bli.us.auth0.com/u/login?state=hKFo2SAwUjNMN3NzcV9wbmNDcUlNODc3d3JkVVpFaGZoYTZTbqFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIF9STEEydzU0MWplRmRkTmk1bEZhZ2phZ0xKSE5fZFBIo2NpZNkgS1lZamh0dUF1SHphQ3dEVEtLRTA4VU1udTcwaVNrcVY