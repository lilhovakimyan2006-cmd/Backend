const Joi = require('joi');

const enrollSchema = Joi.object({
    courseId: Joi.number().integer().positive().required()
});

const updateProgressSchema = Joi.object({
    progress: Joi.number().integer().min(0).max(100).required()
});

module.exports = {
    enrollSchema,
    updateProgressSchema
};