module.exports = {
	getById: getById,
	getByName: getByName,
	get: get
};

var request = require('request');
var querystring = require('querystring');
var merge = require('merge');
var isNumber = require('is-number');
var CAUSE_ENDPOINT = require('../config').ENDPOINTS.cause;

// Default parameters used in queries
var defaults = {
	start: 0,
	rows: 5
};

// Example queries
get('Starlight');
get(2000);
get(1517);
get('Donkey Sanctuary');

/**
 * Helper function that ties all the other parts together.
 * 
 * @param  {String} query The search query.
 * @return {Object}       The cause object(s) if found or null.
 */
function get(query) {
	// Get the query function
	var fn = getQueryFunction(query);

	// Get the results and transform them
	return transform(fn(query));
}

/**
 * Parses the response into a suitable object format. Allowing us to normalise return values
 * between different APIs.
 *
 * @param  {Object} response The API response.
 * @return {Object}          The transformed API response.
 */
function transform(response) {
	return response;
}

/**
 * Get a cause by its ID. Since the query uses id (which is unique), it will only return 1 result.
 * @param  {Number} id The cause ID, e.g. 1517
 * @return {Object}    The cause object if found, or null.
 */
function getById(id) {
	if(!id) return;

	var query = buildQuery({
		q: 'id:' + id
	});

	console.log(query);
}

/**
 * Get causes by name. This may return multiple results on shorter queries.
 * @param  {String} name The cause name, e.g. Starlight
 * @return {Object}      The cause object(s) or null.
 */
function getByName(name) {
	if(!name) return;

	var query = buildQuery({
		q: name
	});

	console.log(query);
}

/**
 * Get the query function to use. 
 * @param  {String} query The search query to analyse.
 * @return {Function} The query function.
 */
function getQueryFunction(query) {
	if(isNumber(query)) {
		return getById;
	}

	return getByName;
}

/**
 * Builds an API url from the cause endpoint and any query parameters (some defaults are added automatically).
 * @param  {Object} queryParams A map of parameter names and values.
 * @return {String}             The API url.
 */
function buildQuery(queryParams) {
	return queryParams ? CAUSE_ENDPOINT + '?' + querystring.encode(merge(queryParams, defaults)) : endpoint;
}
