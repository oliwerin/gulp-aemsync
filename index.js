'use strict';

const through = require('through2');
const Pusher = require('aemsync').Pusher;

class gulpAemSync {
    constructor(options) {
        options = options || {};

        let targets = options.targets || 'http://admin:admin@localhost:4502';
        let pushInterval = 300;
        let exclude = '';

        this.pusher = new Pusher(targets.split(','), pushInterval, exclude);
    }

    push() {
        return through.obj((file, encoding, callback) => {
            console.log(`gulp-aemsync pushing: ${file.path}`);

            this.pusher.enqueue(file.path);
            this.pusher.processQueue();

            return callback(null, file);
        });
    }
}

module.exports = gulpAemSync;