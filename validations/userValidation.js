const Joi = require("joi");


const updateUserValidation = Joi.object({

    userName: Joi.string().min(3).max(50),
    email: Joi.string().email(),
    password: Joi.string().min(6),
    role: Joi.string().valid("user", "admin", "super-admin")

});


module.exports = {updateUserValidation};