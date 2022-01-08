// This file will store the data in database which acquire from the controller/auth control
// This file modules was routed from routers/auth control
// this is an middleware processs for user model
const {Sequelize, DataTypes, Model} = require('sequelize');
// const db = require('../helpers/sequelize_config');

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

class User extends Model {}

User.init({
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
    email: {
        type: Sequelize.STRING,
        required: true,
        lowercase: true,
        unique: true,
        allowNull:false,
    },
    password: {
        type: Sequelize.STRING,
        required: true,
        },
  }, {
    // Other model options go here
    sequelize , // We need to pass the connection instance
    modelName: 'User' // We need to choose the model name
    
  }
  );


// if table not exist()
// User.sync({ force: true });
// console.log("The table for the User model was just (re)created!");

console.log(User === sequelize.models.User); // true

module.exports = User




// the defined model is the class itself
