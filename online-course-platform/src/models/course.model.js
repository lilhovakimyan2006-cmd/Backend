const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Course = sequelize.define(
    'Course',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 150]
            }
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },

        category: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },

        level: {
            type: DataTypes.ENUM(
                'beginner',
                'intermediate',
                'advanced'
            ),
            allowNull: false,
            defaultValue: 'beginner'
        },

        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0
            }
        },

        isPublished: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },

        instructorId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'courses',
        timestamps: true
    }
);

module.exports = Course;