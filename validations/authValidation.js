const Joi = require("joi");

const registerValidation = Joi.object({

    userName: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid("user", "admin", "super-admin").optional()

});

const loginValidation = Joi.object({

    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    
});

module.exports = {registerValidation , loginValidation};