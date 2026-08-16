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