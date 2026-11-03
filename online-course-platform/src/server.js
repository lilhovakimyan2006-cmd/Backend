const app = require('./app');

const {
    sequelize,
    databaseExists
} = require('./config/database');

require('./models');

const { PORT, NODE_ENV } = require('./config/env');

const start = async () => {
    try {
        await databaseExists();

        await sequelize.authenticate();

        console.log(`Database connected successfully`);

        await sequelize.sync({
            alter: NODE_ENV === 'development'
        });

        console.log('Models synchronized successfully');

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log(`Failed to start server:`, error.message);
        process.exit(1);
    }
}

start();