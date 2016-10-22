import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
const $ = loadPlugins();


export default (options) => {
    return () => {

        return gulp.src(options.src)
            .pipe($.sftp({
                host: 'website.com',
                user: 'johndoe',
                pass: '1234',
                // port: '',
                // remotePath: ''
            }));
    };
};
