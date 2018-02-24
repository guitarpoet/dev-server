/**
 * This provides the initialize functions for the dev server.
 *
 * @author Jack <jack@thinkingcloud.info>
 * @version 0.0.1
 * @date Tue Feb  6 16:21:50 2018
 */

const { global_registry, log, debug, watch_and_reload } = require("hot-pepper-jelly");
const { isArray, get } = require("lodash");
const path = require("path");
const FILTER_PATTERN = /^([bef]+)(\{([^\{\}]+)\})?$/;
const express = require("express");
const webpack = require("webpack");

const init_express = (config) => {
    // Add the configuration into the global registry
    global_registry("app_config", config);

    // Construct the express now
    let app = express();

    // Setup the configuration to the express
    app.$config = config;

    // Add the app into the global registry
    global_registry("app", app);

    // Now return it
    return app;
}

const filterMatch = (filter) => (
    (project) => {
        let m = filter.match(FILTER_PATTERN);
        if(m) {
            // Yes, we have the filter now
            let type = m[1];

            if(type == project.$type) {
                // Yes, the type matches, let's check the patterns now
                let pattern = m[3];
                if(!pattern) {
                    // We don't have pattern, it is matched
                    return true;
                }
                // Let's check the name now
                let pc = project.$packageConfig();
                let reg = new RegExp(pattern);
                return pc.name.match(reg);
            }


        }
        return false;
    }
)
const nodepath = () => {
    let nodePath = process.env.NODE_PATH;
    if(!nodePath) {
        nodePath = [];
    } else {
        nodePath = nodePath.split(path.delimiter);
    }

    // Add current running path into the node path
    nodePath.push(process.cwd());

    // Add current node_modules path to the node path
    let base = path.resolve(__dirname);
    nodePath.push(`${base}${path.sep}node_modules`);
    console.info(nodePath.join(path.delimiter));
};

const bootstrap = (app) => {
    return app;
}

function arrayMerge() {
    let ret = [];
    Array.from(arguments).map(a => {
        if(isArray(a)) {
            for(let i of a) {
                ret.push(i);
            }
        } else {
            ret.push(a);
        }
    });
    return ret;
}

const start_app = (watchFolders = []) => ((app) => {
    let port = get(app.$config, "server.port", 8080);

    return new Promise((resolve, reject) => {
        // Let's watch all file change in current folder, and reload them into NodeJS
        watch_and_reload(watchFolders);

        debug("Listening to port {{port}}", {port});
        app.listen(port, () => {
            resolve(app);
        });
    });
})

const init_webpack = (config) => {
    // Add the resolve loaders
    config.webpack.resolveLoader = {
        modules: process.env.NODE_PATH.split(":"),
        extensions: [".js"]
    };

    // Let's add the global node_modules into it
    let n = path.resolve(path.join(__dirname, "node_modules"));
    config.webpack.resolve.modules.push(n);

    return webpack(config.webpack);
}

module.exports = {
    bootstrap,
    nodepath,
    filterMatch,
    arrayMerge,
    init_express,
    start_app,
    init_webpack
}
