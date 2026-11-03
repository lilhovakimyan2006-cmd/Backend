const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const ROLES = require('../constants/roles');

const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [2, 100]
            }
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                notEmpty: true
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [6, 255]
            }
        },

        role: {
            type: DataTypes.ENUM(...Object.values(ROLES)),
            allowNull: false,
            defaultValue: ROLES.STUDENT
        }
    },
    {
        tableName: 'users',
        timestamps: true,
        defaultScope: {
            attributes: {
                exclude: ['password']
            }
        }
    }
);

module.exports = User;