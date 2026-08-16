const EventEmitter = require('events');

class Downloader extends EventEmitter {
    #counter;

    constructor() {
        super();

        this.#counter = 0;
    }

    download() {
        const interval = setInterval(() => {
            ++this.#counter;

            this.emit('progress', this.#counter * 10);

            if (this.#counter === 10) {
                clearInterval(interval);

                this.emit('done');
            }
        }, 1000);
    }
}

module.exports = Downloader;