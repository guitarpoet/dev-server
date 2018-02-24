/**
 * The route that will redirect the request to the page
 *
 * @author Jack <jack@thinkingcloud.info>
 * @version 0.0.1
 * @date Fri Feb 23 16:10:35 2018
 */
const Route = require("./Route");

class RedirectRoute extends Route {
    run(req, res) {
		res.redirect(this.to);
    }
}

module.exports = RedirectRoute;
