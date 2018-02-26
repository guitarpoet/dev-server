/**
 * This is the webpack plugin that will generate the routing for the front end project
 *
 * @author Jack <jack@thinkingcloud.info>
 * @version 0.0.1
 * @date Thu Feb 22 15:05:44 2018
 */

const { getOptions } = require("loader-utils");
const { log, template } = require("hot-pepper-jelly");
const { config } = require("@guitarpoet/configurator");
const { isFunction } = require("lodash");

let _config = null;

const getConfig = (option = {}) => {
	return new Promise((resolve, reject) => {
		if(!_config) {
			let { routerAccessor } = option;

			if(routerAccessor && isFunction(routerAccessor)) {
				return routerAccessor().then(c => {
					_config = c;
				//	console.info(c.elements["dashboard-ui"].$ui().$elements);
					resolve(c);
				});
			} else {
				reject("No configuration found for loader Routing");
				return;
			}
		}
		// We already have the config now
		resolve(_config);
	});
}

const AUTO_REPLACE_REGEX = /^\/\/AUTO_ROUTING ([a-zA-Z\-_]+)$/;

const loader = function(content, map) {
	let option = getOptions(this);
	let callback = this.async();
	getConfig(option).then((config) => {
		let m = content.match(AUTO_REPLACE_REGEX);
		// We only auto generate the ROUTING that needs to be auto
		if(m) {
			// Let's get the element first
			let element = m[1];
			if(config.elements && config.elements[element]
				&& config.elements[element].$ui) {
				let elements = config.elements[element].$routes();
				if(elements) {
					let imports = [];
					let routes = [];
					// Let's get the import header first
					for(let p in elements) {
						let i = elements[p].$toImport();
						if(imports.indexOf(i) === -1) {
							imports.push(i);
						}

						routes.push(elements[p].$toElement());
					}

					// We do have the elements
					content = content.replace(AUTO_REPLACE_REGEX, template("Routing", {elements, imports, routes}));
				}
			}
		}

		callback(null, content, map)
	}).catch(callback);
}

module.exports = loader;
