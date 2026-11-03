const { Op, literal } = require('sequelize');

const { Course, User, Lesson, Enrollment } = require('../models');
const { sequelize } = require('../config/database');
const AppError = require('../utils/AppError');
const COURSE_ERRORS = require('../constants/errors/course.errors');
const ROLES = require('../constants/roles');

const getAllCourses = async (filters = {}) => {
    const where = {
        isPublished: true
    };

    if (filters.category) {
        where.category = filters.category;
    }

    if (filters.level) {
        where.level = filters.level;
    }

    if (filters.search) {
        where.title = {
            [Op.iLike]: `%${filters.search}%`
        };
    }

    const parsedPage = Number(filters.page);
    const parsedLimit = Number(filters.limit);

    const page = Number.isSafeInteger(parsedPage) && parsedPage > 0
        ? parsedPage
        : 1;

    const limit = Number.isSafeInteger(parsedLimit) && parsedLimit > 0
        ? Math.min(parsedLimit, 100)
        : 10;

    const offset = (page - 1) * limit;

    const { count, rows: courses } = await Course.findAndCountAll({
        where,
        attributes: {
            include: [
                [
                    literal(`(
                        SELECT COUNT(*)
                        FROM "lessons"
                        WHERE "lessons"."courseId" = "Course"."id"
                    )`),
                    'lessonCount'
                ]
            ]
        },
        include: [
            {
                model: User,
                as: 'instructor',
                attributes: ['id', 'fullName', 'email']
            }
        ],
        order: [['createdAt', 'DESC']],
        limit,
        offset,
        distinct: true
    });

    const totalPages = Math.ceil(count / limit);

    return {
        courses,
        pagination: {
            currentPage: page,
            totalPages,
            totalCourses: count,
            limit,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1
        }
    };
};

const validateCoursePrice = (price) => {
    if (
        price !== undefined &&
        (
            price === null ||
            price === '' ||
            !Number.isFinite(Number(price)) ||
            Number(price) < 0
        )
    ) {
        throw new AppError(
            COURSE_ERRORS.INVALID_PRICE.message,
            COURSE_ERRORS.INVALID_PRICE.statusCode
        );
    }
};

const getMyCourses = async (instructorId) => {
    const courses = await Course.findAll({
        where: {
            instructorId
        },
        include: [
            {
                model: User,
                as: 'instructor',
                attributes: ['id', 'fullName', 'email']
            }
        ],
        order: [['createdAt', 'DESC']]
    });

    return courses;
};

const getCourseById = async (courseId, currentUser) => {
    const course = await Course.findByPk(courseId, {
        include: [
            {
                model: User,
                as: 'instructor',
                attributes: ['id', 'fullName', 'email']
            },
            {
                model: Lesson,
                as: 'lessons'
            }
        ],
        order: [
            [{ model: Lesson, as: 'lessons' }, 'order', 'ASC']
        ]
    });

    if (!course) {
        throw new AppError(
            COURSE_ERRORS.NOT_FOUND.message,
            COURSE_ERRORS.NOT_FOUND.statusCode
        );
    }

    const isOwner = currentUser &&
        course.instructorId === currentUser.id;

    const isAdmin = currentUser &&
        currentUser.role === ROLES.ADMIN;

    if (!course.isPublished && !isOwner && !isAdmin) {
        throw new AppError(
            COURSE_ERRORS.NOT_FOUND.message,
            COURSE_ERRORS.NOT_FOUND.statusCode
        );
    }

    return course;
};

const createCourse = async (courseData, instructorId) => {
    validateCoursePrice(courseData.price);

    const course = await Course.create({
        ...courseData,
        instructorId
    });

    return course;
};

const updateCourse = async (courseId, updateData, currentUser) => {
    const course = await Course.findByPk(courseId);

    if (!course) {
        throw new AppError(
            COURSE_ERRORS.NOT_FOUND.message,
            COURSE_ERRORS.NOT_FOUND.statusCode
        );
    }

    const isOwner = course.instructorId === currentUser.id;
    const isAdmin = currentUser.role === ROLES.ADMIN;

    if (!isOwner && !isAdmin) {
        throw new AppError(
            COURSE_ERRORS.NOT_OWNER.message,
            COURSE_ERRORS.NOT_OWNER.statusCode
        );
    }

    validateCoursePrice(updateData.price);

    await course.update(updateData);

    return course;
};

const deleteCourse = async (courseId, currentUser) => {
    const course = await Course.findByPk(courseId);

    if (!course) {
        throw new AppError(
            COURSE_ERRORS.NOT_FOUND.message,
            COURSE_ERRORS.NOT_FOUND.statusCode
        );
    }

    const isOwner = course.instructorId === currentUser.id;
    const isAdmin = currentUser.role === ROLES.ADMIN;

    if (!isOwner && !isAdmin) {
        throw new AppError(
            COURSE_ERRORS.NOT_OWNER.message,
            COURSE_ERRORS.NOT_OWNER.statusCode
        );
    }

    await sequelize.transaction(async (transaction) => {
        await Enrollment.destroy({
            where: { courseId },
            transaction
        });

        await Lesson.destroy({
            where: { courseId },
            transaction
        });

        await course.destroy({ transaction });
    });

    return course;
};

const getCourseStudents = async (courseId, currentUser) => {
    const course = await Course.findByPk(courseId, {
        include: [
            {
                model: User,
                as: 'students',
                attributes: ['id', 'fullName', 'email'],
                through: {
                    attributes: ['status', 'progress', 'enrolledAt']
                }
            }
        ]
    });

    if (!course) {
        throw new AppError(
            COURSE_ERRORS.NOT_FOUND.message,
            COURSE_ERRORS.NOT_FOUND.statusCode
        );
    }

    const isOwner = course.instructorId === currentUser.id;
    const isAdmin = currentUser.role === ROLES.ADMIN;

    if (!isOwner && !isAdmin) {
        throw new AppError(
            COURSE_ERRORS.NOT_OWNER.message,
            COURSE_ERRORS.NOT_OWNER.statusCode
        );
    }

    return course.students;
};

module.exports = {
    getAllCourses,
    getMyCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
    getCourseStudents
};