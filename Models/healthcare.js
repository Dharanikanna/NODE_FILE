const pg = require('pg')
const Pool = require('pg').Pool
require('dotenv').config()
const createError = require('http-errors');
pg.defaults.ssl = false;


const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})


db.connect()
.then(() => {console.log('Healthcare Postgres connected.')})
.catch((err) => console.log("error :",err.message))

const getAllData = async (request, response) => {
    db.query('SELECT * FROM healthcare', (error, results) => {
        if (error) {
          response.send(error.message)
        }
        else{
          //response.status(200).json(results.rows)
          const page = request.query.page
          const limit = request.query.limit
          const startindex = (page - 1) * limit
          const endindex =  page * limit
          console.log("Page :", page, "Limit :",limit)

          console.log("Start_index :", startindex, "End_index :",endindex)
          const out = results.rows.slice(startindex, endindex)
          response.setHeader('Content-Type', 'application/json');
          response.send(JSON.stringify(results.rows))
        }
    })
}

const getDataById = async (request, response) => {
    const id = parseInt(request.body.id)

    db.query('SELECT * FROM healthcare WHERE id = $1', [id], (error, results) => {
        if (error) {
        response.send(error.message)
        console.log(error.message)
        }
        else{
          response.status(200).json(results.rows)
        }
    })
}


const createData = async (request, response) => {
    const { pregnancies,glucose,bloodpressure,skinthickness, insulin, bmi, diabetespedigreefunction,age,outcome } = request.body
  
    db.query('INSERT INTO healthcare (pregnancies,glucose,bloodpressure,skinthickness, insulin, bmi, diabetespedigreefunction,age,outcome) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *', [pregnancies,glucose,bloodpressure,skinthickness, insulin, bmi, diabetespedigreefunction,age,outcome], async (error, results) => {

        if (error) {
        response.send(createError.NotAcceptable())
      }else{
        response.send(`User added with ID: ${results.rows[0].id}`)
      }
    })
  }

  const updateData = async (request, response) => {
    const { diabetespedigreefunction, id} = request.body

    console.log({ diabetespedigreefunction, id})
  
    db.query('UPDATE healthcare SET diabetespedigreefunction =$1 WHERE id= $2;', [String(diabetespedigreefunction), id], (error, results) => {
      if (error) {
        response.send(error.message)
      }
      response.status(201).send(`Health detail updated with ID: ${id}`)
    })
  }
  
  const deleteData = async (request, response) => {
    const id = parseInt(request.body.id)
  
    db.query('DELETE FROM healthcare WHERE id = $1', [id], (error, results) => {
      if (error) {
        response.send(error.message)
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }


  
  module.exports = {
    getAllData,
    getDataById,
    createData,
    updateData,
    deleteData,
  }