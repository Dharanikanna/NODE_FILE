const Joi = require('@hapi/joi')

const authSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).lowercase().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  //repeat_password: Joi.ref('password'),
})

module.exports = {
  authSchema,
}
