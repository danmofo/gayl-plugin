var config = require('./config');

var CauseService = require('./services/cause');
var MerchantService = require('./services/merchant');
var CauseMerchantService = require('./services/causeMerchant');

var Query = require('./query');
var Suggestion = require('./suggestion');

var API_TYPES = config.API_TYPES;
var DATA_TYPES = config.DATA_TYPES;

chrome.omnibox.onInputChanged.addListener(
  function(text, addSuggestions) {
    if(!text) {
      return;
    }

    // Parse the user input into something useful
    var q = Query.parse(text);

    console.log(q);

    // Call different APIs based on the user input
    switch(q.apiType) {
      case API_TYPES.MERCHANT:

       MerchantService.getFirst(q.value).then(function(response) {
          addSuggestions(Suggestion.buildSuggestions({
            merchant: response.docs[0]
          }, q));
       });

        break;
      case API_TYPES.CAUSE:
        CauseService.getFirst(q.value).then(function(response) {
          addSuggestions(Suggestion.buildSuggestions({
            cause: response.docs[0]
          }, q));
        });

        break;
      case API_TYPES.UNIVERSAL:
        CauseMerchantService.get(q.value).then(function(response) {
          addSuggestions(Suggestion.buildSuggestions({
            cause: response.cause.docs[0],
            merchant: response.merchant.docs[0],
          }, q));
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
