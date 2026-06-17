// set a new query parameter in the URL
export function set_query_param(key, value) {
	const url = new URL(window.location.href);
	url.searchParams.set(key, value);
	window.history.replaceState({}, "", url);
}

// get an existing query parameter from the URL
export function get_query_param(key) {
	const url = new URL(window.location.href);
	return url.searchParams.get(key);
}

// delete an existing query parameter from the URL
export function delete_query_param(key) {
	const url = new URL(window.location.href);
	url.searchParams.delete(key);
}
