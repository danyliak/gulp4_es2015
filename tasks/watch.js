'use strict';

import gulp from 'gulp';
import path from 'path';

import loadPlugins from 'gulp-load-plugins';
const $ = loadPlugins();

export default (options) => {
    return () => {
        gulp.watch(options.paths.styles, gulp.series('build:sass'));
        gulp.watch(options.paths.scripts, gulp.series('build:appScripts'));
        gulp.watch(options.paths.images, gulp.series('build:images'));
        gulp.watch(options.paths.fonts, gulp.series('build:fonts'));
        gulp.watch(options.paths.index, gulp.series('build:index'));
        gulp.watch(options.paths.otherPages, gulp.series('build:otherPages'));
        gulp.watch('./bower.json', gulp.series('build:index', 'build:otherPages'));
    };
};
