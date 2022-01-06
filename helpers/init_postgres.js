const {Pool} = require('pg')

const db = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  })

db.connect()
.then(() => {console.log('Postgres connected.')})
.catch((err) => console.log(err.message))
// .then(() =>
//       db.end((err) => {
//         console.log('postgres disconnected');
//         if (err) {
//           console.log('error during disconnection', err.stack);
//         }
//       })
//       )

db.on('error', (err) => {console.log(err.message)})

// db.end().then(() => console.log('Postgres connection is disconnected'))

module.exports = db