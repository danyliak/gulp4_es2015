'use strict';

import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
const $ = loadPlugins();

export default (options) => {
    return () => {

        let buildVendorScripts = () => {
            return gulp.src('./bower.json')
                .pipe(($.mainBowerFiles()))
                .pipe(gulp.dest(options.dest + '/vendor'))
        }

        let appSources = gulp.src(['./dist/app/*.js', './dist/js/**/*.js', './dist/css/**/*.css'], {read: false});

        return gulp.src(options.src)
            .pipe($.inject(buildVendorScripts().pipe($.order(
                ['**/jquery.min.js',
                 '**/angular.min.js',
                 '**/bootstrap.min.js']
            )), {ignorePath: 'dist/', addRootSlash: false, name: 'bower'}))
            .pipe($.inject(appSources, {ignorePath: 'dist/', addRootSlash: false}))
            .pipe($.angularHtmlify({ customPrefixes: ['ui-'] }))
            .pipe($.if(options.isProd, $.htmlmin({collapseWhitespace: true})))
            .pipe(gulp.dest(options.dest));
    };
};


