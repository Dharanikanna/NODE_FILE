const Pool = require('pg').Pool
require('dotenv').config()
const express = require('express')
const router = express.Router()
const createError = require('http-errors');
const fastcsv = require("fast-csv");
const fs = require("fs");
const ws = fs.createWriteStream("healthcare.csv");
const Json2csvParser = require("json2csv").Parser;


const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

const exportd = async (request,response) =>{
    db.connect((err, client, done) => {
        if (err) response.send(err);
      
        client.query("SELECT * FROM healthcare WHERE outcome = ($1)",[1], (err, res) => {
          done();
      
          if (err) {
            console.log(err.stack);
          } else {
            response.status(200)
            const jsonData = JSON.parse(JSON.stringify(res.rows));
            // console.log("jsonData", jsonData);
            const json2csvParser = new Json2csvParser(); //{ header: true }
            const csv = json2csvParser.parse(jsonData);
      
            fastcsv
              .write(jsonData, { headers: true })
              .on("finish", function() {
                console.log("Write to Healthcare.csv successfully!");
              })
              .pipe(ws);
                response.setHeader('Content-disposition', 'attachment; filename=healthcare.csv');
                response.set('Content-Type', 'text/csv');
                response.status(200).send(csv);
                // response.send({
                //     message: "Write to Healthcare.csv successfully!",
                // })
          }
        });
      });
}

router.get('/',exportd)

module.exports = router


