import del from 'del';

module.exports = (options) => {

    return () => {
        return del(options.src);
    };
}

