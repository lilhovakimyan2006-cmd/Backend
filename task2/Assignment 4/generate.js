const fs = require('fs');

const stream = fs.createWriteStream("server.log");

const levels = ["INFO", "WARN", "ERROR"];

const messages = [
    "Request handled in 42ms",
    "Connection timed out",
    "Retry attempt 2",
    "Database connection failed",
    "User authenticated",
    "Request received",
];

for (let i = 0; i < 100000; ++i) {

    const timestamp = new Date().toISOString();
    
    const level = levels[Math.floor(Math.random() * levels.length)];
    
    const message = messages[Math.floor(Math.random() * messages.length)];
    
    const line = `${timestamp} [${level}] ${message}\n`;
    
    stream.write(line);
}
