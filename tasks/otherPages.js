'use strict';

import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
const $ = loadPlugins();

export default (options) => {
    return () => {
        return gulp.src(options.src, {since: gulp.lastRun('build:otherPages')})
            .pipe($.angularHtmlify({ customPrefixes: ['ui-'] }))
            .pipe($.if(options.isProd, $.htmlmin({collapseWhitespace: true})))
            .pipe(gulp.dest(options.dest));
    };
};

