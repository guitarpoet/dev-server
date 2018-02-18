/**
 * This is the file for all models
 *
 * @author Jack <jack@thinkingcloud.info>
 * @version 0.0.1
 * @date Wed Feb  7 17:37:05 2018
 */

const { ConfigObjectBase } = require("@guitarpoet/configurator");
const { Router } = require("express");
const { resolve } = require("url");
const { isFunction } = require("lodash");
const { debug, log } = require("hot-pepper-jelly");

class Routes extends ConfigObjectBase {
    _init() {
        if(this.root) {
            this.path(this.root);
        }
    }

    each(func) {
        let routes = this.routes || {};

        for(let path in routes) {
            func(path, routes[path]);
        }
    }

    path(path) {
        this.$path = path;
        this.each((path, route) => {
            for(let e of [route, route.$ui]) {
                if(e && e.path && isFunction(e.path)) {
                    // It is a routes settings
                    e.path(resolve(this.$path, path));
                }
            }
        });
    }

    setup(app) {
        // Let's setup the router now
        let router = this.$router || {};

        // Setup the router
        router = new Router(router);

        // Then, let's setup the routes for the router
        this.each((path, route) => {
            // Get the method for router
            let method = route.method || "get";
            method = router[method] || router.get;

            let chain = route.filters || [];

            // Let's setup the routes
            if(route.setup && isFunction(route.setup)) {
                // Let's setup the routes into app
                route.setup(app);
                debug("Setting path {{path}} using routes directly", {path});
            } else if(route.func && isFunction(route.func)) {
                debug("Setting up path {{path}} using route", {path});
                // Add the route into the chain
                chain.push(route.func());
                chain.unshift(path);
                method.apply(router, chain);
            } else if(isFunction(route)) {
                debug("Setting up path {{path}} using simple", {path: resolve(this.$path, path)});
                // Add the route to the router
                chain.push(route);
                chain.unshift(path);
                method.apply(router, chain);
            }
        });

        // Then, let's add the handlers for this routes
        let handlers = this.handlers || {};

        let notFoundHandler = handlers[404];
        let serverErrorHandler = handlers[500];

        if(serverErrorHandler) {
            // Add the error handler
            router.use(serverErrorHandler);
        }

        if(notFoundHandler) {
            // Add the not found handler to the last
            router.all("*", notFoundHandler);
        }

        debug("Setting up path {{path}}", {path: this.$path});
        // Let's setup the router into express
        app.use(this.$path, router);
    }
}

class Route extends ConfigObjectBase {
}

class ReactRoute extends Route {
    path(path = null) {
        if(path) {
            this.$path = path;
            if(this.element && this.element.$addRoute) {
                // Add this to the element's route
                this.element.$addRoute(path, this);
            }
        }
        return this.$path;
    }
}

class ReactUI extends Route {
    $addRoute(path, route) {
		if(!ReactUI.$elements) {
			ReactUI.$elements = {};
		}

        if(!ReactUI.$elements[this.entry]) {
            ReactUI.$elements[this.entry] = {};
        }

        ReactUI.$elements[this.entry][path] = route;
    }

    $routes() {
        return ReactUI.$elements[this.entry];
    }

	$ui() {
		return ReactUI;
	}
}

class RedirectRoute extends Route {
    func() {
        return (req, res) => (res.redirect(this.to));
    }
}

const notFound = (req, res) => {
    res.status(404).send("Page Not Found!");
}

const serverError = (err, req, res, next) => {
    res.status(500).send("Internal server error!");
}

const dashboard = (req, res) => {
    res.send("Dashboard Test");
}

const dashboardDemo = (req, res) => {
    res.send("Dashboard Demo");
}

const test = (req, res) => {
    res.send("Test Again");
}

const logRequest = (req, res, next) => {
    log(req.url);
    next();
}

module.exports = {
    Route,
    RedirectRoute,
    Routes,
    ReactUI,
    ReactRoute,
    dashboard,
    dashboardDemo,
    notFound,
    serverError,
    test,
    logRequest
}
