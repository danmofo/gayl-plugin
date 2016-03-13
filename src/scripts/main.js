var config = require('./config');

var CauseService = require('./services/cause');
var MerchantService = require('./services/merchant');
var CauseMerchantService = require('./services/causeMerchant');

var Query = require('./query');
var Suggestion = require('./suggestion');

var API_TYPES = config.API_TYPES;
var DATA_TYPES = config.DATA_TYPES;

/**
 * This event handler fires each time the omnibox input changes (after the command has been entered).
 */
chrome.omnibox.onInputChanged.addListener(
  function(text, addSuggestions) {
    if(!text) {
      return;
    }

    // Parse the user input into something useful
    var q = Query.parse(text);

    console.log('Query: ' + q);

    // Call different APIs based on the user input
    switch(q.apiType) {
      case API_TYPES.MERCHANT:
        MerchantService.get(q.value).then(function(response) {
          chrome.omnibox.setDefaultSuggestion(Suggestion.create('Merchant API, ' + response.numFound + ' result(s).'));
          addSuggestions(Suggestion.buildSuggestions({
            merchant: response.docs[0]
          }, q));
        });
        break;

      case API_TYPES.CAUSE:

        CauseService.get(q.value).then(function(response) {
          chrome.omnibox.setDefaultSuggestion(Suggestion.create('Cause API, ' + response.numFound + ' result(s).'));
          addSuggestions(Suggestion.buildSuggestions({
            cause: response.docs[0]
          }, q));
        });
        break;

      case API_TYPES.UNIVERSAL:
        CauseMerchantService.get(q.value).then(function(response) {
          chrome.omnibox.setDefaultSuggestion(Suggestion.create('Cause / Merchant API.'));
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

/**
 * This event handler fires when you press ENTER on a suggestion
 */
chrome.omnibox.onInputEntered.addListener(function(text) {

  // If it's 'link-like' open it in a new tab!
  if(text.indexOf('http') > -1) {
    chrome.tabs.create({
      url: text
    });
  }
});
