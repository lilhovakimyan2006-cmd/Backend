const Joi = require('joi');

const createCourseSchema = Joi.object({
    title: Joi.string().min(3).max(150).required(),

    description: Joi.string().required(),

    category: Joi.string().required(),

    level: Joi.string()
        .valid('beginner', 'intermediate', 'advanced')
        .default('beginner'),

    price: Joi.number().min(0).default(0)
});

const updateCourseSchema = Joi.object({
    title: Joi.string().min(3).max(150),
    description: Joi.string(),
    category: Joi.string(),

    level: Joi.string()
        .valid('beginner', 'intermediate', 'advanced'),

    price: Joi.number().min(0),

    isPublished: Joi.boolean()
})
    .min(1);

module.exports = {
    createCourseSchema,
    updateCourseSchema
};