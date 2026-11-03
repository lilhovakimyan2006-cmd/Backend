const { Enrollment, Course, User } = require('../models');
const AppError = require('../utils/AppError');

const ENROLLMENT_ERRORS = require('../constants/errors/enrollment.errors');
const COURSE_ERRORS = require('../constants/errors/course.errors');

const enrollInCourse = async (courseId, userId) => {
    const course = await Course.findByPk(courseId);

    if (!course || !course.isPublished) {
        throw new AppError(
            COURSE_ERRORS.NOT_FOUND.message,
            COURSE_ERRORS.NOT_FOUND.statusCode
        );
    }

    if (course.instructorId === userId) {
        throw new AppError(
            ENROLLMENT_ERRORS.OWN_COURSE.message,
            ENROLLMENT_ERRORS.OWN_COURSE.statusCode
        );
    }

    const existingEnrollment = await Enrollment.findOne({
        where: {
            userId,
            courseId
        }
    });

    if (existingEnrollment) {
        throw new AppError(
            ENROLLMENT_ERRORS.ALREADY_ENROLLED.message,
            ENROLLMENT_ERRORS.ALREADY_ENROLLED.statusCode
        );
    }

    const enrollment = await Enrollment.create({
        userId,
        courseId
    });

    return enrollment;
};

const getMyEnrollments = async (userId) => {
    const enrollments = await Enrollment.findAll({
        where: { userId },
        include: [
            {
                model: Course,
                as: 'course',
                include: [
                    {
                        model: User,
                        as: 'instructor',
                        attributes: ['id', 'fullName', 'email']
                    }
                ]
            }
        ],
        order: [['enrolledAt', 'DESC']]
    });

    return enrollments;
};

const updateProgress = async (enrollmentId, progress, userId) => {
    const enrollment = await Enrollment.findByPk(enrollmentId);

    if (!enrollment) {
        throw new AppError(
            ENROLLMENT_ERRORS.NOT_FOUND.message,
            ENROLLMENT_ERRORS.NOT_FOUND.statusCode
        );
    }

    if (enrollment.userId !== userId) {
        throw new AppError(
            ENROLLMENT_ERRORS.NOT_OWNER.message,
            ENROLLMENT_ERRORS.NOT_OWNER.statusCode
        );
    }

    if (enrollment.status === 'cancelled') {
        throw new AppError(
            ENROLLMENT_ERRORS.CANCELLED.message,
            ENROLLMENT_ERRORS.CANCELLED.statusCode
        );
    }

    if (
        !Number.isInteger(progress) ||
        progress < 0 ||
        progress > 100
    ) {
        throw new AppError(
            ENROLLMENT_ERRORS.INVALID_PROGRESS.message,
            ENROLLMENT_ERRORS.INVALID_PROGRESS.statusCode
        );
    }

    enrollment.progress = progress;

    if (progress === 100) {
        enrollment.status = 'completed';
    } else {
        enrollment.status = 'active';
    }

    await enrollment.save();

    return enrollment;
};

const cancelEnrollment = async (enrollmentId, userId, currentUser) => {
    const enrollment = await Enrollment.findByPk(enrollmentId);

    if (!enrollment) {
        throw new AppError(
            ENROLLMENT_ERRORS.NOT_FOUND.message,
            ENROLLMENT_ERRORS.NOT_FOUND.statusCode
        );
    }

    const isAdmin = currentUser.role === 'admin';
    const isOwner = enrollment.userId === userId;

    if (!isAdmin && !isOwner) {
        throw new AppError(
            ENROLLMENT_ERRORS.NOT_OWNER.message,
            ENROLLMENT_ERRORS.NOT_OWNER.statusCode
        );
    }

    enrollment.status = 'cancelled';

    await enrollment.save();

    return enrollment;
};

const getAllEnrollments = async () => {
    const enrollments = await Enrollment.findAll({
        include: [
            {
                model: User,
                as: 'user',
                attributes: ['id', 'fullName', 'email', 'role']
            },
            {
                model: Course,
                as: 'course',
                attributes: ['id', 'title', 'category', 'level', 'price']
            }
        ],
        order: [['enrolledAt', 'DESC']]
    });

    return enrollments;
};

module.exports = {
    enrollInCourse,
    getMyEnrollments,
    updateProgress,
    cancelEnrollment,
    getAllEnrollments
};