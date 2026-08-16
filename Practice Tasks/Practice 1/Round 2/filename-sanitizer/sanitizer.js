const fs = require('fs');

const path = require('path');

const files = fs.readdirSync("./input", {
    withFileTypes: true
});

for (const file of files) {
    if (!file.isFile()) continue;

    const parsed = path.parse(file.name);

    const newExt = parsed.ext.toLowerCase();

    const newName = parsed.name
        .toLocaleLowerCase()
        .replace(/[\s\W_]+/g, "-")
        .replace(/^-+|-+$/g, "");
    
    const newFilename = newName + newExt;

    if (!fs.existsSync("./output")) {
        fs.mkdirSync("./output");
    }

    const inputPath = path.join("./input", file.name);
    
    const outputPath = path.join("./output", newFilename);

    fs.copyFileSync(inputPath, outputPath);
}