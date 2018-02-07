/**
 * This provides the initialize functions for the dev server.
 *
 * @author Jack <jack@thinkingcloud.info>
 * @version 0.0.1
 * @date Tue Feb  6 16:21:50 2018
 */

const { enable_hotload, global_registry, log, debug } = require("hot-pepper-jelly");
const { isArray } = require("lodash");
const path = require("path");
const FILTER_PATTERN = /^([bef]+)(\{([^\{\}]+)\})?$/;

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
    // Enabled the hot reload first, since we are the dev server anyway
    enable_hotload();
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

module.exports = {
    bootstrap,
    nodepath,
    filterMatch,
    arrayMerge
}
