const Sequelize = require('sequelize');
require('dotenv').config();

const db = {}

const sequelize = new Sequelize(process.env.DATABASE,process.env.DB_USER,process.env.DB_PASSWORD,{
    host:process.env.DB_HOST,
    dialect:'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
        operatorsAliases: false,
      },
})
sequelize.authenticate()
  .then(() => console.log('Sequelize & Postgres Database connected...'))
  .catch(err => console.log('Error: ' , err))

db.sequelize = sequelize

module.exports = db

