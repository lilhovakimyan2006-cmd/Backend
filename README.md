# Backend

This repository contains my backend development homework and practice tasks.

## Homework 1 — ESM and CJS

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