const pg = require('pg')
require('dotenv').config()


const config = {
    user: process.env.HDB_USER,
    host: process.env.HDB_HOST,
    database: process.env.HDATABASE,
    password: process.env.HDB_PASSWORD,
    port: process.env.HDB_PORT,       //Default port, change it if needed
    ssl:{
        rejectUnauthorized: false
    }
};

// pool takes the object above -config- as parameter
const pool = new pg.Pool(config);



pool.connect()
.then(() => {console.log('heroku Healthcare Postgres connected.')})
.catch((err) => console.log("error :",err.message))

module.exports = pool