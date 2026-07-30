const Joi = require("joi");

const createPostValidation = Joi.object({

    title: Joi.string().min(3).max(100).required(),

    content: Joi.string().min(5).required(),

    images: Joi.array().items(Joi.string()),

    group: Joi.string()

});


const updatePostValidation = Joi.object({

    title: Joi.string().min(3).max(100),

    content: Joi.string().min(5),

    images: Joi.array().items(Joi.string()),

    group: Joi.string()

});


module.exports = {createPostValidation , updatePostValidation};