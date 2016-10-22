import browserSync from 'browser-sync';
let bs = browserSync.create();

export default (options) => {
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
