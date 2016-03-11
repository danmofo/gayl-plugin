module.exports = CauseService;

function CauseService() {

}

CauseService.getCauses = function getCauses(queryObject) {
  queryObject.type = API_TYPES.CAUSE;
  return get(query(queryObject)).then(function(response) {
    return new CauseApiResponseTransformer(response).transform();
  });
};