# Backend

This repository contains my backend development homework and practice tasks.

## Task 1 — ESM and CJS

The first homework focuses on understanding the differences between:

* **CommonJS (CJS)**
* **ECMAScript Modules (ESM)**
* `require()` and `module.exports`
* `import` and `export`
* Module configuration with `package.json`
* Organizing utility modules

### Structure

```text
Backend/
└── homework1/
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

## Technologies

* JavaScript
* Node.js
* CommonJS
* ECMAScript Modules (ESM)
* Git & GitHub


# Task 2 — Node.js Core Assignments

Five focused assignments plus one capstone project covering **Buffer, path, fs/fs-promises, Streams, and EventEmitter**.

## Ground Rules

- Use **Node.js 18+**
- Prefer `fs/promises` and `async/await` unless the assignment requires otherwise
- Handle errors properly
- Test edge cases, not only the happy path
- Follow the restrictions specified in each assignment

---

## Assignment 1 — Buffer: Binary Header Parser

Implemented a binary file parser using Node.js `Buffer`.

### Requirements covered

- Read binary data with `fs.readFileSync()`
- Parsed the `SNSR` magic header
- Validated the supported version
- Read the record count using Buffer methods
- Parsed timestamps, temperatures, and sensor IDs
- Converted timestamps into JavaScript `Date` objects
- Calculated the average temperature
- Found the most active sensor
- Generated a valid `records.bin` test file with `encode.js`

### Files

- `encode.js` — generates the binary test file
- `parse.js` — validates and parses the binary file
- `records.bin` — generated binary data

---

## Assignment 2 — path: Recursive File Organizer

Implemented a recursive file organizer using Node.js `path` and filesystem operations.

### Requirements covered

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

### Bonus

- Added support for moving files with the `--move` flag

### File

- `organize.js`

---

## Assignment 3 — fs: Safe Config Merger

Implemented a safe JSON configuration merger using `fs/promises`.

### Requirements covered

- Loaded the required base configuration
- Loaded environment-specific override files
- Handled missing override files with a warning
- Implemented recursive deep merging
- Nested objects are merged key-by-key
- Arrays and primitive values from overrides replace the base values
- Handled invalid JSON with clear error messages
- Used an atomic write strategy
- Wrote to a temporary file before renaming it to `config.final.json`

### Bonus

- Supports multiple override files in a chain

### File

- `merge.js`

---

## Assignment 4 — Streams: Constant-Memory Log Analyzer

Implemented a streaming log analyzer for large log files.

### Requirements covered

- Used `fs.createReadStream()`
- Processed the file chunk-by-chunk
- Reconstructed complete lines across chunk boundaries
- Used a `leftover` buffer for incomplete lines
- Counted `ERROR`, `WARN`, and `INFO` entries
- Tracked the timestamp of the previous `ERROR`
- Calculated the longest gap between consecutive errors
- Processed the remaining data when the stream ended
- Avoided loading the entire log file into memory

### Files

- `generate.js` — generates a large sample log
- `analyze.js` — analyzes the log using streams
- `server.log` — sample generated log

---

## Assignment 5 — EventEmitter: Limited-Concurrency Task Queue

Implemented a task queue using a custom `EventEmitter` class.

### Requirements covered

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

### Files

- `task-queue.js` — TaskQueue implementation
- `demo.js` — demonstrates the queue with multiple jobs

### Example events

```text
start A
start B
done B -> result-B
start C
done A -> result-A
start D
failed C: boom
done D -> result-D
all jobs finished


# Capstone — Chunked File Upload Processor

An advanced Node.js project that combines **Buffer, Streams, path, fs/promises, and EventEmitter** into one complete file-processing workflow.

## Objective

Build a simulated file upload processor that receives a large file in chunks, validates the incoming data, reconstructs the original file, safely writes it to disk, and reports progress through custom events.

The main goal is to combine the concepts from the previous assignments into one project while keeping memory usage efficient and handling errors safely.

---

## Concepts Used

- **Buffer** — parse binary headers and work with raw bytes
- **Streams** — process incoming data chunk-by-chunk
- **path** — safely construct and manage file paths
- **fs/promises** — read, write, rename, and manage files asynchronously
- **EventEmitter** — report progress and processing stages

---

## Requirements Covered

- Simulated a large file upload using multiple chunks
- Processed incoming chunks using a `Readable` stream
- Parsed binary data using `Buffer`
- Handled cases where a record/header is split across multiple chunks
- Validated the uploaded data before writing the final file
- Reassembled the original file from the received chunks
- Used `path` to construct safe destination paths
- Used `fs/promises` for asynchronous filesystem operations
- Safely wrote the reconstructed file
- Reported processing stages through custom `EventEmitter` events
- Tracked upload progress
- Handled invalid data and filesystem errors without crashing unexpectedly

---

## Main Processing Flow

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


# Node.js Practice Session — Buffer, path, fs, Streams & EventEmitter

Five coding tasks completed as part of the Node.js practice session.

## Round 1 — Buffer: Caesar Cipher on Raw Bytes

Implemented a Caesar cipher that shifts letters directly using raw `Buffer` byte values.

### Requirements covered

- Used `Buffer` to read and modify raw bytes
- Shifted uppercase and lowercase letters independently
- Supported positive and negative shift values
- Implemented alphabet wrapping
- Kept spaces, punctuation, numbers, and other bytes unchanged

---

## Round 2 — path: Filename Sanitizer

Implemented a filename sanitizer that cleans messy filenames and copies them into an output folder.

### Requirements covered

- Used `path.parse()` to separate the filename and extension
- Converted filenames to lowercase
- Collapsed spaces and punctuation into single dashes
- Removed leading and trailing dashes
- Preserved file extensions and converted them to lowercase
- Handled files without extensions
- Processed files in a flat, one-level directory

---

## Round 3 — fs: Log Rotation Simulator

Implemented a log rotation utility using `fs/promises` and `async/await`.

### Requirements covered

- Checked file size using `fs.stat()`
- Used `async/await`
- Checked `error.code === 'ENOENT'`
- Renamed oversized logs with a timestamp
- Created a fresh empty log after rotation
- Handled missing log files without crashing

---

## Round 4 — Streams: Streaming Word Counter

Implemented a streaming word counter that processes a text file chunk by chunk.

### Requirements covered

- Used `fs.createReadStream()`
- Processed the file without loading the whole file into memory
- Counted words separated by whitespace
- Handled words split across different stream chunks
- Used a `leftover` variable to preserve incomplete words
- Kept only a running word count
- Tracked the number of processed bytes

---

## Round 5 — EventEmitter: Live Progress Bar

Implemented a simulated downloader using `EventEmitter` and a live terminal progress bar.

### Requirements covered

- Created a `Downloader` class extending `EventEmitter`
- Used `setInterval()` to simulate download progress
- Emitted a `progress` event for each step
- Emitted a `done` event when the download reached 100%
- Used event listeners to handle download events
- Built a 20-character progress bar
- Used `process.stdout.write()` to update the progress bar in place
- Used `\r` to return to the beginning of the current terminal line

---

## Topics Practiced

- Buffer
- Raw byte manipulation
- `path.parse()`
- `fs/promises`
- `async/await`
- `fs.stat()`
- `fs.rename()`
- `fs.createReadStream()`
- Streams and chunks
- EventEmitter
- Custom events
- `setInterval()`
- `process.stdout.write()`
- Error handling
- File system operations