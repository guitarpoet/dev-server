/**
 * This is the overall reducer for the front end project
 *
 * @author Jack <jack@thinkingcloud.info>
 * @version 0.0.1
 * @date Sat Feb 24 15:18:04 2018
 */

import { routerReducer } from "react-router-redux"
import { combineReducers } from "redux"

// Let's add the router reducer of the react-router-redux into the reducers
export default combineReducers({
	routing: routerReducer
})
