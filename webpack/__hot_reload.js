/**
 * This is the file that will hot reload the page
 */

window.onload = () => {
	let serverUrl = `ws://${window.location.hostname}:${window.location.port}/__hot_reload_message`;

	let connection = new WebSocket(serverUrl);

	connection.onopen = (evt) => {
		connection.onmessage = (evt) => {
			// Just refresh this page when there is any event
			window.location.href = window.location.href;
		}
	};
}
