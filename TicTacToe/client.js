const net = require('node:net');

const readline = require("node:readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const PORT = 3001;

const client = net.createConnection({ port: PORT }, () => {
    console.log("Connected to server");
});

function askMove() {
    rl.question("Choose cell (0-8): ", (answer) => {
        client.write(`MOVE|${answer}\n`);
    });
}

let buffer = "";
let symbol = "";
let board = [];

client.on("data", (data) => {
    buffer += data.toString();

    const message = buffer.split("\n");

    buffer = message.pop();

    message.forEach((msg) => {
        const [command, value] = msg.split("|");

        if (command === "SYMBOL") {
            symbol = value;
        }

        if (command === "BOARD") {
            board = value.split(",");

            console.log(`
                ${board[0]} | ${board[1]} | ${board[2]}
                ---------
                ${board[3]} | ${board[4]} | ${board[5]}
                ---------
                ${board[6]} | ${board[7]} | ${board[8]}
                `);
        }

        if (command === "TURN") {
            if (value === symbol) {
                console.log("Your turn");
                askMove();
            } else {
                console.log("Opponent's turn");
            }
        }

        if (command === "REJECTED") {
            console.log(value);
            askMove();
        }

        if (command === "WIN") {
            if (value === symbol) {
                console.log("You win!");
            } else {
                console.log("You lose!");
            }
        }

        if (command === "DRAW") {
            console.log("Draw!");
        }

        if (command === "OPPONENT_LEFT") {
            console.log("Opponent left the game");
        }

        if (command === "FULL") {
            console.log(value);
            rl.close();
        }
    });
});

client.on("close", () => {
    console.log("Disconnected from server");
});