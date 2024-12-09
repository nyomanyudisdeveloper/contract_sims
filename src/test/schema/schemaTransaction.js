import Joi from 'joi'


export const responseSchemaGetBalanceSuccess = Joi.object({
    status: Joi.number().valid(0).required(),
    message: Joi.string().valid("Get Balance Berhasil").required(),
    data:Joi.object({balance: Joi.number().required() }).required()
})
