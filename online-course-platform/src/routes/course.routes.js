const express = require('express');

const courseController = require('../controllers/course.controller');
const asyncHandler = require('../utils/asyncHandler');
const { authenticate, optionalAuthenticate } = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/authorize.middleware');
const validate = require('../middlewares/validate.middleware');
const ROLES = require('../constants/roles');
const { 
    createCourseSchema,
    updateCourseSchema
} = require('./schemas/course.schema');

const router = express.Router();

router.get(
    '/',
    asyncHandler(courseController.getAllCourses)
);

router.get(
    '/my',
    authenticate,
    authorize(ROLES.INSTRUCTOR),
    asyncHandler(courseController.getMyCourses)
);

router.get(
    '/:id',
    optionalAuthenticate,
    asyncHandler(courseController.getCourseById)
);

router.post(
    '/',
    authenticate,
    authorize(ROLES.INSTRUCTOR, ROLES.ADMIN),
    validate(createCourseSchema),
    asyncHandler(courseController.createCourse)
);

router.put(
    '/:id',
    authenticate,
    authorize(ROLES.INSTRUCTOR, ROLES.ADMIN),
    validate(updateCourseSchema),
    asyncHandler(courseController.updateCourse)
);

router.delete(
    '/:id',
    authenticate,
    authorize(ROLES.INSTRUCTOR, ROLES.ADMIN),
    asyncHandler(courseController.deleteCourse)
);

router.get(
    '/:id/students',
    authenticate,
    authorize(ROLES.INSTRUCTOR, ROLES.ADMIN),
    asyncHandler(courseController.getCourseStudents)
);

module.exports = router;