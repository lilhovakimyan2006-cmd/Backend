const express = require('express');

const enrollmentController = require('../controllers/enrollment.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/authorize.middleware');
const validate = require('../middlewares/validate.middleware');
const asyncHandler = require('../utils/asyncHandler');

const ROLES = require('../constants/roles');
const { 
    enrollSchema, 
    updateProgressSchema 
} = require('./schemas/enrollment.schema');

const router = express.Router();

router.post(
    '/',
    authenticate,
    authorize(ROLES.STUDENT),
    validate(enrollSchema),
    asyncHandler(enrollmentController.enrollInCourse)
);

router.get(
    '/me',
    authenticate,
    authorize(ROLES.STUDENT),
    asyncHandler(enrollmentController.getMyEnrollments)
);

router.patch(
    '/:id/progress',
    authenticate,
    authorize(ROLES.STUDENT),
    validate(updateProgressSchema),
    asyncHandler(enrollmentController.updateProgress)
);

router.delete(
    '/:id',
    authenticate,
    authorize(ROLES.STUDENT, ROLES.ADMIN),
    asyncHandler(enrollmentController.cancelEnrollment)
);

router.get(
    '/',
    authenticate,
    authorize(ROLES.ADMIN),
    asyncHandler(enrollmentController.getAllEnrollments)
);

module.exports = router;