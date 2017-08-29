/**
 *  This class is responsible for parsing the user input.
 *
 *  Examples:
 *
 *  Query.parse('m 2000');
 *  => Query { apiType: 'merchant', value: '2000', dataType: 'number' }
 *
 *  Query.parse('c 1517');
 *  => Query { apiType: 'cause', value: '1517', dataType: 'number' }
 *
 *  Query.parse('Amazon');
 *  => Query { apiType: 'all', value: 'Amazon', dataType: 'string' }
 *
 *  @author danielmoffat
 */

module.exports = Query;

var config = require('./config');
var isNumber = require('./utils').isNumeric;

var DATA_TYPES = config.DATA_TYPES;
var API_TYPES = config.API_TYPES;

window.Query = Query;

/**
 * Representation of an omnibox query entered by the user.
 * @param {String} value   The text entered.
 * @param {String} apiType The API type this query belongs to.
 */
function Query(value, apiType) {
  this.apiType = apiType || API_TYPES.UNIVERSAL;
  this.value = value || '';
  this.dataType = this.determineDataType();
}

/**
 * Helper for determining the data type of the query.
 * @return {String} The data type.
 */
Query.prototype.determineDataType = function() {
  return isNumber(this.value) ? DATA_TYPES.NUMBER : DATA_TYPES.STRING;
};

/**
 * Static method for creating Query objects from an omnibox query.
 * @param  {String} query The query, e.g. "2000", "m starlight", "c 1517"
 * @return {Query}        A query object.
 */
Query.parse = function parse(query) {
  if(!query || query === '') return;

  // Split the query up to find out if a command was used, it looks something
  // like this for the query "gl m The White Company": ['m', 'The', 'White', 'Company']
  var bits = query.split(' ');
  var apiType = API_TYPES.UNIVERSAL;

  // Determine the API request from the query
  if(bits.length > 1) {
    switch(bits[0]) {
      case 'm':
        apiType = API_TYPES.MERCHANT;
        break;
      case 'c':
        apiType = API_TYPES.CAUSE;
        break;
      default:
        apiType = API_TYPES.UNIVERSAL;
    }
  }

  return new Query(bits.splice(1).join(' '), apiType);
};

Query.prototype.toString = function toString() {
  var out = '[Query ';
  out += 'value="' + this.value + '", ';
  out += 'apiType="' + this.apiType + '", ';
  out += 'dataType="' + this.dataType;
  out += '"]';
  return out;
};
