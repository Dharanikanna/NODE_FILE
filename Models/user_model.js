// This file will store the data in database which acquire from the controller/auth control
// This file modules was routed from routers/auth control
// this is an middleware processs for user model
const Sequelize = require('sequelize');

const db = require('../helpers/sequelize_config');

module.exports = function() {db.define('User',{

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
})
}
 
//   User.sync().then(() => {
//     console.log('table created');
//   });
  
