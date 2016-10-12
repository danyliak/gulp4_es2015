'use strict';

import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
const $ = loadPlugins();

export default (options) => {
    return () => {
        return gulp.src(options.src, {since: gulp.lastRun('build:appScripts')})
            .pipe($.concat('app.js'))
            .pipe($.if(options.isProd, $.rename({suffix: '.min'})))
            .pipe($.if(options.isProd, $.uglify()))
            .pipe(gulp.dest(options.dest));
    };
};