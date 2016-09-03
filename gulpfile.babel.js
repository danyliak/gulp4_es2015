'use strict';

import gulp from 'gulp';

let isProd = (process.argv.indexOf("--production") > -1) ? true : false;

let lazyRequireTask = (taskName, path, options) => {
    options = options || {};
    gulp.task(taskName, () => {
        let task = require(path).default.call(this, options);
        return task();
    })
};
// app main paths
const paths = {
    scripts: 'app/**/*.js',
    styles: ['app/sass/**/*.scss', 'app/sass/**/*.sass'],
    images: 'app/img/**/*',
    fonts: 'app/fonts/**/*',
    index: 'app/index.html',
    otherPages: ['app/**/*.html', '!app/index.html'],
    baseDir: 'dist',
};

// init tasks
lazyRequireTask('browser-sync', './tasks/browser-sync', {
    baseDir: paths.baseDir
});

lazyRequireTask('sass', './tasks/styles', {
    src: paths.styles,
    dest: paths.baseDir + '/css',
    isProd: isProd
});

lazyRequireTask('clean', './tasks/clean', {
    src: paths.baseDir,
});




gulp.task('build', gulp.series('clean', 'sass'));


// watch

// img sprites

// create github release from gulp