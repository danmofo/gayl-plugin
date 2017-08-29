var config = require('./config');

var CauseService = require('./services/cause');
var MerchantService = require('./services/merchant');
var CauseMerchantService = require('./services/causeMerchant');

var Query = require('./query');
var Suggestion = require('./suggestion');
var log = require('./log');

var API_TYPES = config.API_TYPES;
var DATA_TYPES = config.DATA_TYPES;

/**
 *  This event handler fires each time the omnibox input changes (after the command has been entered).
 */
chrome.omnibox.onInputChanged.addListener(onOmniboxInputChanged);

/**
 * This event handler fires when you press ENTER on a suggestion.
 */
chrome.omnibox.onInputEntered.addListener(onOmniboxInputSelected);

function onOmniboxInputChanged(text, addSuggestions) {
    // Don't do anything if there isn't a query
    if(!text) {
      log('No query entered, not doing anything.');
      return;
    }

    var q = Query.parse(text);

    log('The query: ', q);

    if(q.value === '') {
      log('No query value, not doing anything.');
      return;
    }

    // Call different APIs based on the user input
    switch(q.apiType) {
      case API_TYPES.MERCHANT:
        MerchantService.get(q.value).then(function(response) {

          chrome.omnibox.setDefaultSuggestion(Suggestion.create('Merchant API: ' + response.numFound + ' result(s) for ' + q.value));
          log(response.numFound + ' results found for ' + q.value);

          var suggestions = Suggestion.buildSuggestions({
            merchant: response.docs[0]
          }, q);

          addSuggestions(suggestions);
        });
        break;

      case API_TYPES.CAUSE:
        CauseService.get(q.value).then(function(response) {
          chrome.omnibox.setDefaultSuggestion(Suggestion.create('Cause API: ' + response.numFound + ' result(s) for ' + q.value));
          log(response.numFound + ' results found for ' + q.value);

          var suggestions = Suggestion.buildSuggestions({
            cause: response.docs[0]
          }, q);

          addSuggestions(suggestions);
        });
        break;

      case API_TYPES.UNIVERSAL:
        CauseMerchantService.get(q.value).then(function(response) {
          chrome.omnibox.setDefaultSuggestion(Suggestion.create('Cause / Merchant API.'));

          var suggestions = Suggestion.buildSuggestions({
            cause: response.cause.docs[0],
            merchant: response.merchant.docs[0],
          }, q);

          addSuggestions(suggestions);
        });
        break;

      default:
        break;
    }
}

function onOmniboxInputSelected(text) {
  // If it's 'link-like' open it in a new tab!
  if(text.indexOf('http') > -1) {
    chrome.tabs.create({
      url: text
    });
  }
}
