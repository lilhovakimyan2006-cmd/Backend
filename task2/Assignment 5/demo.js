const TaskQueue = require('./task-queue');

const queue = new TaskQueue(2);

queue.on("job:start", ({ id }) => {
    console.log(`Start ${id}`);
});

queue.on("job:complete", ({ id, result }) => {
    console.log(`Complete ${id}: -> ${result}`);
});

queue.on("job:error", ({ id, error }) => {
    console.log(`Failed ${id}: -> ${error.message}`);
});

queue.on("queue:empty", () => {
    console.log("All jobs finished");
});

const delay = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};

queue.add("A", async () => {
    await delay(300);
    return "result-A";
});

queue.add("B", async () => {
    await delay(100);
    return "result-B";
});

queue.add("C", async () => {
    await delay(200);
    throw new Error("boom");
});

queue.add("D", async () => {
    await delay(50);
    return "result-D";
});

queue.add("E", async () => {
    await delay(150);
    return "result-E";
});