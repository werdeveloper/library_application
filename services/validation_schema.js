const Joi = require('joi');

const signupAuthSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .required(),
    phone: Joi.string()
        .min(8)
        .max(10)
        .required(),
    email: Joi.string()
        .email()
        .lowercase()
        .required(),
    password: Joi.string()
        .min(5)
        .required()
});

module.exports = {
    signupAuthSchema
}
