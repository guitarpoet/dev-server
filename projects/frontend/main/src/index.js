/**
 * This is the main entry for the demo front end application
 *
 * @author Jack <jack@thinkingcloud.info>
 * @version 0.0.1
 * @date Thu Feb 22 15:19:08 2018
 */

import React from "react";
import ReactDOM from "react-dom";
import Application from "./Application";

// Let's render the DOM now
ReactDOM.render(
	(<Application>
		<h1>Hello world</h1>
	</Application>),
	document.getElementById("root")
);
