require('dotenv').config()
const express = require('express')
const router = express.Router()
const createError = require('http-errors');
var nodemailer = require('nodemailer');
require('dotenv').config()


// let transporter = nodemailer.createTransport({
//     service: 'gmail,',
//     auth: {
//         type: 'OAuth2',
//         user: process.env.MAIL_USERNAME,
//         pass: process.env.MAIL_PASSWORD,
//         clientId: process.env.OAUTH_CLIENTID,
//         clientSecret: process.env.OAUTH_CLIENT_SECRET,
//         refreshToken: process.env.OAUTH_REFRESH_TOKEN,
//     },
//     // debug: false,
//     // logger: true
//   });

  //yahoo try
  let transporter = nodemailer.createTransport({
    host: "smtp.mail.yahoo.com",
    port: 587,
    secure: false, 
    auth: {
      user: process.env.MAILID, 
      pass: process.env.PASS,
    },
    debug: false,
    logger: true
  });

const email = async (request,response) =>{


    var gmail = 'dharanikanna1999@gmail.com'
    var ymail = ['dharanikanna1999@yahoo.com']

      var mailOptions = {
        from: ymail,
        to: gmail,
        subject: 'Sending Email about APJ using Node.js',
        text: 'A.P.J. Abdul Kalam, (born Oct. 15, 1931, Rameswaram, India—died July 27, 2015, Shillong), Indian president (2002–07). After graduating from the Madras Institute of Technology, Kalam played a leading role in the development of India’s missile and nuclear weapons programs. He planned a program that produced a number of successful missiles, helping earn him the nickname “Missile Man.” Beginning in the early 1990s, he also served as scientific adviser to the government, and his prominent role in India’s 1998 nuclear weapons tests established Kalam as a national hero. In 2002 the Hindu nationalist (Hindutva) National Democratic Alliance nominated Kalam, a Muslim, to succeed outgoing President K.R. Narayanan. Kalam easily won the elections in 2002, and in the largely ceremonial post he sought to use science and technology to transform India into a developed country. In 2007 he was succeeded by Pratibha Patil, the country’s first woman president.'
      };
          
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          response.send({
            statuscode:200,
            iserror: 'True',
            message:error.message
        })
        } else {
          console.log('Email sent: ' + info.response)
          response.send({ 
              statuscode:info.response,
              message: `Email sent to ${ymail}`,
              iserror: 'False'
            })
        }
      });
}

router.get('/',email)

module.exports = router

//yahoo try
//   let transporter = nodemailer.createTransport({
//     host: "smtp.mail.yahoo.com",
//     port: 587,
//     secure: false, 
//     auth: {
//       user: process.env.MAILID, 
//       pass: process.env.PASS,
//     },
//     debug: false,
//     logger: true
//   });

//reference
// https://developers.google.com/oauthplayground/?code=4/0AX4XfWiBKo28nj8pTy8gUzLmTRdQnXm-4GKa0AaF31hxeA2RG_pX6bPV2ReJZX-Yr1pJdQ&scope=https://mail.google.com/
// https://www.freecodecamp.org/news/use-nodemailer-to-send-emails-from-your-node-js-server/