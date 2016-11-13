'use strict';

const through = require('through2');
const Pusher = require('aemsync').Pusher;

function gulpAemSync(options) {
    options = options || {};

    let pusher;

    if (!pusher) {
        let targets = options.targets || 'http://admin:admin@localhost:4502';
        let pushInterval = 300;
        let exclude = '';

        pusher = new Pusher(targets.split(','), pushInterval, exclude);
    }

    function addFile(file, encoding, callback) {
        console.log(`gulp-aemsync pushing: ${file.path}`);
        pusher.enqueue(file.path);
        callback(null, file);
    }

    function sendPackage(callback) {
        pusher.processQueue();
        callback();
    }

    return through.obj(addFile, sendPackage);
}

module.exports = gulpAemSync;