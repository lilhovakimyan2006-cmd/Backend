const net = require('node:net');

const PORT = 3001;

const players = [];

const board = ["_", "_", "_", "_", "_", "_", "_", "_", "_"];

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let currentTurn = "X";

const server = net.createServer((socket) => {

    if (players.length >= 2) {
        socket.write("FULL|server is full. Try again later.\n");
        socket.end();
        return;
    }

    players.push(socket);

    if (players[0] === socket) {
        socket.write("SYMBOL|X\n");
    } else if (players[1] === socket) {
        socket.write("SYMBOL|O\n");
    }

    if (players.length === 2) {
        players.forEach((player) => {
            player.write(`BOARD|${board.join(",")}\n`);
            player.write(`TURN|X\n`);
        });
    }

    let buffer = "";

    socket.on("data", (data) => {
        buffer += data.toString();

        const messages = buffer.split("\n");

        buffer = messages.pop();

        messages.forEach((message) => {
        
            const [command, value] = message.split("|");
    
            if (command === "MOVE") {
                const index = Number(value);
                const symbol = players[0] === socket ? "X" : "O";
    
                if (symbol !== currentTurn) {
                    socket.write("REJECTED|not your turn\n");
                    return;
                }
    
                if (index < 0 || index > 8 || !Number.isInteger(index)) {
                    socket.write("REJECTED|invalid move\n");
                    return;
                }
                
                if (board[index] === "_") {
                    board[index] = symbol;
    
                    const hasWon = winningCombinations.some((combination) => {
                        return combination.every((i) => board[i] === symbol);
                    });
    
                    if (hasWon) {
                        players.forEach((player) => {
                            player.write(`WIN|${symbol}\n`);
                        });
                        
                        players.forEach((player) => {
                            player.end();
                        });
    
                        return;
                    }
                    
                    players.forEach((player) => {
                        player.write(`BOARD|${board.join(",")}\n`);
                    });
    
                } else {
                    socket.write("REJECTED|cell occupied\n");
                    return;
                }
    
                const isDraw = !board.includes("_");
    
                if (isDraw) {
                    players.forEach((player) => {
                        player.write("DRAW\n");
                        player.end();
                    });
    
                    return;
                }
    
                currentTurn = symbol === "X" ? "O" : "X";
    
                players.forEach((player) => {
                    player.write(`TURN|${currentTurn}\n`);
                });
            }
        });
    });

    socket.on("close", () => {
        players.forEach((player) => {
            if (player && player !== socket) {
                player.write("OPPONENT_LEFT\n");
                player.end();
            }
        });

        players.length = 0;
        board.fill("_");
        currentTurn = "X";
    });
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});