const express = require('express');
const router = express.Router();

const lessonController = require('../controllers/lesson.controller');

const { authenticate } = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/authorize.middleware');
const validate = require('../middlewares/validate.middleware');
const asyncHandler = require('../utils/asyncHandler');

const ROLES = require('../constants/roles');

const {
    createLessonSchema,
    updateLessonSchema
} = require('./schemas/lesson.schema');

router.get(
    '/courses/:courseId/lessons',
    authenticate,
    asyncHandler(lessonController.getCourseLessons)
);

router.get(
    '/lessons/:id',
    authenticate,
    asyncHandler(lessonController.getLessonById)
);

router.post(
    '/courses/:courseId/lessons',
    authenticate,
    authorize(ROLES.INSTRUCTOR, ROLES.ADMIN),
    validate(createLessonSchema),
    asyncHandler(lessonController.createLesson)
);

router.put(
    '/lessons/:id',
    authenticate,
    authorize(ROLES.INSTRUCTOR, ROLES.ADMIN),
    validate(updateLessonSchema),
    asyncHandler(lessonController.updateLesson)
);

router.delete(
    '/lessons/:id',
    authenticate,
    authorize(ROLES.INSTRUCTOR, ROLES.ADMIN),
    asyncHandler(lessonController.deleteLesson)
);

module.exports = router;