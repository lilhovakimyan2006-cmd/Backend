const EventEmitter = require("events");

class TaskQueue extends EventEmitter {
    #queue;
    #running;
    #concurrency;
    #cycleActive;

    constructor(concurrency) {
        super();

        if (!Number.isInteger(concurrency) || concurrency < 1) {
            throw new Error("Concurrency must be a positive integer");
        }
        
        this.#concurrency = concurrency;
        this.#queue = [];
        this.#running = 0;
        this.#cycleActive = false;
    }

    add(id, jobFn) {
        this.#queue.push({ id, jobFn });
        
        this.#cycleActive = true;

        this.#runNext();
    }

    #runNext() {
        while (
            this.#queue.length > 0 &&
            this.#running < this.#concurrency
        ) {
            const job = this.#queue.shift();
    
            ++this.#running;
    
            this.emit("job:start", {
                id: job.id
            });
    
            job.jobFn()
                .then((result) => {
                    this.emit("job:complete", {
                        id: job.id,
                        result
                    });
                })
                .catch((error) => {
                    this.emit("job:error", {
                        id: job.id,
                        error
                    });
                })
                .finally(() => {
                    --this.#running;
    
                    this.#runNext();
                });
        }

        if (this.#queue.length === 0 && this.#running === 0 && this.#cycleActive) {
            this.emit("queue:empty");
            
            this.#cycleActive = false;
        }
    }
}

module.exports = TaskQueue;