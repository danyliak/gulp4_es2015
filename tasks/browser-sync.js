import browserSync from 'browser-sync';
let bs = browserSync.create();

module.exports = (options) => {
    return () => {
        bs.init({
            port: 8000,
            server: {
                baseDir: options.baseDir
            }
        });

        bs.watch(options.baseDir).on("change", bs.reload);
    };
 };
