// This file will store the data in database which acquire from the controller/auth control
// This file modules was routed from routers/auth router
//Route --> user model(middlware = auth control) --> app.js
const Pool = require('pg').Pool
require('dotenv').config()


const db = new Pool({
    user : process.env.DB_USER,
    host : process.env.DB_HOST,
    database : process.env.DATABASE,
    password : process.env.DB_PASSWORD,
    port : process.env.DB_PORT,
})

const user = async (request, response) => {
    db.query('SELECT * FROM users', (error, results) => {
        if (error) {
        response.send({error})
        }
        response.status(200).json(results.rows)
    })
}

const c = async (request, response) => {
    const { email, password } = request.body
  
    db.query('INSERT INTO user (email, password) VALUES ($1, $2) returning *;', [email, password], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
  }

module.exports ={
    user
}



