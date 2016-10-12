'use strict';

import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
const $ = loadPlugins();

export default (options) => {
    return () => {
        return gulp.src(options.src)
            .pipe($.plumber({
                errorHandler: $.notify.onError( (err) => {
                    return {title: 'Sass error', message: err.message}
                })
            }))
            .pipe($.sourcemaps.init())
            .pipe($.sass().on('error', $.sass.logError))
            .pipe($.concat('app.css'))
            .pipe($.autoprefixer({browsers: ['last 30 versions'], cascade: false}))
            .pipe($.sourcemaps.write())
            .pipe($.if(options.isProd, $.rename({suffix: '.min'})))
            .pipe($.if(options.isProd, $.cleanCss()))
            .pipe(gulp.dest(options.dest));
    };
};