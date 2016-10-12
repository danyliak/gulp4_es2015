'use strict';

import gulp from 'gulp';

export default (options) => {
    return () => {
        return gulp.src(options.src, {since: gulp.lastRun('build:images')})
            .pipe(gulp.dest(options.dest));
    };
};

