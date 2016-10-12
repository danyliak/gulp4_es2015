'use strict';

import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
const $ = loadPlugins();

export default (options) => {
    return () => {

        if (options.isProd) {
            console.log('prod');
            let filterJS = $.filter('**/*.js', { restore: true });
            let filterCSS = $.filter('**/*.css', { restore: true });
            let filterFonts = $.filter('**/*.{eot,svg,ttf,woff,woff2}', { restore: true });

            gulp.src('./bower.json')
                .pipe($.mainBowerFiles())
                .pipe(filterCSS)
                .pipe($.concat('vendor.min.css'))
                .pipe($.cleanCss())
                .pipe(gulp.dest(options.dest + '/vendor'));

            gulp.src('./bower.json')
                .pipe($.mainBowerFiles())
                .pipe(filterJS)
                .pipe($.order(
                    ['jquery.js', 'bootstrap.js']
                ))
                .pipe($.concat('vendor.min.js'))
                .pipe($.uglify())
                .pipe(gulp.dest(options.dest + '/vendor'));

            return gulp.src('./bower.json')
                .pipe($.mainBowerFiles(), {base: './'} )
                .pipe(filterFonts)
                .pipe(gulp.dest(options.dest + '/vendor'));

            //vendor img

        } else {
            console.log('dev');
            let buildVendorScripts = () => {
                return gulp.src('./bower.json')
                    .pipe($.mainBowerFiles())
                    .pipe(gulp.dest(options.dest + '/vendor'))
            }

            let appSources = gulp.src(['./dist/js/**/*.js', './dist/css/**/*.css'], {read: false});

            return gulp.src(options.src)
                .pipe($.inject(buildVendorScripts().pipe($.order(
                    ['jquery.js', 'bootstrap.js']
                        )), {relative: true, name: 'bower'}))
                //.pipe($.if(options.isProd, $.concat('vendor.min.js')))
                .pipe($.inject(appSources, {relative: true}))
                .pipe(gulp.dest(options.dest));

        }

    };
};

