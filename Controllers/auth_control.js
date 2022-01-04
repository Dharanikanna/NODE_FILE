// Auth controller controll the data and change structure of data before it send to database or models/user model (middleware)
// this is an middleware processs for user model
const createError = require('http-errors')
const user = require('../Models/user_model')

module.export ={

    register: async(req, res, next)=>{

        try{
            const { email, password } = req.body
            if (!email || !password) throw createError.BadRequest()
            const result = await authSchema.validateAsync(req.body)
            console.log({result})

        } catch(error){
            error.status = 422
            next(error)
        }
    },

    login: async()=>{

    },

    refreshtoken: async()=>{

    },

    logout: async()=>{

    },
}