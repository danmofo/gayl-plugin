module.exports = MerchantService;

function MerchantService() {
	
}

MerchantService.getMerchants = function getMerchants(queryObject) {
  queryObject.type = API_TYPES.MERCHANT;
  return get(query(queryObject)).then(function(response) {
    return new MerchantApiResponseTransformer(response).transform();
  });
};