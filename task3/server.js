const net = require("node:net");

const PORT = 3000;

const clients = [];
const users = new Map();

const server = net.createServer((socket) => {
    console.log("Client connected");

    clients.push(socket);

    let username = null;
    let buffer = "";

    socket.write("Enter username:\n");

    socket.on("data", (data) => {
        buffer += data.toString();

        let boundary;

        while ((boundary = buffer.indexOf("\n")) !== -1) {
            const message = buffer.slice(0, boundary).trim();

            buffer = buffer.slice(boundary + 1);

            if (!username) {
                if (!message) {
                    socket.write("Username cannot be empty. Try again:\n");

                    continue;
                }

                if (users.has(message)) {
                    socket.write("Username already taken. Try again:\n");

                    continue;
                }

                username = message;
                users.set(username, socket);

                socket.write(`Welcome, ${username}!\n`);

                continue;
            }

            if (message === "/who") {
                const usernames = Array.from(users.keys());

                socket.write(
                    `Connected users:\n${usernames.join("\n")}\n`
                );

                continue;
            }

            if (message === "/quit") {
                socket.write("Goodbye!\n");
                socket.end();
                continue;
            }

            if (message.startsWith("/msg ")) {
                const parts = message.split(" ");

                const targetUsername = parts[1];
                const privateMessage = parts.slice(2).join(" ");

                if (!targetUsername || !privateMessage) {
                    socket.write(
                        "Usage: /msg <username> <message>\n"
                    );
                    continue;
                }

                const targetSocket = users.get(targetUsername);

                if (!targetSocket) {
                    socket.write(
                        `User "${targetUsername}" is not connected.\n`
                    );
                    continue;
                }

                targetSocket.write(
                    `[DM from ${username}]: ${privateMessage}\n`
                );

                socket.write(
                    `[you -> ${targetUsername}]: ${privateMessage}\n`
                );

                continue;
            }

            clients.forEach((client) => {
                if (client !== socket) {
                    client.write(`[${username}]: ${message}\n`);
                }
            });
        }
    });

    socket.on("close", () => {
        console.log("Client disconnected");

        const index = clients.indexOf(socket);

        if (index !== -1) {
            clients.splice(index, 1);
        }

        if (username) {
            users.delete(username);
        }
    });

    socket.on("error", (error) => {
        console.log(`Socket error: `, error.message);
    });
});

server.listen(PORT, () => {
    console.log(`Chat server is listening on port ${PORT}`);
});