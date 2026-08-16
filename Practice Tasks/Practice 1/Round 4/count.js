const fs = require('node:fs');

const stream = fs.createReadStream('text.txt');

let wordCount = 0;
let bytesProcessed = 0;
let leftover = '';

stream.on('data', (chunk) => {
    const text = chunk.toString();

    const data = leftover + text;
    
    const parts = data.split(/\s+/);
    
    if (parts[0] === '') {
        parts.shift();
    }

    if (parts.length > 0) {
        leftover = parts.pop();
    } else {
        leftover = '';
    }

    wordCount += parts.length;

    bytesProcessed += chunk.length;
});

stream.on('end', () => {
    if (leftover !== '') {
        ++wordCount;
    }

    console.log("Words:", wordCount);
    console.log("Bytes processed:", bytesProcessed);
});