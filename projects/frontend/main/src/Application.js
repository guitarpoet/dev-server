/**
 * This is the application abstraction for the front end project
 *
 * @author Jack <jack@thinkingcloud.info>
 * @version 0.0.1
 * @date Thu Feb 22 15:21:14 2018
 */

import React, { Component, PropTypes } from "react";
import { syncHistoryWithStore } from "react-router-redux"
import { getStore } from "./Store"
import { Provider } from "react-redux"
import { Router, browserHistory } from "react-router"
import Routing from "./Routing"

// The history of the application
const history = syncHistoryWithStore(browserHistory, getStore());

class Application extends Component {

	componentDidMount() {
		// Initial the history
		this.history = history;

		// Initial the state
		this.state = {};

		// Register it into global
		window.$app = this;
	}

	getState(prop) {
		return getStore().getState(prop);
	}

	render() {
		return (
			<Provider store={getStore()}>
				<Router history={history}>
					{Routing}
				</Router>
			</Provider>
		);
	}
}

Application.propTypes = {
}

export default Application;
