import Joi from 'joi'


export const responseSchemaGetBannerSuccess = Joi.object({
    status: Joi.number().valid(0).required(),
    message: Joi.string().valid("Sukses").required(),
    data:Joi.array().items(
        Joi.object({
            banner_name: Joi.string().required(),
            banner_image: Joi.string().required(),
            description: Joi.string().required()
        })
    ).required()
})