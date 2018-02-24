/**
 * This is the route for elements
 *
 * @author Jack <jack@thinkingcloud.info>
 * @version 0.0.1
 * @date Fri Feb 23 15:47:17 2018
 */

const Route = require("./Route");

class ElementRoute extends Route {
	/**
	 * Get the UI element for this route
	 */
	$element() {
		if(this.$ui) {
			return this.$ui.element;
		}
	}

    run(req, res) {
		return res.render("element.ejs", {element: this.$element()});
    }
}

module.exports = ElementRoute;
