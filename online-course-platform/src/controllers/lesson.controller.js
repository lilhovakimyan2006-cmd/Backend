const lessonService = require('../services/lesson.service');

const getCourseLessons = async (req, res) => {
    const lessons = await lessonService.getCourseLessons(
        req.params.courseId,
        req.user
    );

    res.status(200).json({
        success: true,
        results: lessons.length,
        data: {
            lessons
        }
    });
};

const getLessonById = async (req, res) => {
    const lesson = await lessonService.getLessonById(
        req.params.id,
        req.user
    );

    res.status(200).json({
        success: true,
        data: {
            lesson
        }
    });
};

const createLesson = async (req, res) => {
    const lesson = await lessonService.createLesson(
        req.params.courseId,
        req.body,
        req.user
    );

    res.status(201).json({
        success: true,
        message: 'Lesson created successfully',
        data: {
            lesson
        }
    });
};

const updateLesson = async (req, res) => {
    const lesson = await lessonService.updateLesson(
        req.params.id,
        req.body,
        req.user
    );

    res.status(200).json({
        success: true,
        message: 'Lesson updated successfully',
        data: {
            lesson
        }
    });
};

const deleteLesson = async (req, res) => {
    await lessonService.deleteLesson(
        req.params.id,
        req.user
    );

    res.status(200).json({
        success: true,
        message: 'Lesson deleted successfully'
    });
};

module.exports = {
    getCourseLessons,
    getLessonById,
    createLesson,
    updateLesson,
    deleteLesson
};
