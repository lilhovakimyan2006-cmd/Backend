const User = require('./user.model');
const Course = require('./course.model');
const Lesson = require('./lesson.model');
const Enrollment = require('./enrollment.model');

User.hasMany(Course, {
    foreignKey: 'instructorId',
    as: 'courses'
});

Course.belongsTo(User, {
    foreignKey: 'instructorId',
    as: 'instructor'
});

Course.hasMany(Lesson, {
    foreignKey: 'courseId',
    as: 'lessons',
    onDelete: 'CASCADE'
});

Lesson.belongsTo(Course, {
    foreignKey: 'courseId',
    as: 'course'
});

User.belongsToMany(Course, {
    through: Enrollment,
    foreignKey: 'userId',
    otherKey: 'courseId',
    as: 'enrolledCourses'
});

Course.belongsToMany(User, {
    through: Enrollment,
    foreignKey: 'courseId',
    otherKey: 'userId',
    as: 'students'
});

// Enrollment relationships
Enrollment.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});

Enrollment.belongsTo(Course, {
    foreignKey: 'courseId',
    as: 'course'
});

module.exports = {
    User,
    Course,
    Lesson,
    Enrollment
};