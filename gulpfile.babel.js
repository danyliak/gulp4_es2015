import gulp from 'gulp';

let isProd = (process.argv.indexOf("-prod") > -1) ? true : false;


import loadPlugins from 'gulp-load-plugins';
const $ = loadPlugins();
import guppyFn from 'git-guppy';
const guppy = guppyFn(gulp);




let lazyRequireTask = (taskName, path, options) => {
    options = options || {};
    gulp.task(taskName, () => {
        let task = require(path).default.call(this, options);
        return task();
    })
};
// main paths
const paths = {
    scripts: ['src/app/**/*.js', '!**/tests/*.js'],
    styles: ['src/sass/**/*.scss', 'src/sass/**/*.sass'],
    images: ['src/img/**/*', '!src/img/sprites/**/*'],
    sprites: 'src/img/sprites/**/*',
    fonts: 'src/fonts/**/*',
    index: 'src/index.html',
    otherPages: ['src/**/*.html', '!src/index.html'],
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
    dest: paths.baseDir + '/app',
    isProd: isProd
});
lazyRequireTask('build:images', './tasks/images', {
    src: paths.images,
    dest: paths.baseDir + '/img',
    isProd: isProd
});
lazyRequireTask('build:sprite', './tasks/sprite', {
    src: paths.sprites,
    dest: paths.baseDir,
    isProd: isProd
});
lazyRequireTask('build:indexFile', './tasks/index-file', {
    src: paths.index,
    dest: paths.baseDir,
    isProd: isProd
});
lazyRequireTask('build:otherPages', './tasks/otherPages', {
    src: paths.otherPages,
    dest: paths.baseDir,
    isProd: isProd
});

//lazyRequireTask('pre-commit', './tasks/pre-commit', {});

gulp.task('pre-commit', function () {
    return gulp.src(guppy.src('pre-commit'))
        .pipe($.filter(['*.js']))
        .pipe($.debug())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-summary'))
        .pipe($.notify( (file) => {
            if (file.jshint.success) return false
            return "Before commit check js-errors: " + file.jshint.results.length + " errors in src/" + file.relative;
        }))
        .pipe($.jshint.reporter('fail'));
});

lazyRequireTask('clean', './tasks/clean', {
    src: paths.baseDir,
});
lazyRequireTask('watch', './tasks/watch', {
    paths: paths
});
gulp.task('build', gulp.series(
    'clean',
    gulp.parallel('build:sass', 'build:fonts', 'build:appScripts', 'build:images', 'build:sprite'),
    gulp.parallel('build:indexFile', 'build:otherPages'),
    gulp.parallel('watch', 'serve')
));


gulp.task('default', gulp.series('build'));


// create github release from gulp

// https://github.com/therealklanni/git-guppy

// gulp-sftp

