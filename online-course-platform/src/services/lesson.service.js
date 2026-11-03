const { Lesson, Course, Enrollment } = require('../models');

const AppError = require('../utils/AppError');
const ROLES = require('../constants/roles');

const LESSON_ERRORS = require('../constants/errors/lesson.errors');
const COURSE_ERRORS = require('../constants/errors/course.errors');

const checkCourseAccess = async (courseId, user) => {
    const course = await Course.findByPk(courseId);

    if (!course) {
        throw new AppError(
            COURSE_ERRORS.NOT_FOUND.message,
            COURSE_ERRORS.NOT_FOUND.statusCode
        );
    }

    if (user.role === ROLES.ADMIN) {
        return course;
    }

    if (
        user.role === ROLES.INSTRUCTOR &&
        course.instructorId === user.id
    ) {
        return course;
    }

    if (user.role === ROLES.STUDENT) {
        const enrollment = await Enrollment.findOne({
            where: {
                userId: user.id,
                courseId,
                status: ['active', 'completed']
            }
        });

        if (enrollment) {
            return course;
        }

        throw new AppError(
            LESSON_ERRORS.NOT_ENROLLED.message,
            LESSON_ERRORS.NOT_ENROLLED.statusCode
        );
    }

    throw new AppError(
        LESSON_ERRORS.ACCESS_DENIED.message,
        LESSON_ERRORS.ACCESS_DENIED.statusCode
    );
};

const validateLessonDuration = (duration) => {
    if (
        duration !== undefined &&
        (!Number.isInteger(Number(duration)) || Number(duration) <= 0)
    ) {
        throw new AppError(
            LESSON_ERRORS.INVALID_DURATION.message,
            LESSON_ERRORS.INVALID_DURATION.statusCode
        );
    }
};

const getCourseLessons = async (courseId, user) => {
    await checkCourseAccess(courseId, user);

    const lessons = await Lesson.findAll({
        where: { courseId },
        order: [['order', 'ASC']]
    });

    return lessons;
};

const getLessonById = async (lessonId, user) => {
    const lesson = await Lesson.findByPk(lessonId);

    if (!lesson) {
        throw new AppError(
            LESSON_ERRORS.NOT_FOUND.message,
            LESSON_ERRORS.NOT_FOUND.statusCode
        );
    }

    await checkCourseAccess(lesson.courseId, user);

    return lesson;
};

const createLesson = async (courseId, lessonData, user) => {
    const course = await Course.findByPk(courseId);

    if (!course) {
        throw new AppError(
            COURSE_ERRORS.NOT_FOUND.message,
            COURSE_ERRORS.NOT_FOUND.statusCode
        );
    }

    const isAdmin = user.role === ROLES.ADMIN;

    const isOwner =
        user.role === ROLES.INSTRUCTOR &&
        course.instructorId === user.id;

    if (!isAdmin && !isOwner) {
        throw new AppError(
            COURSE_ERRORS.NOT_OWNER.message,
            COURSE_ERRORS.NOT_OWNER.statusCode
        );
    }

    const existingLesson = await Lesson.findOne({
        where: {
            courseId,
            order: lessonData.order
        }
    });

    if (existingLesson) {
        throw new AppError(
            LESSON_ERRORS.ORDER_EXISTS.message,
            LESSON_ERRORS.ORDER_EXISTS.statusCode
        );
    }

    validateLessonDuration(lessonData.duration);

    const lesson = await Lesson.create({
        ...lessonData,
        courseId
    });

    return lesson;
};

const updateLesson = async (lessonId, updateData, user) => {
    const lesson = await Lesson.findByPk(lessonId);

    if (!lesson) {
        throw new AppError(
            LESSON_ERRORS.NOT_FOUND.message,
            LESSON_ERRORS.NOT_FOUND.statusCode
        );
    }

    const course = await Course.findByPk(lesson.courseId);

    if (!course) {
        throw new AppError(
            COURSE_ERRORS.NOT_FOUND.message,
            COURSE_ERRORS.NOT_FOUND.statusCode
        );
    }

    const isAdmin = user.role === ROLES.ADMIN;

    const isOwner =
        user.role === ROLES.INSTRUCTOR &&
        course.instructorId === user.id;

    if (!isAdmin && !isOwner) {
        throw new AppError(
            COURSE_ERRORS.NOT_OWNER.message,
            COURSE_ERRORS.NOT_OWNER.statusCode
        );
    }

    if (updateData.order !== undefined) {
        const existingLesson = await Lesson.findOne({
            where: {
                courseId: lesson.courseId,
                order: updateData.order
            }
        });

        if (existingLesson && existingLesson.id !== lesson.id) {
            throw new AppError(
                LESSON_ERRORS.ORDER_EXISTS.message,
                LESSON_ERRORS.ORDER_EXISTS.statusCode
            );
        }
    }

    validateLessonDuration(updateData.duration);

    await lesson.update(updateData);

    return lesson;
};

const deleteLesson = async (lessonId, user) => {
    const lesson = await Lesson.findByPk(lessonId);

    if (!lesson) {
        throw new AppError(
            LESSON_ERRORS.NOT_FOUND.message,
            LESSON_ERRORS.NOT_FOUND.statusCode
        );
    }

    const course = await Course.findByPk(lesson.courseId);

    if (!course) {
        throw new AppError(
            COURSE_ERRORS.NOT_FOUND.message,
            COURSE_ERRORS.NOT_FOUND.statusCode
        );
    }

    const isAdmin = user.role === ROLES.ADMIN;

    const isOwner =
        user.role === ROLES.INSTRUCTOR &&
        course.instructorId === user.id;

    if (!isAdmin && !isOwner) {
        throw new AppError(
            COURSE_ERRORS.NOT_OWNER.message,
            COURSE_ERRORS.NOT_OWNER.statusCode
        );
    }

    await lesson.destroy();

    return lesson;
};

module.exports = {
    getCourseLessons,
    getLessonById,
    createLesson,
    updateLesson,
    deleteLesson
};