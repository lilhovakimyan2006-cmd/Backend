const path = require('node:path');

const fs = require('node:fs/promises');

const source = process.argv[2];
const destination = process.argv[3];
const move = process.argv.includes('--move');

console.log('Source:', source);
console.log('Destination:', destination);
console.log('Mode:', move ? 'MOVE\n' : 'COPY\n');

const sourcePath = path.join(process.cwd(), source);
const destinationPath = path.join(process.cwd(), destination);

console.log('Source path:', sourcePath);
console.log('Destination path:', destinationPath, '\n');

async function organize(folderPath) {
    const entries = await fs.readdir(folderPath, {
        withFileTypes: true
    });

    for (const entry of entries) {
        const entryPath = path.join(folderPath, entry.name);
        
        if (entry.isDirectory()) {
            console.log('Folder:', entry.name);
            await organize(entryPath);
        }
    
        if (entry.isFile()) {
            const filename = path.basename(entryPath);

            console.log('\nFile:', filename);
            console.log('Souce file path:', entryPath);

            let category;

            if (filename.startsWith('.')) {
                category = 'hidden';
            } else {
                const extension = path.extname(filename);

                const newExtension = extension.slice(1);

                console.log('Extension:', newExtension);

                if (newExtension === '') {
                    category = 'no-extension';
                } else {
                    category = newExtension;
                }
            }

            console.log('Category:', category);

            const parsed = path.parse(filename);
            
            console.log('Name:', parsed.name);
            console.log('Extension:', parsed.ext);

            const destinationFolder = path.join(
                destinationPath,
                category
            );

            const destinationFilePath = path.join(
                destinationFolder,
                filename
            );

            console.log('Destination folder:', destinationFolder);
            
            await fs.mkdir(destinationFolder, {
                recursive: true
            });

            let counter = 1;
            let finalPath = destinationFilePath;

            while (true) {
                try {
                    await fs.access(finalPath);

                    console.log('Collision:', finalPath);

                    const newFilename = `${parsed.name}-${counter}${parsed.ext}`;

                    finalPath = path.join(
                        destinationFolder, 
                        newFilename
                    );

                    console.log('Trying:', finalPath);

                    ++counter;
                } catch {
                    break;
                }
            }

            console.log('Final destination:', finalPath);

            try {
                if (move) {
                    await fs.rename(entryPath, finalPath);

                    console.log('Moved:', filename, '->', finaslPath);
                } else {
                    await fs.copyFile(entryPath, finalPath);

                    console.log('Copied:', filename, '->', finalPath);
                }
            } catch (error) {
                console.log(`Failed to process: ${filename}`);
                console.log('Error:', error.message);
            }
        }
    }
}

organize(sourcePath).catch((error) => {
    console.log(error.message);
});