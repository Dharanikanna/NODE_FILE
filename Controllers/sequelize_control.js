const User = require('../Models/user_model');
const {authSchema} = require('../helpers/validation');
const bcrypt = require('bcryptjs')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const createError = require('http-errors');


const {
    signAccessToken,
    signRefreshToken,
    // verifyRefreshToken,
  } = require('../helpers/jwt_helper');


// Create and Save a new Tutorial
exports.create = async(req, res, next) => {

    try {

        if (!req.body.email) {
            res.status(400).send({
              message: "Email can not be empty!"
            });
            return;
          }
        
          var {email, password} = req.body
        
        const result = await authSchema.validateAsync(req.body)
        // const salt = await bcrypt.genSalt(10)
        // const hashedPassword = await bcrypt.hash(password, salt)
        const hashedPassword = bcrypt.hashSync(req.body.password, 8)
        password = hashedPassword
          // Create a Tutorial
          const user = {
            email: result.email,
            password: password,
          };
          var condition = email ? { email: { [Op.iLike]: `%${email}%` } } : null;
          const doesExist = await User.findOne({ where : condition })
          if (doesExist) {
            res.send(createError.Conflict(`${result.email} is already been registered`))
          }

          else{
          User.create(user)
            .then(async data => {
              //res.send(data);
              console.log('Data-id:',data.id)
              accessToken =  await signAccessToken(String(data.id))
              refreshToken = await signRefreshToken(String(data.id))
              
              console.log("Access: ",accessToken)
              console.log("Refresh: ",refreshToken)
              res.send({
                Data: data,
                AccessToken: accessToken,
                RefreshToken: refreshToken
              })
            })
            .catch(err => {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while creating the Tutorial."
              });
            });
          }    
    } catch(error){
        if (error.isJoi === true) error.status = 422
        next(error)
    }
};


exports.findOne = async (req, res) => {

    var {email, password} = req.body;
    console.log(email)
    var condition = email ? { email: { [Op.iLike]: `%${email}%` } } : null;

    User.findOne({ where: condition })
    .then(async data => {
      if (data) {
        //res.send(data);
        console.log('Data-id:',data.id)
        var passwordIsValid = bcrypt.compareSync(password, data.password);
        console.log("Password Validation : ",passwordIsValid)

      //   const isMatch =  await bcrypt.compare(password, data.passsword , function(err, result) {
        console.log('Entered Password:',password)
        console.log('DB Decrypted: ', data.password)
        // return result
      // })

      if (passwordIsValid === false){
          res.send( createError.Unauthorized('Username/password not valid'))
      }
      else{
        accessToken = await signAccessToken(String(data.id))
        refreshToken = await signRefreshToken(String(data.id))
        
        console.log("Access: ",accessToken)
        console.log("Refresh: ",refreshToken)
        res.send({
          Data: data,
          AccessToken: accessToken,
          RefreshToken: refreshToken
        })
      }
      } else {
        res.status(404).send({
          message: `Cannot find User with email=${email}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with email=" + email
      });
    });
  
};

// Retrieve all Tutorials from the database.
// exports.findAll = (req, res) => {
  
//     const email = req.query.email;
//     var condition = email ? { email: { [Op.iLike]: `%${email}%` } } : null;
  
//     User.findAll({ where: condition })
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving User."
//         });
//       });
// };

// Find a single Tutorial with an id

// // Update a Tutorial by the id in the request
// exports.update = (req, res) => {

//     const email = req.body.email;

//   User.update(req.body, {
//     where: { email: email }
//   })
//     .then(num => {
//       if (num == 1) {
//         res.send({
//           message: "User was updated successfully."
//         });
//       } else {
//         res.send({
//           message: `Cannot update User with email=${email}. Maybe Tutorial was not found or req.body is empty!`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error updating Tutorial with Email=" + email
//       });
//     });
// };

// // Delete a Tutorial with the specified id in the request
// exports.delete = (req, res) => {

//     const email = req.body.email;

//   User.destroy({
//     where: { email: email }
//   })
//     .then(num => {
//       if (num == 1) {
//         res.send({
//           message: "User was deleted successfully!"
//         });
//       } else {
//         res.send({
//           message: `Cannot delete Tutorial with email=${email}. Maybe Tutorial was not found!`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Could not delete Tutorial with email=" + email
//       });
//     });
// };

// // Delete all Tutorials from the database.
// exports.deleteAll = (req, res) => {

//     User.destroy({
//         where: {},
//         truncate: false
//       })
//         .then(nums => {
//           res.send({ message: `${nums} Tutorials were deleted successfully!` });
//         })
//         .catch(err => {
//           res.status(500).send({
//             message:
//               err.message || "Some error occurred while removing all Users."
//           });
//         });
// };

// // Find all published Tutorials
// exports.findAllPublished = (req, res) => {

//     User.findAll({ where: { email: true } })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving Users."
//       });
//     });
// };


// Reference
//https://www.bezkoder.com/node-express-sequelize-postgresql/