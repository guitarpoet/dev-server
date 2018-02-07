/**
 * The main server for the dev server, this is the bootstrap file
 *
 * @author Jack <jack@thinkingcloud.info>
 * @version 0.0.1
 * @date Mon Feb  5 16:53:49 2018
 *
 */

"use strict";

const { normal_start, handle_app_error } = require("@guitarpoet/configurator");
const { log, debug, global_registry, enable_features } = require("hot-pepper-jelly");
const { bootstrap, nodepath, filterMatch } = require("./functions");
const path = require("path");

// Let's ensure our presence at the very begining
process.env.DEV_SERVER = true;
global_registry("DEV_SERVER", true);
enable_features({dev_server: true});

// Let's do the initialize first
normal_start(require, {

    /**
     * This will output the node path to run node commands
     */
    nodepath,

    /**
     * This will list all project entries
     */
    entries() {
        let projects = this.config("projects").all();

        let { filter } = this.args;

        if(filter) {
            projects = projects.filter(filterMatch(filter));
        }
        console.info(projects.map(p => p.$entry()).join(" "));
    },

    test() {
        log("Hello");
    }

}, "./config.yaml", [ bootstrap ])
