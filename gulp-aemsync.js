'use strict';

const through2 = require('through2');
const Pusher = require('aemsync').Pusher;

function gulpAemSync(options) {
    options = options || {};

    let pusher;

    if (!pusher) {
        const targets = options.targets || ['http://admin:admin@localhost:4502'];

        pusher = new Pusher(targets);
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