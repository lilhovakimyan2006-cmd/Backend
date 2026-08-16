import fs from "fs";

const buffer = fs.readFileSync("records.bin");

const head = buffer.toString("ascii", 0, 4);

if (head !== "SNSR") {
    throw new Error("Invalid file format: expected SNSR");
};

const version = buffer.readUInt8(4);

if (version !== 1) {
    throw new Error(`Unsupported version: ${version}`);
};

const recordCount = buffer.readUInt16BE(5);

const records = new Array(recordCount);

let offset = 7;

for (let i = 0; i < recordCount; ++i) {
    const timestamp = buffer.readUInt32BE(offset);
    const temperature = buffer.readFloatBE(offset + 4);
    const sensorId = buffer.readUInt8(offset + 8);

    let obj = {
        timestamp: new Date(timestamp * 1000),
        temperature: temperature,
        sensorId: sensorId
    };

    records[i] = obj;

    offset += 9;
}

console.log(`File format valid (SNSR v${version})`);
console.log(`Records parsed: ${records.length}`);

let average = 0;

for (let i = 0; i < records.length; ++i) {
    average += records[i].temperature;
}

const averageTemperature = average / records.length;

console.log(`Average temperature: ${averageTemperature.toFixed(2)}°C`);

const sensorCounts = new Map();

for (const record of records) {
    const currentCount = sensorCounts.get(record.sensorId) || 0;

    sensorCounts.set(record.sensorId, currentCount + 1);
}

let mostActiveSensor = null;
let mostActiveCount = 0;

for (const [sensorId, count] of sensorCounts) {
    if (count > mostActiveCount) {
        mostActiveSensor = sensorId;
        mostActiveCount = count;
    }
}

console.log(`Most active sensor: #${mostActiveSensor} (${mostActiveCount} readings)`);

let calculatedChecksum = 0;

for (let i = 7; i < 97; i++) {
    calculatedChecksum += buffer[i];
}

calculatedChecksum %= 256;

const fileChecksum = buffer.readUInt8(97);

if (calculatedChecksum !== fileChecksum) {
    console.warn("Warning: checksum mismatch!");
} else {
    console.log("Checksum OK");
}