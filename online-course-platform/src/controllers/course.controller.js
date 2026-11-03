const courseService = require('../services/course.service');

const getAllCourses = async (req, res) => {
    const { courses, pagination } = await courseService.getAllCourses(req.query);

    res.status(200).json({
        success: true,
        results: courses.length,
        pagination,
        data: {
            courses
        }
    });
};

const getMyCourses = async (req, res) => {
    const courses = await courseService.getMyCourses(req.user.id);

    res.status(200).json({
        success: true,
        results: courses.length,
        data: {
            courses
        }
    });
};

const getCourseById = async (req, res) => {
    const course = await courseService.getCourseById(
        req.params.id,
        req.user
    );

    res.status(200).json({
        success: true,
        data: {
            course
        }
    });
};

const createCourse = async (req, res) => {
    const course = await courseService.createCourse(
        req.body,
        req.user.id
    );

    res.status(201).json({
        success: true,
        message: 'Course created successfully',
        data: {
            course
        }
    });
};

const updateCourse = async (req, res) => {
    const course = await courseService.updateCourse(
        req.params.id,
        req.body,
        req.user
    );

    res.status(200).json({
        success: true,
        message: 'Course updated successfully',
        data: {
            course
        }
    });
};

const deleteCourse = async (req, res) => {
    await courseService.deleteCourse(
        req.params.id,
        req.user
    );

    res.status(200).json({
        success: true,
        message: 'Course deleted successfully'
    });
};

const getCourseStudents = async (req, res) => {
    const students = await courseService.getCourseStudents(
        req.params.id,
        req.user
    );

    res.status(200).json({
        success: true,
        results: students.length,
        data: {
            students
        }
    });
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