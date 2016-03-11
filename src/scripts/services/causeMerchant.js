module.exports = CauseMerchantService;

function CauseMerchantService() {

}

CauseMerchantService.getAll = function getAll(queryObject) {
  var merchantQueryObject = {
    type: API_TYPES.MERCHANT,
    value: queryObject.value
  };
  var causeQueryObject = {
    type: API_TYPES.CAUSE,
    value: queryObject.value
  };

  return get(query(merchantQueryObject)).then(function(response) {
    return new MerchantApiResponseTransformer(response).transform();
  });
};