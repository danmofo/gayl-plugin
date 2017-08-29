/**
 *  Utilities.
 *
 *  @author danielmoffat
 */

module.exports = {
  capitalise: capitalise,
  // todo: parse queryObject and generate the templateList string dynamically
  getTemplateListFromQueryObject: getTemplateListFromQueryObject,
  isNumeric: isNumeric
};

var config = require('./config');
var API_TYPES = config.API_TYPES;
var DATA_TYPES = config.DATA_TYPES;

/**
 * Capitalise a string
 * @param  {String} str The string to capitalise.
 * @return {String}     The string, capitalised.
 */
function capitalise(str) {
  return str.charAt(0).toUpperCase() + str.substring(1);
}

/**
 * @param  {[type]}  n The object to test
 * @return {Boolean}   Whether the object is numeric or not.
 *
 * Lifted directly from https://stackoverflow.com/questions/9716468/is-there-any-function-like-isnumeric-in-javascript-to-validate-numbers
 */
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * Get the templates to use from the specified queryObject.
 * @param  {Object} queryObject The query object (obtained from Query.parse('My query'))
 * @return {String}             The template list key (which maps to a field in the config containing an array of templates)
 */
function getTemplateListFromQueryObject(queryObject) {
    var apiType = queryObject.apiType;
    var dataType = capitalise(queryObject.dataType);

    return config.TEMPLATES.conf[apiType + dataType + 'Templates'];
}
