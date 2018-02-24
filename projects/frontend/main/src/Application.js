/**
 * This is the application abstraction for the front end project
 *
 * @author Jack <jack@thinkingcloud.info>
 * @version 0.0.1
 * @date Thu Feb 22 15:21:14 2018
 */

import React, { Component, PropTypes } from "react";

class Application extends Component {
	render() {
		return (
			<div id="application" className="application wrapper">
				{this.props.children}
			</div>
		);
	}
}

Application.propTypes = {
}

export default Application;
