/**
 * This is the reload middleware used for webpack will using the websocket
 * function to provide the auto reload function
 *
 * @author Jack <jack@thinkingcloud.info>
 * @version 0.0.1
 * @date Sat Feb 24 17:31:12 2018
 */

const ExpressWs = require("express-ws");
const { debug } = require("hot-pepper-jelly");
const path = require("path");

let connections = [];

const webpackReloadMiddleware = (app, compiler) => {
	app.get("/__hot_reload.js", (req, res) => {
		// Return the auto hot reload js to the client
		res.sendFile(path.join(__dirname, "./__hot_reload.js"));
	});

	// Initialize the websocket on the app
	ExpressWs(app);

	app.ws("/__hot_reload_message", (ws, req) => {
		connections.push(ws);
	});

	compiler.plugin("done", () => {
		connections.map(c => c.send("Reload"));
		debug("Done");
	});

	return ((req, res, next) => {
		next()
	});
}

module.exports = webpackReloadMiddleware;
