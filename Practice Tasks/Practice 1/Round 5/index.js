const Downloader = require('./downloader');

const downloader = new Downloader();

downloader.on('progress', (percentage) => {    
    let filled = percentage / 5;

    let string = "#".repeat(filled);
    string += "-".repeat(20 - filled);

    process.stdout.write('\r' + '[' + string + ']' + ' ' + percentage + '%');
});

downloader.on('done', () => {
    console.log('\nDownload complete');
});

downloader.download();