'use strict';

const through2 = require('through2');
const Pusher = require('aemsync').Pusher;

function gulpAemSync(options) {
    options = options || {};

    let pusher;

    if (!pusher) {
        const targets = options.targets || ['http://admin:admin@localhost:4502'];
        const interval = options.interval || 300;
        const exclude = options.exclude || '';

        pusher = new Pusher(targets, interval, exclude);
    }

    return through2.obj(addFileToPackage, uploadPackageToCRX);

    function uploadPackageToCRX(callback) {
        pusher.processQueue();
        callback();
    }

    function addFileToPackage(file, encoding, callback) {
        pusher.enqueue(file.path);
        callback(null, file);
    }
}

module.exports = gulpAemSync;