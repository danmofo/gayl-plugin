module.exports = Query;

function Query(value, type) {
  this.type = type || API_TYPES.UNIVERSAL;
  this.value = value;
  this.dataType = this.determineDataType();
}

// Determine the data type of the query,
// this is useful when you need to differentiate between ids and strings (e.g. 111 vs "Starlight")
Query.prototype.determineDataType = function() {
  var types = {
    NUMBER: 'number',
    STRING: 'string'
  };

  return isNaN(parseInt(this.value, 10)) ? types.STRING : types.NUMBER;
};


// Static method for creating Query objects from an omnibox query
Query.parse = function parse(query) {
  if(!query || query === '') return;

  var bits = query.split(' ');
  var type = API_TYPES.UNIVERSAL;

  // Determine what 'type' of query this is
  if(bits.length > 1) {
    switch(bits[0]) {
      case 'm':
        type = API_TYPES.MERCHANT;
        break;
      case 'c':
        type = API_TYPES.CAUSE;
        break;
      default:
        type = API_TYPES.UNIVERSAL;
    }
  }

  // Return the new query object, todo: remove api type from the query...
  var q = new Query(query.split('m ').join('').split('c ').join(''), type);
  console.log(q);

  return q;
};