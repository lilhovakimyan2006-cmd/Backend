# Backend

This repository contains my backend development homework and practice tasks using Node.js.

---

# Task 1 — ESM and CJS

The first homework focuses on understanding the differences between:

- CommonJS (CJS)
- ECMAScript Modules (ESM)
- `require()` and `module.exports`
- `import` and `export`
- Module configuration with `package.json`
- Organizing utility modules

## Structure

```text
task1/
├── answer.md
├── cjs/
│   ├── index.js
│   ├── package.json
│   └── utils/
│       ├── math.js
│       └── strings.js
└── esm/
    ├── index.js
    ├── package.json
    └── utils/
        ├── math.js
        └── strings.js
```

## Task 2 — Node.js Core Assignments

This task contains five focused Node.js assignments and one capstone project covering:

- Buffer
- path
- fs / fs-promises
- Streams
- EventEmitter
- File processing
- Async programming
- Error handling

## Ground Rules

- Use Node.js 18+
- Prefer `fs/promises` and `async/await` unless an assignment requires otherwise
- Handle errors properly
- Test edge cases, not only the happy path
- Follow the restrictions specified in each assignment

---

# Assignment 1 — Buffer: Binary Header Parser

Implemented a binary file parser using Node.js `Buffer`.

## Requirements Covered

- Read binary data with `fs.readFileSync()`
- Parsed the `SNSR` magic header
- Validated the supported version
- Read the record count using Buffer methods
- Parsed timestamps, temperatures, and sensor IDs
- Converted timestamps into JavaScript `Date` objects
- Calculated the average temperature
- Found the most active sensor
- Generated a valid `records.bin` test file with `encode.js`

## Files

- `encode.js` — generates the binary test file
- `parse.js` — validates and parses the binary file
- `records.bin` — generated binary data

---

# Assignment 2 — path: Recursive File Organizer

Implemented a recursive file organizer using Node.js `path` and filesystem operations.

## Requirements Covered

- Recursively walked the source directory
- Found files at any nesting level
- Used `path.extname()` to determine extensions
- Used `path.basename()` and `path.parse()`
- Organized files by extension
- Put files without extensions into `no-extension/`
- Put hidden files into `hidden/`
- Handled files with multiple extensions such as `.tar.gz`
- Handled filename collisions with numeric suffixes
- Used `path.join()` for platform-independent paths

## Bonus

- Added support for moving files with the `--move` flag

## File

- `organize.js`

---

# Assignment 3 — fs: Safe Config Merger

Implemented a safe JSON configuration merger using `fs/promises`.

## Requirements Covered

- Loaded the required base configuration
- Loaded environment-specific override files
- Handled missing override files with a warning
- Implemented recursive deep merging
- Merged nested objects key-by-key
- Replaced arrays and primitive values from overrides
- Handled invalid JSON with clear error messages
- Used an atomic write strategy
- Wrote to a temporary file before renaming it to `config.final.json`

## Bonus

- Supports multiple override files in a chain

## File

- `merge.js`

---

# Assignment 4 — Streams: Constant-Memory Log Analyzer

Implemented a streaming log analyzer for large log files.

## Requirements Covered

- Used `fs.createReadStream()`
- Processed the file chunk-by-chunk
- Reconstructed complete lines across chunk boundaries
- Used a `leftover` buffer for incomplete lines
- Counted `ERROR`, `WARN`, and `INFO` entries
- Tracked the timestamp of the previous `ERROR`
- Calculated the longest gap between consecutive errors
- Processed remaining data when the stream ended
- Avoided loading the entire log file into memory

## Files

- `generate.js` — generates a large sample log
- `analyze.js` — analyzes the log using streams
- `server.log` — sample generated log

---

# Assignment 5 — EventEmitter: Limited-Concurrency Task Queue

Implemented a task queue using a custom `EventEmitter` class.

## Requirements Covered

- Created `TaskQueue` extending `EventEmitter`
- Added a configurable concurrency limit
- Ran only the allowed number of jobs simultaneously
- Queued additional jobs until a slot became available
- Emitted `job:start`
- Emitted `job:complete`
- Emitted `job:error`
- Emitted `queue:empty`
- Handled rejected jobs without stopping the queue
- Kept queue state private
- Used an internal queue and running-job counter

## Files

- `task-queue.js` — TaskQueue implementation
- `demo.js` — demonstrates the queue with multiple jobs

## Events

```text
job:start
job:complete
job:error
queue:empty
```

# Capstone — Chunked File Upload Processor

An advanced Node.js project combining **Buffer, Streams, path, fs/promises, and EventEmitter** into one complete file-processing workflow.

## Objective

Build a simulated file upload processor that receives a large file in chunks, validates and reassembles the data, safely writes the final file, and reports progress through custom events.

The goal is to combine the concepts from the previous assignments into one project while processing data efficiently.

---

## Concepts Used

- **Buffer** — work with raw binary data and parse headers
- **Streams** — process uploaded data chunk-by-chunk
- **path** — safely construct and manage file paths
- **fs/promises** — perform asynchronous filesystem operations
- **EventEmitter** — report upload and processing progress

---

## Requirements Covered

- Simulated a large file upload using multiple chunks
- Processed incoming data using a `Readable` stream
- Used `Buffer` for binary data processing
- Handled headers or payloads split across stream chunks
- Validated incoming data before creating the final file
- Reassembled the original file from received chunks
- Used `path.join()` for safe path construction
- Used `fs/promises` for asynchronous file operations
- Safely wrote the reconstructed file
- Reported processing stages through custom `EventEmitter` events
- Tracked upload progress
- Handled invalid data and filesystem errors

---

## Processing Flow

```text
Input File
    ↓
Split into Chunks
    ↓
Readable Stream
    ↓
Buffer Parsing
    ↓
Validation
    ↓
Reassemble Data
    ↓
Safe File Write
    ↓
Progress Events
    ↓
Completed File
```

# Node.js Practice Tasks

Five focused coding exercises covering **Buffer, path, fs, Streams, and EventEmitter**.

These tasks were completed as part of a Node.js practice session to strengthen understanding of Node.js core modules through practical coding exercises.

---

# Round 1 — Buffer: Caesar Cipher on Raw Bytes

Implemented a Caesar cipher that shifts letters directly using raw `Buffer` byte values.

## Requirements Covered

* Used `Buffer` to read and modify raw bytes
* Shifted uppercase and lowercase letters independently
* Supported positive and negative shift values
* Implemented alphabet wrapping
* Kept spaces, punctuation, numbers, and other bytes unchanged
* Processed the file using raw byte values

## Example

```text
Input:
Hello, World! 123

Shift:
3

Output:
Khoor, Zruog! 123
```

---

# Round 2 — path: Filename Sanitizer

Implemented a filename sanitizer using Node.js `path`.

## Requirements Covered

* Used `path.parse()` to separate the filename and extension
* Converted filenames to lowercase
* Collapsed spaces and punctuation into single dashes
* Removed leading and trailing dashes
* Preserved file extensions
* Converted extensions to lowercase
* Handled files without extensions
* Processed a flat, one-level directory

## Examples

```text
My Photo (final) FINAL.JPG
→ my-photo-final-final.jpg

report--2024.PDF
→ report-2024.pdf

weird_spacing .txt
→ weird-spacing.txt

archive.tar.GZ
→ archive-tar.gz

noext_file
→ noext-file
```

---

# Round 3 — fs: Log Rotation Simulator

Implemented a log rotation utility using `fs/promises` and `async/await`.

## Requirements Covered

* Checked file size using `fs.stat()`
* Used `async/await`
* Checked `error.code === 'ENOENT'`
* Renamed oversized logs with a timestamp
* Created a fresh empty log after rotation
* Handled missing log files without crashing

## Example

```text
Rotated: app.log -> app-2026-08-10T14-01-13-316Z.log

app.log is 0 bytes -- under the limit, no rotation needed.

No log file yet at missing.log -- nothing to rotate.
```

---

# Round 4 — Streams: Streaming Word Counter

Implemented a streaming word counter for large text files.

## Requirements Covered

* Used `fs.createReadStream()`
* Processed the file chunk-by-chunk
* Avoided loading the entire file into memory
* Counted words separated by whitespace
* Handled words split across stream chunks
* Used a `leftover` variable for incomplete words
* Kept only a running word count
* Tracked the number of processed bytes

## Example

```text
Words: 50000
Bytes processed: 336479
```

---

# Round 5 — EventEmitter: Live Progress Bar

Implemented a simulated downloader using `EventEmitter` and a live terminal progress bar.

## Requirements Covered

* Created a `Downloader` class extending `EventEmitter`
* Used `setInterval()` to simulate download progress
* Emitted a `progress` event for every step
* Emitted a `done` event when the download reached 100%
* Used event listeners to handle download events
* Built a 20-character progress bar
* Used `process.stdout.write()` to update the progress bar in place
* Used `\r` to return to the beginning of the terminal line

## Example

```text
[##------------------] 10%
[####----------------] 20%
[######--------------] 30%
[########------------] 40%
[##########----------] 50%
[############--------] 60%
[##############------] 70%
[################----] 80%
[##################--] 90%
[####################] 100%

Download complete!
```

---

# Topics Practiced

* Buffer
* Raw byte manipulation
* `path.parse()`
* `path.extname()`
* `fs/promises`
* `async/await`
* `fs.stat()`
* `fs.rename()`
* `fs.createReadStream()`
* Streams and chunks
* EventEmitter
* Custom events
* `setInterval()`
* `process.stdout.write()`
* Error handling
* File system operations

---

# Practice Structure

```text
practice/
├── Round 1 — Buffer
├── Round 2 — path
├── Round 3 — fs
├── Round 4 — Streams
└── Round 5 — EventEmitter
```

---

# Summary

This practice session covered important Node.js core concepts through five focused coding tasks.

The exercises progressed from raw binary data manipulation to filesystem operations, streaming large files, and event-driven programming.

The main goal was to understand how Node.js handles:

* Binary data
* File paths
* Filesystem operations
* Large data streams
* Custom events
* Asynchronous progress
* Error handling

# Task 3 — TCP Chat Application

## Objective

Build a real-time chat application using Node.js and the built-in `net` module.

The application allows multiple clients to connect to the same TCP server, choose unique usernames, send broadcast messages to everyone, and send private direct messages to specific users.

## Technologies

- Node.js
- `net` module
- `readline` module
- TCP sockets

No third-party networking libraries are used.

## Features

### Core Features

- Username registration
- Empty username validation
- Duplicate username prevention
- Broadcast messages
- Private direct messages
- Message framing using `\n`
- Safe client disconnection
- Socket error handling

### Additional Features

The following additional features were implemented:

- `/who` — displays all currently connected users
- `/quit` — gracefully disconnects the client
- Join/leave notifications

---

# Message Protocol

The application uses a simple text-based protocol.

## Message Framing

TCP does not guarantee that one `socket.write()` call will produce exactly one `data` event.

To solve this problem, messages are separated using a newline character (`\n`).

For example:

```text
hello\n
```

The client adds `\n` when sending a message:

```js
socket.write(line + "\n");
```

The server and client both use a buffer to handle cases where messages are split across multiple TCP `data` events or multiple messages arrive in a single event.

For example, TCP might deliver:

```text
hel
lo\n
```

instead of:

```text
hello\n
```

The buffer combines these chunks and processes the message only after the `\n` delimiter is received.

The server uses:

```js
buffer += data.toString();

let boundary;

while ((boundary = buffer.indexOf("\n")) !== -1) {
    const message = buffer.slice(0, boundary);

    buffer = buffer.slice(boundary + 1);

    // process message
}
```

The client uses the same buffering approach when receiving messages from the server.

This prevents problems caused by TCP message fragmentation or multiple messages arriving together.

---

# Username System

When a client connects, the server asks for a username:

```text
Enter username:
```

The username must:

- Not be empty
- Be unique among currently connected users

The server stores usernames and sockets in a `Map`:

```js
const users = new Map();
```

The structure is:

```text
username → socket
```

For example:

```text
alice → Alice's socket
bob   → Bob's socket
anna  → Anna's socket
```

This allows the server to find a specific user's socket when sending a private message.

If a username is already taken, the server responds:

```text
Username already taken. Try again:
```

If the username is empty:

```text
Username cannot be empty. Try again:
```

---

# Connected Clients

The server also keeps an array containing all currently connected sockets:

```js
const clients = [];
```

When a client connects, its socket is added:

```js
clients.push(socket);
```

When the client disconnects, its socket is removed from the array.

The `clients` array is mainly used for broadcast messages.

---

# Broadcast Messages

A normal message without a command prefix is treated as a broadcast message.

For example:

```text
hello everyone
```

The server sends the message to every connected client except the sender.

The server uses:

```js
clients.forEach((client) => {
    if (client !== socket) {
        client.write(`[${username}]: ${message}\n`);
    }
});
```

For example, if Alice sends:

```text
hello everyone
```

Bob and Anna receive:

```text
[alice]: hello everyone
```

Alice does not receive her own broadcast message.

---

# Direct Messages

Private messages use the following command:

```text
/msg <username> <message>
```

For example:

```text
/msg bob Hello Bob!
```

The server splits the command into:

```text
/msg
bob
Hello Bob!
```

The target username is used to find the recipient's socket:

```js
const targetSocket = users.get(targetUsername);
```

If the user exists, the server sends the message only to that socket.

The recipient receives:

```text
[DM from alice]: Hello Bob!
```

The sender receives confirmation:

```text
[you -> bob]: Hello Bob!
```

Other connected users do not receive the private message.

If the target user does not exist, the sender receives:

```text
User "bob" is not connected.
```

If the `/msg` command is used incorrectly, the server responds:

```text
Usage: /msg <username> <message>
```

---

# Commands

| Command | Description |
|---|---|
| `/msg <username> <message>` | Send a private message |
| `/who` | Show all connected users |
| `/quit` | Gracefully disconnect from the server |

---

# `/who` Command

The `/who` command displays all currently connected users.

Example:

```text
/who
```

The server responds:

```text
Connected users:
alice
bob
anna
```

The server gets the usernames using:

```js
const usernames = Array.from(users.keys());
```

and sends them to the client:

```js
socket.write(
    `Connected users:\n${usernames.join("\n")}\n`
);
```

---

# `/quit` Command

The `/quit` command allows a client to disconnect gracefully.

Example:

```text
/quit
```

The server responds:

```text
Goodbye!
```

Then the server closes that client's socket:

```js
socket.end();
```

Other connected users receive a leave notification.

---

# Join and Leave Notifications

When a new user joins the chat, all other connected users receive:

```text
*** alice joined ***
```

When a user leaves, the other connected users receive:

```text
*** alice left ***
```

This makes it clear when users enter or leave the chat.

---

# Disconnect Handling

The server must continue running even if a client disconnects unexpectedly.

When a socket closes, the server removes it from the `clients` array:

```js
const index = clients.indexOf(socket);

if (index !== -1) {
    clients.splice(index, 1);
}
```

The username is also removed from the `users` map:

```js
if (username) {
    users.delete(username);
}
```

This prevents disconnected users from remaining in the list of connected users.

Every socket also has an error handler:

```js
socket.on("error", (error) => {
    console.log("Socket error:", error.message);
});
```

This prevents an individual socket error from crashing the entire server.

---

# Project Structure

```text
task3/
├── server.js
├── client.js
└── README.md
```

---

# How to Run

## 1. Start the Server

Open a terminal in the Task 3 directory and run:

```bash
node server.js
```

You should see:

```text
Chat server is listening on port 3000
```

## 2. Start a Client

Open another terminal in the same directory and run:

```bash
node client.js
```

You should see:

```text
Connected to chat server
Enter username:
```

Enter a username, for example:

```text
alice
```

The server responds:

```text
Welcome, alice!
```

## 3. Connect Multiple Clients

Open additional terminals and run:

```bash
node client.js
```

For example:

```text
Client 1 → alice
Client 2 → bob
Client 3 → anna
```

Each username must be unique.

---

# Example Session

## Alice connects

```text
Enter username:
alice

Welcome, alice!
```

## Bob connects

Bob's terminal:

```text
Enter username:
bob

Welcome, bob!
```

Alice sees:

```text
*** bob joined ***
```

## Broadcast message

Alice sends:

```text
hello everyone
```

Bob receives:

```text
[alice]: hello everyone
```

## Private message

Alice sends:

```text
/msg bob Are you free later?
```

Alice sees:

```text
[you -> bob]: Are you free later?
```

Bob sees:

```text
[DM from alice]: Are you free later?
```

Anna does not receive the message.

## List users

Alice sends:

```text
/who
```

The server responds:

```text
Connected users:
alice
bob
anna
```

## Graceful exit

Alice sends:

```text
/quit
```

Alice sees:

```text
Goodbye!
```

Bob and Anna see:

```text
*** alice left ***
```

---

# Error Handling

The server handles invalid input and client disconnections without crashing.

The application handles:

- Empty usernames
- Duplicate usernames
- Invalid `/msg` commands
- Sending a DM to a nonexistent user
- Graceful client disconnections
- Abrupt client disconnections
- Socket errors
- TCP message fragmentation
- Multiple messages arriving in a single TCP `data` event

---

# Testing Checklist

The following cases should be tested before submitting:

1. Connect three clients at the same time.
2. Send a broadcast and verify that all other clients receive it.
3. Verify that the sender does not receive their own broadcast.
4. Send a private message and verify that only the intended recipient receives it.
5. Try to use a username that is already taken.
6. Try an empty username.
7. Send a DM to a nonexistent user.
8. Use `/who` to list connected users.
9. Use `/quit` to leave gracefully.
10. Close a client abruptly and verify that the server continues running.
11. Send multiple messages quickly and verify that they arrive intact.

---

# Summary

This project demonstrates how to build a basic real-time chat application directly on top of TCP using Node.js's built-in `net` module.

The application implements username management, broadcast messaging, private messaging, message framing, user lists, graceful exits, join/leave notifications, and safe connection handling without using third-party networking libraries.