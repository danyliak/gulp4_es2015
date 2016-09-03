'use strict';

import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
const $ = loadPlugins();

export default (options) => {
    return () => {
        return gulp.src(options.src)
            .pipe($.sourcemaps.init())
            .pipe($.sass().on('error', $.sass.logError))
            .pipe($.sourcemaps.write())
            .pipe($.autoprefixer({browsers: ['last 30 versions'], cascade: false}))
            .pipe($.if(options.isProd, $.rename({suffix: '.min', prefix : ''})))
            .pipe($.if(options.isProd, $.cleanCss()))
            .pipe(gulp.dest(options.dest));
    };
};