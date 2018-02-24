/**
 * This is the routing example for using the react router redux
 *
 * @author Jack <jack@thinkingcloud.info>
 * @version 0.0.1
 * @date Sat Feb 24 15:00:44 2018
 */

import { Route, IndexRoute } from "react-router"
import React from "react"

import Dashboard from "pages/Dashboard"
import DashboardDemo from "pages/DashboardDemo"

// Let's constuct the history with the store
const Routing = [
	<Route key="/" path="/">
		<Route path="dashboard">
			<IndexRoute component={Dashboard} />
			<Route path="demo" component={DashboardDemo}/>
		</Route>
	</Route>
]

export default Routing;
