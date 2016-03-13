/**
 *  A simple service for making API requests to the cause API (defined in config.js/ENDPOINTS/cause).
 *
 *  Prefer to use `get` over `getByName` or `getById` as `get` will determine which method to use
 *  based on the query and has some default error handling.
 *
 *  Example:
 *
 *  // Uses getById
 *  get(1517).then(function(results) {
 *    console.log('Results: ', results);
 *  });
 *
 *  // Uses getByName
 *  get('cancer research uk');
 *
 * 	@author danielmoffat
 */

module.exports = {
	getById: getById,
	getByName: getByName,
	get: get,
	getFirst: getFirst
};

var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));
var querystring = require('querystring');
var merge = require('merge');
var isNumber = require('is-number');
var CAUSE_ENDPOINT = require('../config').ENDPOINTS.cause;

// Default parameters used in queries
var defaults = {
	start: 0,
	rows: 5
};

function getThenLog(query) {
	return get(query).then(function(result) {
		console.log(query, result);
	});
}

/**
 * Helper function that ties all the other parts together.
 *
 * @param  {String} query The search query.
 * @return {Object}       The cause object(s) if found or null.
 */
function get(query) {
	// Get the query function to use
	var fn = getQueryFunction(query);

	return fn(query).catch(defaultErrorHandler);
}

// Helper function that calls get and plucks the first result from it.
function getFirst(query) {
	return get(query).then(function(resp) {
		return {
			numFound: 1,
      docs: [resp.docs.length ? resp.docs[0] : resp.docs]
		};
	});
}

/**
 * Default error handler used for all api requests.
 * @param  {Object} error The thrown error.
 * @return {void}
 */
function defaultErrorHandler(error) {
	console.log('Something just went wrong.');
	console.log(err);
}

/**
 * Parses the response into a suitable object format. Allowing us to normalise return values
 * between different APIs.
 *
 * @param  {Object} response The API response.
 * @return {Object}          The transformed API response.
 */
function transform(response) {

	// Replace oldKeys with newKeys (to match the other API response)
	var oldKeys = ['@numfound', '@count', '@start'];
	var newKeys = ['numFound', 'count', 'start'];

	oldKeys.forEach(function(key, i) {
		response[newKeys[i]] = parseInt(response[key], 10);
		delete response[key];
	});

	// For some reason in the response if there is only one result
	// an object is returned (instead of 1 item in an array), if there are no
	// results the doc field is not even present.
	//
	// By sorting it out here we avoid having to do so in the code that uses this service.
	if(response.numFound === 0) {
		response.docs = [];
	} else if(response.numFound === 1) {
		response.docs = [response.doc];
	} else {
		response.docs = response.doc;
	}

    // Remove the old doc
	delete response.doc;

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

	return makeApiRequest(query);
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

	return makeApiRequest(query);
}

/**
 * Helper method for making API requests with a default response handler. In this
 * case we just JSON.parse the body and manipulate the keys.
 * @param  {String} query The full API query, e.g. https://the/api.com/v2/users/select?foo=bar
 * @return {Promise}      The response.
 */
function makeApiRequest(query) {
	return request.getAsync({
		method: 'GET',
		url: query
	}).then(function(resp) {
		return transform(JSON.parse(resp.body));
	});
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
	return CAUSE_ENDPOINT + '?' + querystring.encode(merge(queryParams, defaults));
}
