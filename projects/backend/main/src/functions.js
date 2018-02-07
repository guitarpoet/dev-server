const { debug, log, global_registry, watch_and_reload } = require("hot-pepper-jelly");

const init_app = (app) => {
    // Let's add the app into the global registry
    global_registry("app", app);
    return app;
}

const start_app = (app) => {
    return new Promise((resolve, reject) => {
        // Let's watch all file change in current folder, and reload them into NodeJS
        watch_and_reload([__dirname]);

        app.listen(8080, () => {
            resolve(app);
        });
    });
}

module.exports = {
    init_app,
    start_app
}
