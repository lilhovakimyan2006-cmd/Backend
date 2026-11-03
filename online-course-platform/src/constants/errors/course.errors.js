const COURSE_ERRORS = {
    NOT_FOUND: {
        statusCode: 404,
        message: 'Course not found'
    },
    NOT_OWNER: {
        statusCode: 403,
        message: 'You do not have permission to modify this course'
    },
    NOT_PUBLISHED: {
        statusCode: 400,
        message: 'Course is not published'
    },
    INVALID_PRICE: {
        statusCode: 400,
        message: 'Course price must be a non-negative number'
    },
    ACCESS_DENIED: {
        statusCode: 403,
        message: 'You do not have permission to access this course'
    },
    CANNOT_ENROLL_OWN_COURSE: {
        statusCode: 400,
        message: 'You cannot enroll in your own course'
    }
};

module.exports = COURSE_ERRORS;