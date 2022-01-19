// Auth controller controll the data and change structure of data before it send to database or models/user model (middleware)
//Route -->auth control (middlware =user model ) --> app.js

const createError = require('http-errors');
const {authSchema} = require('../helpers/validation');
// const db = require('../helpers/init_postgres');
const db = require('../helpers/init_herokupg');

const bcrypt = require('bcryptjs')

const {
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken,
  } = require('../helpers/jwt_helper');


module.exports ={

    register: async(req, res, next)=>{

        try{

            var { email, password } = req.body
            if (!email || !password) res.send(createError.BadRequest())
            const result = await authSchema.validateAsync(req.body)
      
            
            // const salt = await bcrypt.genSalt(10)
            // const hashedPassword = await bcrypt.hash(password, salt)
            const hashedPassword = bcrypt.hashSync(req.body.password, 8)
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
            //if (!email || !password) res.send(createError.BadRequest())
            var { email, password } = req.body
            const result = await authSchema.validateAsync(req.body)
            if (!email || !password) res.send(createError.BadRequest())

            console.log(result.password)
            const enteredPassword= password

            // const salt = await bcrypt.genSalt(10);
            // const hash = await bcrypt.hash(result.password, salt);

            await db.query('SELECT * FROM users WHERE email = $1', [result.email],async (error, results)=> {

                const dbPassword = results.rows[0].password

                if (results.rowCount ===0) {
                    res.send( createError.NotFound('User not registered'))
                    
                }
                else{
                    const isMatch = bcrypt.compareSync(enteredPassword, dbPassword);
                    console.log('Entered Password:',enteredPassword)
                    console.log('DB password: ', dbPassword)
                    console.log('isMatch : ', isMatch)

                    if (isMatch === false){
                        res.send( createError.Unauthorized('Username/password not valid'))
                    }
                    else{
                        var user_id = String(results.rows[0].id)
                        const accessToken = await signAccessToken(user_id)
                        const refreshToken = await signRefreshToken(user_id)

                        console.log('Access token : ',accessToken)
                        console.log('Refresh token : ',refreshToken)

                        res.send({
                            info:'User Login Accessed',
                            UserId:user_id,
                            AccessToken: accessToken,
                            RefreshToken: refreshToken
                        })
                    }   
                }
                })
            
        } catch(error){
            error.status = 422
            next(error)
        }
    },

    refreshtoken: async(req, res, next)=>{

        try {
            const { refreshToken } = req.body
            if (!refreshToken) throw createError.BadRequest()
            const userId = await verifyRefreshToken(refreshToken)
      
            const accessToken = await signAccessToken(userId)
            const refToken = await signRefreshToken(userId)
            res.send({ accessToken: accessToken, refreshToken: refToken })
          } catch (error) {
            next(error)
          }

    },

    logout: async()=>{

        try {
            const { refreshToken } = req.body
            if (!refreshToken) throw createError.BadRequest()
            const userId = await verifyRefreshToken(refreshToken)
            client.DEL(userId, (err, val) => {
              if (err) {
                console.log(err.message)
                throw createError.InternalServerError()
              }
              console.log(val)
              res.sendStatus(204)
            })
          } catch (error) {
            next(error)
          }
        }
}


