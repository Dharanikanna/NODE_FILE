const fs = require('fs');
const csv = require('fast-csv');
const Json2csvParser = require("json2csv").Parser;
const Pool = require('pg').Pool
require('dotenv').config()

const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})



const csvupload = async (request, response, next) => {
  const fileRows = [];

  // open uploaded file
  csv.parseFile(request.file.path)
    .on("data", function (data) {
      fileRows.push(data); // push each row

    })
    .on("end", function () {
      // console.log(fileRows)
      fs.unlinkSync(request.file.path);   // remove temp file
      //process "fileRows" and respond

      const jsonData = JSON.parse(JSON.stringify(fileRows));
      // console.log("jsonData", jsonData);
      const json2csvParser = new Json2csvParser(); //{ header: true }
      const csv = json2csvParser.parse(jsonData);
      existing=[]
      updateddata=[]

    db.connect( async(err, client, done) => {
        if (err) {
          console.log(err.message)
          response.send(err.message);
          response.end();
          next();
        }
        else{
          fileRows.slice(1).forEach(row => {
            // console.log("Rows: ",row)
            // rows.forEach(row => {
            //   console.log("Row: ",row)
            // console.log(row[1])
            ismatch= row[1]       //"MSDU26983545"  
            existing.push(ismatch)

            cmd = 'SELECT * FROM liveload WHERE "CONTAINER NO" = '+"'"+ismatch+"'"+";"
            console.log(cmd)
            client.query(cmd, async(err, res) => {
              // out = res.rows
              // existing.push(out)

              console.log("Response : ",res.rowCount)
              if(err){
                console.log("error: ",err.message)
              }
              else{
                if (res.rowCount){
                  console.log("This columns are exist already")
                  response.send({
                    Status: "This columns are exist already",
                    ExistingContainers : existing
                  });
                  return
                }
                else{
                  console.log("Ther is no column like that") 
                  client.query('INSERT INTO liveload("LOAD NO","CONTAINER NO","SIZE","SSL","PORT TERMINAL","EXPORT BOOKING NO","ETA","LFD","CUSTOMS","FREIGHT","PICK-UP STATUS","GATE OUT DATE","SCHEDULED DELIVERY DATE","ACTUAL DELIVERY DATE","EMPTY READY FOR P/U","EMPTY RETURN P/U DATE","DELIVERY LOCATION","CUSTOMER","CC","Load Content","NOTES") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)',row, async (err, res) => {
                    if (err) {
                      console.log(err.stack);
                    } else {
                      // console.log("inserted row:", row)
                      console.log("Database Inserted csv data sucessfully")
                      response.send({
                        Status: "Database Inserted csv data sucessfully",
                        Data: res.rows
                      });
                      return
                  }
                }) // client query
                } //else
              }  
            })
          });
          // response.send("Check response")

          // response.send({
          //   data: "Database Inserted csv data sucessfully",
          //   newdata: newdata,
          //   existdata: existdata
          // });
          // response.end();
          // next();
        }
          
    })
}
)}


module.exports = csvupload
