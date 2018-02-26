/**
 * This is the webpack plugin that will generate the routing for the front end project
 *
 * @author Jack <jack@thinkingcloud.info>
 * @version 0.0.1
 * @date Thu Feb 22 15:05:44 2018
 */
const loader = function(content, map) {
    let callback = this.async();
	callback(null, content, map)
}

module.exports = loader;
