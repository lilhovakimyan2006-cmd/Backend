const { User, Course } = require('../models');
const AppError = require('../utils/AppError');

const USER_ERRORS = require('../constants/errors/user.errors');
const ROLES = require('../constants/roles');

const getAllUsers = async (filters = {}) => {
    const where = {};

    if (filters.role) {
        where.role = filters.role;
    }

    const users = await User.findAll({
        where,
        attributes: {
            exclude: ['password']
        },
        order: [['createdAt', 'DESC']]
    });

    return users;
};

const getUserById = async (userId) => {
    const user = await User.findByPk(userId, {
        attributes: {
            exclude: ['password']
        },
        include: [
            {
                model: Course,
                as: 'courses'
            },
            {
                model: Course,
                as: 'enrolledCourses',
                through: {
                    attributes: ['status', 'progress', 'enrolledAt']
                }
            }
        ]
    });

    if (!user) {
        throw new AppError(
            USER_ERRORS.NOT_FOUND.message,
            USER_ERRORS.NOT_FOUND.statusCode
        );
    }

    return user;
};

const updateUserRole = async (userId, newRole, currentUserId) => {
    const user = await User.findByPk(userId, {
        attributes: {
            exclude: ['password']
        }
    });

    if (!user) {
        throw new AppError(
            USER_ERRORS.NOT_FOUND.message,
            USER_ERRORS.NOT_FOUND.statusCode
        );
    }

    if (Number(userId) === Number(currentUserId)) {
        throw new AppError(
            USER_ERRORS.CANNOT_CHANGE_OWN_ROLE.message,
            USER_ERRORS.CANNOT_CHANGE_OWN_ROLE.statusCode
        );
    }

    if (!Object.values(ROLES).includes(newRole)) {
        throw new AppError(
            USER_ERRORS.INVALID_ROLE.message,
            USER_ERRORS.INVALID_ROLE.statusCode
        );
    }

    user.role = newRole;
    await user.save();

    return user;
};

const deleteUser = async (userId, currentUserId) => {
    const user = await User.findByPk(userId, {
        attributes: {
            exclude: ['password']
        }
    });

    if (!user) {
        throw new AppError(
            USER_ERRORS.NOT_FOUND.message,
            USER_ERRORS.NOT_FOUND.statusCode
        );
    }

    if (Number(userId) === Number(currentUserId)) {
        throw new AppError(
            USER_ERRORS.CANNOT_DELETE_SELF.message,
            USER_ERRORS.CANNOT_DELETE_SELF.statusCode
        );
    }

    await user.destroy();

    return user;
};

module.exports = {
    getAllUsers,
    getUserById,
    updateUserRole,
    deleteUser
};