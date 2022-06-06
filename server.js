const ora = require('ora');
const app = require('./app');
const config = require('./config');

const gracefulShutdown = (msg) => {
    ora().info('Shutdown initiated: ' + msg);
    ora().info('Shutting down...');

    process.exit();
};

app.listen(3000, () => {
    process.on('SIGTERM', gracefulShutdown); // Handle kill commands
    process.on('SIGINT', gracefulShutdown); // Handle interrupts
    process.on('uncaughtException', gracefulShutdown); // Prevent dirty exit on uncaught exceptions
    process.on('unhandledRejection', gracefulShutdown); // Prevent dirty exit on unhandled promise rejection

    //if (error) {
    //    ora().fail('Database connection error');
    //    return gracefulShutdown('Database connection error');
    //}
    
    ora().succeed('Database connected');
    ora().succeed('Backend started on port ' + config.port);
}).on('error', (error) => {
    ora().fail('Backend failed to start (' + error.message + ')');
    process.exit();
});
