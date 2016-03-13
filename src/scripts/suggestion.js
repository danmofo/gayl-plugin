/**
 *    @author danielmoffat
 */

module.exports = {
  create: create,
  buildSuggestions: buildSuggestions
};

var config = require('./config');
var utils = require('./utils');
var log = require('./log');
var ejs = require('ejs');

var templateRender = ejs.render;
var API_TYPES = config.API_TYPES;
var DATA_TYPES = config.DATA_TYPES;

/**
 * Creates a suggestion for chrome's omnibox. https://developer.chrome.com/extensions/omnibox#type-SuggestResult
 * @param  {String} content     The content  that is put in the URL bar.
 * @param  {String} description The text that is displayed on the dropdown.
 * @return {Object}         The suggestion.
 */
function create(content, description) {
  var suggestion = {};

  if(!description) {
    suggestion.description = content;
  } else {
    suggestion.content = content;
    suggestion.description = description;
  }

  return suggestion;
}

function buildTemplate(model, templateKey) {
  var suggestion = {};
  ctemplateRender(config.TEMPLATES[templateKey], model);
}

/**
 * Build a list of suggestions for the omnibox.
 * @param  {Object} model       The model used for templates.
 * @param  {Query} queryObject  The query object.
 * @return {Array}              List of suggestions.
 */
function buildSuggestions(model, queryObject) {
  var suggestions = [];

  // THis really limits re-use, suggestions shouldn't be built if there isn't a suitable model
  if(queryObject.apiType !== API_TYPES.UNIVERSAL && !model[queryObject.apiType]) {
    log('The required model properties are missing, exiting..');
    return suggestions;
  }

  var templateKeys = utils.getTemplateListFromQueryObject(queryObject);

  log('Building suggestions using: ', model, queryObject, templateKeys);

  templateKeys.forEach(function(key) {
    var entry = config.TEMPLATES[key];
    var template = templateRender(entry.template, model);
    var content = templateRender(entry.content, model);
    suggestions.push(create(content, template));
  });

  log('Created suggestions: ', suggestions);

  return suggestions;
}
