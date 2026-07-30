const Joi = require("joi");

const createGroupValidation = Joi.object({

    name: Joi.string()
        .min(3)
        .max(50)
        .required(),

    permissions: Joi.string()
        .valid("public", "private")

});


const updateGroupValidation = Joi.object({

    name: Joi.string()
        .min(3)
        .max(50),

    permissions: Joi.string()
        .valid("public", "private")

});


module.exports = { createGroupValidation , updateGroupValidation};