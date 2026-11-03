const Joi = require('joi');
const ROLES = require('../../constants/roles');

const updateRoleSchema = Joi.object({
    role: Joi.string()
        .valid(...Object.values(ROLES))
        .required()
});

module.exports = {
    updateRoleSchema
};