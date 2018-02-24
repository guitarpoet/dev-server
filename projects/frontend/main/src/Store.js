/**
 * This is the library which will provide the redux store for the application
 *
 * @author Jack <jack@thinkingcloud.info>
 * @version 0.0.1
 * @date Sat Feb 24 15:26:25 2018
 */
import { createStore } from "redux"
import reducers from "./reducers"

let store = null;

export const getStore = () => {
	if(!store) {
		store = createStore(
			reducers,
			window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
		);
	}
	return store;
}
