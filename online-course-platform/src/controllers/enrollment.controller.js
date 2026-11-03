const enrollmentService = require('../services/enrollment.service');

const enrollInCourse = async (req, res) => {
    const enrollment = await enrollmentService.enrollInCourse(
        req.body.courseId,
        req.user.id
    );

    res.status(201).json({
        success: true,
        message: 'Successfully enrolled in course',
        data: {
            enrollment
        }
    });
};

const getMyEnrollments = async (req, res) => {
    const enrollments = await enrollmentService.getMyEnrollments(
        req.user.id
    );

    res.status(200).json({
        success: true,
        results: enrollments.length,
        data: {
            enrollments
        }
    });
};

const updateProgress = async (req, res) => {
    const enrollment = await enrollmentService.updateProgress(
        req.params.id,
        req.body.progress,
        req.user.id
    );

    res.status(200).json({
        success: true,
        message: 'Enrollment progress updated successfully',
        data: {
            enrollment
        }
    });
};

const cancelEnrollment = async (req, res) => {
    const enrollment = await enrollmentService.cancelEnrollment(
        req.params.id,
        req.user.id,
        req.user
    );

    res.status(200).json({
        success: true,
        message: 'Enrollment cancelled successfully',
        data: {
            enrollment
        }
    });
};

const getAllEnrollments = async (req, res) => {
    const enrollments = await enrollmentService.getAllEnrollments();

    res.status(200).json({
        success: true,
        results: enrollments.length,
        data: {
            enrollments
        }
    });
};

module.exports = {
    enrollInCourse,
    getMyEnrollments,
    updateProgress,
    cancelEnrollment,
    getAllEnrollments
};