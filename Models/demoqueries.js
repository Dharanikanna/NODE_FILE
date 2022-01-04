const Pool = require('pg').Pool
require('dotenv').config()

const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

const getAllDeveloper = async (request, response) => {
    db.query('SELECT * FROM developer', (error, results) => {
        if (error) {
        throw error
        }
        response.status(200).json(results.rows)
    })
}

const getDeveloperById = async (request, response) => {
    const id = parseInt(request.body.id)

    db.query('SELECT * FROM developer WHERE id = $1', [id], (error, results) => {
        if (error) {
        throw error
        }
        response.status(200).json(results.rows)
    })
}

const getDeveloperByName = async (request, response) => {
    var name = request.body.name

    db.query("SELECT * FROM developer WHERE name = $1", [name], (error, results) => {
        if (error) {
        throw error
        }
        if(results.rows.length > 0) {
            response.status(200).json(results.rows)
        } else {
            response.status(400)

        }
    })
}

const createDeveloper = async (request, response) => {
    const { name, projects } = request.body
  
    db.query('INSERT INTO developer (name, projects) VALUES ($1, $2) returning *;', [name, projects], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
  }

  
  const deleteDeveloper = async (request, response) => {
    const id = parseInt(request.params.id)
  
    db.query('DELETE FROM developer WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }


  
  module.exports = {
    getAllDeveloper,
    getDeveloperById,
    getDeveloperByName,
    createDeveloper,
    deleteDeveloper,
  }