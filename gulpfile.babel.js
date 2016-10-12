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
    scripts: 'app/js/**/*.js',
    styles: ['app/sass/**/*.scss', 'app/sass/**/*.sass'],
    images: 'app/img/**/*',
    fonts: 'app/fonts/**/*',
    index: 'app/index.html',
    otherPages: ['app/**/*.html', '!app/index.html'],
    baseDir: 'dist',
};

// init tasks
lazyRequireTask('serve', './tasks/browser-sync', {
    baseDir: paths.baseDir
});

lazyRequireTask('build:sass', './tasks/styles', {
    src: paths.styles,
    dest: paths.baseDir + '/css',
    isProd: isProd
});
lazyRequireTask('build:fonts', './tasks/fonts', {
    src: paths.fonts,
    dest: paths.baseDir + '/fonts'
});
lazyRequireTask('build:appScripts', './tasks/scripts', {
    src: paths.scripts,
    dest: paths.baseDir + '/js',
    isProd: isProd
});
lazyRequireTask('build:images', './tasks/images', {
    src: paths.images,
    dest: paths.baseDir + '/img',
    isProd: isProd
});
lazyRequireTask('build:index', './tasks/index', {
    src: paths.index,
    dest: paths.baseDir,
    isProd: isProd
});
lazyRequireTask('build:otherPages', './tasks/otherPages', {
    src: paths.otherPages,
    dest: paths.baseDir,
    isProd: isProd
});

lazyRequireTask('clean', './tasks/clean', {
    src: paths.baseDir,
});
lazyRequireTask('watch', './tasks/watch', {
    paths: paths
});
gulp.task('build', gulp.series(
    'clean',
    gulp.parallel('build:sass', 'build:fonts', 'build:appScripts', 'build:images'),
    gulp.parallel('build:index', 'build:otherPages'),
    gulp.parallel('watch', 'serve')
));


gulp.task('default', gulp.series('build'));


// img spritess

// create github release from gulp

// gulp.newer before image optimization

// gulp.remember before js / images / html

// minify vendorScripts in production

// gulp-sftp

// jslint
