const Pool = require('pg').Pool
require('dotenv').config()
const createError = require('http-errors');

const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

const getAllData = async (request, response) => {
    db.query('SELECT * FROM diabetic', (error, results) => {
        if (error) {
        throw error
        }
        response.status(200).json(results.rows)
    })
}

const getDataById = async (request, response) => {
    const id = parseInt(request.body.id)

    db.query('SELECT * FROM diabetic WHERE id = $1', [id], (error, results) => {
        if (error) {
        throw error
        }
        response.status(200).json(results.rows)
    })
}


const createData = async (request, response) => {
    const { encounter_id ,patient_nbr ,race , gender ,age , weight , diag_1 , diag_2 , diag_3 , number_diagnoses ,max_glu_serum , A1Cresult , metformin ,repaglinide ,nateglinide ,chlorpropamide } = request.body
  
    db.query('INSERT INTO diabetic(encounter_id ,patient_nbr ,race , gender ,age , weight , diag_1 , diag_2 , diag_3 , number_diagnoses ,max_glu_serum , A1Cresult , metformin ,repaglinide ,nateglinide ,chlorpropamide) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) returning *', [encounter_id ,patient_nbr ,race , gender ,age , weight , diag_1 , diag_2 , diag_3 , number_diagnoses ,max_glu_serum , A1Cresult , metformin ,repaglinide ,nateglinide ,chlorpropamide], async (error, results) => {

        if (error) {
        response.send(createError.NotAcceptable())
      }else{
        response.send(`User added with ID: ${results.rows[0].id}`)
      }
    })
  }

  const updateData = async (request, response) => {
    const { weight, id} = request.body

    console.log({ weight, id})
  
    db.query('UPDATE diabetic SET diabetespedigreefunction =$1 WHERE id= $2;', [String(weight), id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Health detail updated with ID: ${id}`)
    })
  }
  
  const deleteData = async (request, response) => {
    const id = parseInt(request.body.id)
  
    db.query('DELETE FROM diabetic WHERE id = $1', [id], (error, results) => {
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