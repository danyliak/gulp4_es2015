"use strict";

import bs from 'browser-sync';

export default (options) => {
    return () => {
        bs({
            port: 8000,
            server: {
                baseDir: options.baseDir
            }
        });
    };
};
