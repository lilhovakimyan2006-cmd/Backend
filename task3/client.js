const net = require("node:net");
const readline = require("node:readline");

const PORT = 3000;
const HOST = "localhost";

const socket = net.createConnection(PORT, HOST, () => {
    console.log("Connected to chat server");
});

let buffer = "";

socket.on("data", (data) => {
    buffer += data.toString();

    let boundary;

    while ((boundary = buffer.indexOf("\n")) !== -1) {
        const message = buffer.slice(0, boundary);
        buffer = buffer.slice(boundary + 1);

        console.log(message);
    }
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.on("line", (line) => {
    socket.write(line + "\n");
});

socket.on("close", () => {
    console.log("Disconnected from chat server.");
    
    rl.close();
});

socket.on("error", (error) => {
    console.log("Socket Error:", error.message);
});