/**
 *  A simple service for making API requests to the cause/merchant API, which is just a service
 *  that ties the cause and merchant services together.
 *
 *  Response format:
 *
 *  {
 *    merchant: <Merchant response from MerchantService.get>
 *    cause: <Cause response from CauseService.get>
 *  }
 *
 *  @author danielmoffat
 */
module.exports = {
  get: get
};

var CauseService = require('./cause');
var MerchantService = require('./merchant');

function get(query) {
  return Promise.props({
    merchant: MerchantService.getFirst(query),
    cause: CauseService.getFirst(query)
  });
}
