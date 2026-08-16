import fs from "fs";

const buffer = Buffer.alloc(98, 0);

buffer.write("SNSR");
buffer.writeUInt8(1, 4);
buffer.writeUInt16BE(10, 5);

const records = [
    { timestamp: 1755000000, temperature: 22.5, sensorId: 1 },
    { timestamp: 1755000060, temperature: 23.1, sensorId: 2 },
    { timestamp: 1755000120, temperature: 21.8, sensorId: 3 },
    { timestamp: 1755000180, temperature: 22.9, sensorId: 1 },
    { timestamp: 1755000240, temperature: 24.2, sensorId: 2 },
    { timestamp: 1755000300, temperature: 23.7, sensorId: 1 },
    { timestamp: 1755000360, temperature: 21.5, sensorId: 3 },
    { timestamp: 1755000420, temperature: 22.8, sensorId: 1 },
    { timestamp: 1755000480, temperature: 24.0, sensorId: 2 },
    { timestamp: 1755000540, temperature: 23.3, sensorId: 1 }
];

let offset = 7;

for (const record of records) {
    buffer.writeUInt32BE(record.timestamp, offset);
    buffer.writeFloatBE(record.temperature, offset + 4);
    buffer.writeUInt8(record.sensorId, offset + 8);

    offset += 9;
}

let checksum = 0;

for (let i = 7; i < 97; i++) {
    checksum += buffer[i];
}

checksum %= 256;

buffer.writeUInt8(checksum, 97);

fs.writeFileSync("records.bin", buffer);

console.log("records.bin created successfully");