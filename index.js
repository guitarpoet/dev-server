/**
 * The main server for the dev server, this is the bootstrap file
 *
 * @author Jack <jack@thinkingcloud.info>
 * @version 0.0.1
 * @date Mon Feb  5 16:53:49 2018
 *
 */

"use strict";

const { normal_start, handle_app_error, config } = require("@guitarpoet/configurator");
const { pipe, log, proxy_patterns, debug, global_registry, enable_features } = require("hot-pepper-jelly");
const { bootstrap, nodepath, filterMatch, init_express, init_webpack, start_app } = require("./functions");
const path = require("path");
const webpackDevMiddleware = require("webpack-dev-middleware"); // The webpack dev middleware
const webpackReloadMiddleware = require("./webpack/reload");

// Let's exclude all node modules files
proxy_patterns([/.*models.js/, /.*[a-z]Route.js/]);

// Let's ensure our presence at the very begining
global_registry("DEV_SERVER", true);

// Let's do the initialize first
normal_start(require, {

    /**
     * This will output the node path to run node commands
     */
    nodepath,

    projects(filter = null) {
        let projects = this.config("projects").all() || [];

        filter = filter || this.args.filter;

        if(filter) {
            projects = projects.filter(filterMatch(filter));
        }
        return projects;
    },

    server() {
        debug("Starting the DEV server...");
        let projects = this.projects();
        if(projects.length) {
            if(projects.length > 1) {
                log("We only support one be project now...");
                return;
            }

            let p = projects[0];

            debug("Configuring the project [{{base}}]", p);


            // The backend setting up
            let backend_config_file = p.$configFile();
            let config_backend = p.$config();
            let init_backend = p.$initializer();
            let watch_folders = p.$watchFolders();

            let filters = [
                config_backend,
                init_express
            ];

            // The frontend setting up
            p = this.projects("fe"); // Let's get the frontend projects

            if(p && p.length) {
                p = p[0];
                // We do have front end project, let's configure it
                // TODO: For now, we only support one front end project, we need a much complex way to handle multiple front end projects
                let init_frontend = (app) => {
                    // Now, let's init the front end's webpack
                    return config(require)(p.$webpackConfig()).then((config) => {
                        return new Promise((resolve, reject) => {
                            let compiler = init_webpack(config);
                            app.$compiler = compiler;

                            // Let's initialize the hot reload
                            app.use(webpackReloadMiddleware(app, compiler));

                            app.use(webpackDevMiddleware(compiler, {
                                noInfo: true,
                                log: debug,
                                hot: true,
                                stats: { colors: true }
                            }));
                            resolve(app);
                        });
                    });
                }

                filters.push(init_frontend);
                filters.push(init_backend);
            }
            pipe(backend_config_file)(filters).then(start_app(watch_folders)).catch(console.error);
        } else {
            log("No project found!");
        }
    },

    pack() {
        log("Packing....");
        let projects = this.projects();
        if(projects.length) {
            let p = projects[0];
            pipe(p.$webpackConfig())([config(require), init_webpack]).then(compiler => {
                compiler.run((err, stats) => {
                    log("[webpack:build] Done\n {{stats}}", {
                        stats: stats.toString({
                            assets: true,
                            chunks: true,
                            chunkModules: false,
                            colors: true,
                            hash: false,
                            timings: false,
                            version: false,
                        })
                    });
                });
            }).catch(console.error);
        }
    },

    /**
     * This will list all project entries
     */
    entries() {
        console.info(this.projects().map(p => p.$entry()).join(" "));
    },

    test() {
        console.info(this.config("file"));
    }

}, "./config.yaml", [ bootstrap ])
