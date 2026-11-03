const USER_ERRORS = {
    NOT_FOUND: {
        statusCode: 404,
        message: 'User not found'
    },
    EMAIL_EXISTS: {
        statusCode: 409,
        message: 'Email already exists'
    },
    INVALID_EMAIL: {
        statusCode: 400,
        message: 'Invalid email address'
    },
    INVALID_PASSWORD: {
        statusCode: 400,
        message: 'Invalid password'
    },
    CANNOT_DELETE_SELF: {
        statusCode: 400,
        message: 'You cannot delete your own account'
    },
    CANNOT_CHANGE_OWN_ROLE: {
        statusCode: 403,
        message: 'You cannot change your own role'
    },
    INVALID_ROLE: {
        statusCode: 400,
        message: 'Invalid user role'
    }
};

module.exports = USER_ERRORS;