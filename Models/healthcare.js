const Pool = require('pg').Pool
require('dotenv').config()
const createError = require('http-errors');

const db = new Pool({
  user: 'hcudbjagppfwtn',
  host: 'ec2-3-232-22-121.compute-1.amazonaws.com',
  database: 'd7ur26qmph50fo',
  password: 'b2d0dbb86602ddb41070f948e897dc28a233a8297946091a0b4b04d0063b7749',
  port: process.env.DB_PORT,
})

const getAllData = async (request, response) => {
    db.query('SELECT * FROM healthcare', (error, results) => {
        if (error) {
        throw error
        }
        response.status(200).json(results.rows)
    })
}

const getDataById = async (request, response) => {
    const id = parseInt(request.body.id)

    db.query('SELECT * FROM healthcare WHERE id = $1', [id], (error, results) => {
        if (error) {
        throw error
        }
        response.status(200).json(results.rows)
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
        throw error
      }
      response.status(201).send(`Health detail updated with ID: ${id}`)
    })
  }
  
  const deleteData = async (request, response) => {
    const id = parseInt(request.body.id)
  
    db.query('DELETE FROM healthcare WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
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
