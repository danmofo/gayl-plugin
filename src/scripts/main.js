var $ = require('jquery');
var config = require('./config');
var querystring = require('querystring');
var Query = require('./query');
var utils = require('./utils');
var CauseService = require('./services/cause');
var MerchantService = require('./services/merchant');
var CauseMerchantService = require('./services/causeMerchant');
var Suggestion = require('./suggestion');

var API_TYPES = config.API_TYPES;
var ENDPOINTS = config.ENDPOINTS;
var query = utils.query;
var get = utils.get;
var MerchantApiResponseTransformer = utils.transformers.merchant;
var CauseApiResponseTransformer = utils.transformers.cause;
var determineQueryType = utils.determineQueryType;
var TEMPLATES = config.TEMPLATES;
var TEMPLATE_START_TAG = config.TEMPLATE_START_TAG;
var TEMPLATE_END_TAG = config.TEMPLATE_END_TAG;
var getTemplate = utils.getTemplate;
var createTemplate = utils.createTemplate;




chrome.omnibox.onInputChanged.addListener(
  function(text, addSuggestions) {

    // Parse the user input into something useful
    var q = Query.parse(text);

    // Call different APIs based on the user input
    switch(q.type) {
      case API_TYPES.MERCHANT:
       MerchantService.get(q).then(function(response) {
          addSuggestions(Suggestion.buildSuggestions(response[0], q));
        });

        break;
      case API_TYPES.CAUSE:
        CauseService.get(q).then(function(response) {
          addSuggestions(Suggestion.buildSuggestions(response[0], q));
        });

        break;
      case API_TYPES.UNIVERSAL:
        CauseMerchantService.get(q).then(function(response) {
          addSuggestions(Suggestion.buildSuggestions(response[0], q));
        });     
        break;
      default:
        break;
    }
});

chrome.omnibox.onInputEntered.addListener(function(text) {
  if(text.indexOf('http') > -1) {
    chrome.tabs.create({
      url: text
    });
  }

  console.log(text);
});
