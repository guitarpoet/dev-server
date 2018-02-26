const { debug, log, global_registry, watch_and_reload, feature_enabled } = require("hot-pepper-jelly");
const express = require("express");
const { get, isFunction, keys } = require("lodash");
const { Routes } = require("./models");
const path = require("path");
const { config } = require("@guitarpoet/configurator");

/**
 * This will init the express using the config
 */
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

const start_app = (app) => {
    if(feature_enabled("mock")) {
        // This is only for testing
        return;
    }
    let port = get(app.$config, "server.port", 8080);

    return new Promise((resolve, reject) => {
        // Let's watch all file change in current folder, and reload them into NodeJS
        watch_and_reload([__dirname]);

        debug("Listening to port {{port}}", {port});
        app.listen(port, () => {
            resolve(app);
        });
    });
}
const get_routes = () => {
	return config(require)("./config.yaml");
}

const add_routes = (app) => {
    if(feature_enabled("mock")) {
        // This is only for testing
        return;
    }

    let { route_config, elements } = app.$config;

    app.set("view engine", "ejs");
	app.set("views", path.join(__dirname, "../views"));

    if(route_config.setup && isFunction(route_config.setup)) {
        route_config.setup(app);
    }
    return app;
}

const handle_error = (error) => {
    log("Error is {{error}}", {error}, "ERROR");
}

module.exports = {
    init_express,
    start_app,
    add_routes,
	get_routes,
    handle_error
}
