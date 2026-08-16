const fs = require('fs');

const stream = fs.createReadStream("server.log");

let totalLines = 0;
let errorCount = 0;
let warnCount = 0;
let infoCount = 0;

let leftover = "";

let lastErrorTimestamp = null;

let longestGap = 0;

let longestGapStart = null;
let longestGapEnd = null;

function processLine(line) {
    ++totalLines;

    if (line.includes("[ERROR]")) {
        ++errorCount;

        const currentTimestamp = line.split(" ")[0];

        if (lastErrorTimestamp !== null) {
            const currentDate = new Date(currentTimestamp);
            const lastDate = new Date(lastErrorTimestamp);

            const gap = (currentDate - lastDate) / 1000;

            if (gap > longestGap) {
                longestGap = gap;

                longestGapStart = lastErrorTimestamp;
                longestGapEnd = currentTimestamp;
            }
        }
            
        lastErrorTimestamp = currentTimestamp;

    } else if (line.includes("[WARN]")) {
        ++warnCount;
    } else if (line.includes("[INFO]")) {
        ++infoCount;
    }
}

stream.on("data", (chunk) => {
    const data = leftover + chunk.toString();

    const lines = data.split("\n");
    
    leftover = lines.pop();
    
    for (const line of lines) {
        processLine(line);
    }
});

stream.on("end", () => {
    if (leftover) {
        processLine(leftover);
    }

    console.log("Lines processed:", totalLines);
    console.log("ERROR:", errorCount);
    console.log("WARN:", warnCount);
    console.log("INFO:", infoCount);
    console.log("Longest gap between ERRORs:", longestGap, "seconds");
    console.log(`(between ${longestGapStart} and ${longestGapEnd})`);
});