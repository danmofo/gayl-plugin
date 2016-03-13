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

var isNumber = require('is-number');
var config = require('./config');

var DATA_TYPES = config.DATA_TYPES;
var API_TYPES = config.API_TYPES;

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

  // Split the query up to find out if a command was used
  var bits = query.split(' ');
  var apiType = API_TYPES.UNIVERSAL;

  // Determine the API from the query
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

  Query.prototype.toString = function toString() {
    var out = '[Query ';
    out += 'value=' + this.value + ',';
    out += 'apiType=' + this.apiType + ',';
    out += 'dataType=' + this.dataType;
    out += ']';
    return out;
  };

  // The bits array always contains the query as the last value (and the command as the first, if its there)
  return new Query(bits.pop(), apiType);
};
