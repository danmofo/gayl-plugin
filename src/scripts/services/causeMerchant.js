/**
 *  A simple service for making API requests to the cause/merchant API, which is just a service
 *  that ties the cause and merchant services together.
 *
 *  @author danielmoffat
 */
module.exports = {
  get: get
};

var Promise = require('bluebird');
var CauseService = require('./cause');
var MerchantService = require('./merchant');

function get(query) {
  return Promise.all([
    MerchantService.getFirst(query),
    CauseService.getFirst(query)
  ]);
}
