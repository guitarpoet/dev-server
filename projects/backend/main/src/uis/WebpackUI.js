/**
 * This is the UI element used for webpack, this will generate the UI using the
 * webpack entries
 *
 * @author Jack <jack@thinkingcloud.info>
 * @version 0.0.1
 * @date Sat Feb 24 13:48:32 2018
 */

const { ConfigObjectBase } = require("@guitarpoet/configurator");
const Route = require("../routes/Route");

class WebpackUI extends Route {
	$js() {
		let js = this.js || [];
		return js.concat([this.entry]);
	}

	$css() {
		return this.css || [];
	}

    $addRoute(path, route) {
		if(!WebpackUI.$elements) {
			WebpackUI.$elements = {};
		}

        if(!WebpackUI.$elements[this.entry]) {
            WebpackUI.$elements[this.entry] = {};
        }

        WebpackUI.$elements[this.entry][path] = route;
    }

    $routes() {
        return WebpackUI.$elements[this.entry];
    }

	$ui() {
		return WebpackUI;
	}
}

module.exports = WebpackUI;
