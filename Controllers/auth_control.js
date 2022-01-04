// Auth controller controll the data and change structure of data before it send to database or models/user model (middleware)
//Route -->auth control (middlware =user model ) --> app.js

const createError = require('http-errors')
const user = require('../Models/user_model')
const {authSchema} = require('../helpers/validation')
const Sequelize = require('sequelize');
const db = require('../helpers/sequelize_config');

module.exports ={

    register: async(req, res, next)=>{

        try{
            const { email, password } = req.body
            if (!email || !password) throw createError.BadRequest()
            const result = await authSchema.validateAsync(req.body)
            console.log({result})
            res.status(201).send("Registered sucessfully..!")
        } catch(error){
            error.status = 422
            next(error)
        }
    },

    demo: (req, res) => 
    user.findAll()
      .then(gigs => res.render('gigs', {
          gigs
        }))
      .catch(err => res.render('error', {error: err})));


    // login: async()=>{

    // },

    // refreshtoken: async()=>{

    // },

    // logout: async()=>{

    // },
}