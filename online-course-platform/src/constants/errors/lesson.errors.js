const LESSON_ERRORS = {
    NOT_FOUND: {
        statusCode: 404,
        message: 'Lesson not found'
    },
    ORDER_EXISTS: {
        statusCode: 409,
        message: 'Lesson order already exists in this course'
    },
    NOT_ENROLLED: {
        statusCode: 403,
        message: 'You are not enrolled in this course'
    },
    INVALID_DURATION: {
        statusCode: 400,
        message: 'Lesson duration must be a positive integer'
    },
    ACCESS_DENIED: {
        statusCode: 403,
        message: 'You do not have permission to access this lesson'
    }
};

module.exports = LESSON_ERRORS;