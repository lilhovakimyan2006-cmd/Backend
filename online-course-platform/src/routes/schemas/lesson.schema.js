const Joi = require('joi');

const createLessonSchema = Joi.object({
    title: Joi.string().trim().required(),
    content: Joi.string().trim().required(),
    videoUrl: Joi.string().uri().allow(null, ''),
    duration: Joi.number().integer().positive().required(),
    order: Joi.number().integer().positive().required()
});

const updateLessonSchema = Joi.object({
    title: Joi.string().trim(),
    content: Joi.string().trim(),
    videoUrl: Joi.string().uri().allow(null, ''),
    duration: Joi.number().integer().positive(),
    order: Joi.number().integer().positive()
}).min(1);

module.exports = {
    createLessonSchema,
    updateLessonSchema
};