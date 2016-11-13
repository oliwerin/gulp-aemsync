'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const AemSync = require('../index.js');

let aemSync = new AemSync();

gulp.task('sass', function () {
    return gulp.src('./scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'))
        .pipe(aemSync.push());
});

gulp.task('sass:watch', function () {
    gulp.watch('./scss/*.scss', ['sass']);
});

gulp.task('default', ['sass']);