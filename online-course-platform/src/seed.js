const bcrypt = require('bcryptjs');

const { sequelize, databaseExists } = require('./config/database');
const { NODE_ENV } = require('./config/env');

const { User, Course, Lesson } = require('./models');
const ROLES = require('./constants/roles');

const seed = async () => {
    try {
        await databaseExists();
        await sequelize.authenticate();

        await sequelize.sync({
            alter: NODE_ENV === 'development'
        });

        console.log('Database connected');

        const hashedPassword = await bcrypt.hash('Password123!', 12);

        const [admin] = await User.findOrCreate({
            where: { email: 'admin@example.com' },
            defaults: {
                fullName: 'Admin User',
                email: 'admin@example.com',
                password: hashedPassword,
                role: ROLES.ADMIN
            }
        });

        const [instructor] = await User.findOrCreate({
            where: { email: 'instructor@example.com' },
            defaults: {
                fullName: 'John Instructor',
                email: 'instructor@example.com',
                password: hashedPassword,
                role: ROLES.INSTRUCTOR
            }
        });

        const [student] = await User.findOrCreate({
            where: { email: 'student@example.com' },
            defaults: {
                fullName: 'Test Student',
                email: 'student@example.com',
                password: hashedPassword,
                role: ROLES.STUDENT
            }
        });

        console.log('Users created or already exist');

        const [course1] = await Course.findOrCreate({
            where: {
                title: 'Node.js Backend Development',
                instructorId: instructor.id
            },
            defaults: {
                title: 'Node.js Backend Development',
                description: 'Learn backend development with Node.js and Express.',
                category: 'Programming',
                level: 'beginner',
                price: 49.99,
                isPublished: true,
                instructorId: instructor.id
            }
        });

        const [course2] = await Course.findOrCreate({
            where: {
                title: 'JavaScript Fundamentals',
                instructorId: instructor.id
            },
            defaults: {
                title: 'JavaScript Fundamentals',
                description: 'Learn JavaScript from the beginning.',
                category: 'Programming',
                level: 'beginner',
                price: 29.99,
                isPublished: true,
                instructorId: instructor.id
            }
        });

        console.log('Courses created or already exist');

        await Lesson.findOrCreate({
            where: { courseId: course1.id, order: 1 },
            defaults: {
                title: 'Introduction to Node.js',
                content: 'Learn the basics of Node.js.',
                duration: 15,
                order: 1,
                courseId: course1.id
            }
        });

        await Lesson.findOrCreate({
            where: { courseId: course1.id, order: 2 },
            defaults: {
                title: 'Introduction to Express',
                content: 'Learn the basics of Express.js.',
                duration: 20,
                order: 2,
                courseId: course1.id
            }
        });

        await Lesson.findOrCreate({
            where: { courseId: course2.id, order: 1 },
            defaults: {
                title: 'JavaScript Basics',
                content: 'Learn variables, data types and operators.',
                duration: 25,
                order: 1,
                courseId: course2.id
            }
        });

        console.log('Lessons created or already exist');
        console.log('Seed completed successfully');

    } catch (error) {
        console.error('Seed failed:', error.message);
        process.exitCode = 1;
    } finally {
        await sequelize.close();
    }
};

seed();