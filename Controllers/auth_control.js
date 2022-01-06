// Auth controller controll the data and change structure of data before it send to database or models/user model (middleware)
//Route -->auth control (middlware =user model ) --> app.js

const createError = require('http-errors');
const model = require('../Models/user_model');
const {authSchema} = require('../helpers/validation');
const Sequelize = require('sequelize');
const db = require('../helpers/init_postgres');
const bcrypt = require('bcrypt')
const {
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken,
  } = require('../helpers/jwt_helper');


module.exports ={

    register: async(req, res, next)=>{

        try{
            // const { email, password } = req.body
            // if (!email || !password) throw createError.BadRequest()
            var { email, password } = req.body
            const result = await authSchema.validateAsync(req.body)
            /* 
            Here first checking if the document is new by using a helper of mongoose .isNew, therefore, this.isNew is true if document is new else false, and we only want to hash the password if its a new document, else  it will again hash the password if you save the document again by making some changes in other fields incase your document contains other fields.
            */
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            password = hashedPassword
            console.log({result})
            console.log({hashedPassword})


            await db.query('SELECT * FROM users WHERE email = $1', [email], async (error, results)=> {
                if (results.rowCount !==0) {
                    res.send(createError.Conflict(`${result.email} is already been registered`))
                    
                }
                else{
                    db.query('INSERT INTO users (email, password) VALUES ($1, $2) returning *;', [email, password], async (error, results) => {
                        
                        var user_id = String(results.rows[0].id)
                        //console.log('id',user_id)
                        accessToken = await signAccessToken(user_id)
                        refreshToken = await signRefreshToken(user_id)
                        
                        console.log("Access: ",accessToken)
                        console.log("Refresh: ",refreshToken)

                        if (error){
                            throw error
                        }
                        res.status(201).send({
                            message : `User added with ID: ${results.rows[0].id}`,
                            AccessToken : accessToken,
                            RefreshToken :refreshToken
                    })
                        
                    })}
                })
            
        } catch(error){
            error.status = 422
            next(error)
        }
    },


    login: async(req, res, next)=>{

        try{
            // const { email, password } = req.body
            // if (!email || !password) throw createError.BadRequest()
            //var { email, password } = req.body
            const result = await authSchema.validateAsync(req.body)
            /* 
            Here first checking if the document is new by using a helper of mongoose .isNew, therefore, this.isNew is true if document is new else false, and we only want to hash the password if its a new document, else  it will again hash the password if you save the document again by making some changes in other fields incase your document contains other fields.
            */
            console.log(result)


            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(result.password, salt);

            await db.query('SELECT * FROM users WHERE email = $1', [result.email],async (error, results)=> {

                if (results.rowCount ===0) {
                    res.send(res.createError.NotFound('User not registered'))
                    
                }
                else{
                    const isMatch = await bcrypt.compare(results.password, hash, function(err, result) {
                        console.log(result)
                        res.send(createError.NotFound('User compare prob'))
                    });
                    if (!isMatch){
                        res.send( createError.Unauthorized('Username/password not valid'))
                    }
                    res.send({info:'User Login Accessed'})
                    const accessToken = signAccessToken(result.id)
                    console.log(accessToken)
                }
                })
            
        } catch(error){
            error.status = 422
            next(error)
        }
    },

     //}

    // refreshtoken: async()=>{

    // },

    // logout: async()=>{

    // },
}