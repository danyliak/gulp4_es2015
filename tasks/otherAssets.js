import gulp from 'gulp';

export default (options) => {
    return () => {

        return gulp.src(options.src)
            .pipe(gulp.dest(options.dest));
    };
};