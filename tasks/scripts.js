import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
const $ = loadPlugins();


export default (options) => {
    return () => {
        return gulp.src(options.src, {since: gulp.lastRun('build:appScripts')})
            .pipe($.remember('appScripts'))
            .pipe($.jshint())
            .pipe($.jshint.reporter('jshint-summary'))
            .pipe($.notify( (file) => {
                if (file.jshint.success) return false
                return "jshint: " + file.jshint.results.length + " errors in src/" + file.relative;
            }))
            .pipe($.concat('app.js'))
            .pipe($.if(options.isProd, $.rename({suffix: '.min'})))
            .pipe($.if(options.isProd, $.uglify()))
            .pipe(gulp.dest(options.dest));
    };
};