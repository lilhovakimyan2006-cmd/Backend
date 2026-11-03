# Online Course Platform API

A RESTful backend API for an online learning platform inspired by platforms like Udemy and Coursera. The application supports user authentication, role-based access control, course management, lessons, and student enrollments.

## Features

- User registration and login with JWT authentication
- Password hashing using bcrypt
- Role-based access control (Admin, Instructor, Student)
- Course creation, publishing, updating, and deletion
- Lesson management with course-specific ordering
- Student enrollment and progress tracking
- Automatic enrollment completion when progress reaches 100%
- Enrollment cancellation while preserving enrollment history
- Input validation using Joi
- Centralized error handling
- Sequelize ORM with PostgreSQL
- Pagination and course search
- Database transactions for safe course deletion
- Automatic database creation and model synchronization
- Seed script for creating sample users, courses, and lessons

## Technologies

- Node.js
- Express.js
- PostgreSQL
- Sequelize
- JWT (jsonwebtoken)
- bcryptjs
- Joi
- dotenv

## Project Structure

```text
src/
├── config/
│   ├── database.js
│   └── env.js
├── constants/
│   ├── errors/
│   └── roles.js
├── models/
│   ├── index.js
│   ├── user.model.js
│   ├── course.model.js
│   ├── lesson.model.js
│   └── enrollment.model.js
├── routes/
│   ├── schemas/
│   ├── auth.routes.js
│   ├── user.routes.js
│   ├── course.routes.js
│   ├── lesson.routes.js
│   ├── enrollment.routes.js
│   └── index.js
├── controllers/
├── services/
├── middlewares/
├── utils/
├── app.js
├── server.js
└── seed.js
```

## Installation

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd online-course-platform
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=course_platform
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_DIALECT=postgres

JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d

NODE_ENV=development
```

### 4. Database Setup and Synchronization

The application checks whether the PostgreSQL database exists and creates it automatically if necessary.

When the server starts, Sequelize authenticates the database connection and synchronizes the models.

In development mode, the application uses `sequelize.sync({ alter: true })` to update the database schema.

### 5. Start the development server

```bash
npm run dev