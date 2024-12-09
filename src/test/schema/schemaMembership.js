import Joi from 'joi'

export const responseSchemaLoginSuccess = Joi.object({
    status: Joi.number().valid(0).required(),
    message: Joi.string().valid("Login Sukses").required(),
    data:Joi.object({
        token: Joi.string().required()
    }).required()
})