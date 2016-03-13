/**
 *  Utilities.
 *
 *  @author danielmoffat
 */

module.exports = {
  capitalise: capitalise,
  // todo: parse queryObject and generate the templateList string dynamically
  getTemplateListFromQueryObject: getTemplateListFromQueryObject

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
 * Get the templates to use from the specified queryObject.
 * @param  {Object} queryObject The query object (obtained from Query.parse('My query'))
 * @return {String}             The template list key (which maps to a field in the config containing an array of templates)
 */
function getTemplateListFromQueryObject(queryObject) {
    var apiType = queryObject.apiType;
    var dataType = capitalise(queryObject.dataType);

    return config.TEMPLATES.conf[apiType + dataType + 'Templates'];
}
