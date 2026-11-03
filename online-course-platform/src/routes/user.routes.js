const express = require('express');

const userController = require('../controllers/user.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/authorize.middleware');
const asyncHandler = require('../utils/asyncHandler');
const { updateRoleSchema } = require('./schemas/user.schema');
const validate = require('../middlewares/validate.middleware');
const ROLES = require('../constants/roles');

const router = express.Router();

router.get(
    '/',
    authenticate,
    authorize(ROLES.ADMIN),
    asyncHandler(userController.getAllUsers)
);

router.get(
    '/:id',
    authenticate,
    authorize(ROLES.ADMIN),
    asyncHandler(userController.getUserById)
);

router.patch(
    '/:id/role',
    authenticate,
    authorize(ROLES.ADMIN),
    validate(updateRoleSchema),
    asyncHandler(userController.updateUserRole)
);

router.delete(
    '/:id',
    authenticate,
    authorize(ROLES.ADMIN),
    asyncHandler(userController.deleteUser)
);

module.exports = router;