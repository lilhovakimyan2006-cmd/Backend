const userService = require('../services/user.service');

const getAllUsers = async (req, res) => {
    const users = await userService.getAllUsers(req.query);

    res.status(200).json({
        success: true,
        results: users.length,
        data: {
            users
        }
    });
};

const getUserById = async (req, res) => {
    const user = await userService.getUserById(req.params.id);

    res.status(200).json({
        success: true,
        data: {
            user
        }
    });
};

const updateUserRole = async (req, res) => {
    const user = await userService.updateUserRole(
        req.params.id,
        req.body.role,
        req.user.id
    );

    res.status(200).json({
        success: true,
        message: 'User role updated successfully',
        data: {
            user
        }
    });
};

const deleteUser = async (req, res) => {
    await userService.deleteUser(req.params.id, req.user.id);

    res.status(200).json({
        success: true,
        message: 'User deleted successfully'
    });
};

module.exports = {
    getAllUsers,
    getUserById,
    updateUserRole,
    deleteUser
};