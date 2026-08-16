const fsp = require('node:fs/promises');

const path = require('path');

const LIMIT = 100;

const file = process.argv[2];

async function rotateLog() {
    try {
        const stats = await fsp.stat(file);

        console.log(`${file} is ${stats.size} bytes`);

        if (stats.size <= LIMIT) {
            console.log(`No rotation needed for ${file}`);
        } else {
            const timestamp = new Date().toISOString();
            
            const parsed = path.parse(file);

            const fileName = `${parsed.name}-${timestamp}${parsed.ext}`;
        
            const archiveName = fileName.replace(/:/g, '-');

            await fsp.rename(file, archiveName);

            await fsp.writeFile(file, '');

            console.log(`Rotated: ${file} -> ${archiveName} (fresh log created)`);
        }

    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log(`No log file yet at ${file} -- nothing to rotate`);

            return;
        }

        throw error;
    }
} 

rotateLog();
