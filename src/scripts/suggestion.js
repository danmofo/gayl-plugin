var Suggestion = {
  create: function(content, description) {
    var suggestion = {};
    if(arguments.length === 1) {
      suggestion.description = content;
    } else {
      suggestion.content = content;
      suggestion.description = description;
    }

    return suggestion;
  },
  // Build a list of Suggestion objects from the specified model + query
  // 
  buildSuggestions: function(model, queryObject) {
    var suggestions = [];

    templates = {
      merchant: [queryObject.dataType === 'number' ? TEMPLATES.merchantName : TEMPLATES.merchantId, TEMPLATES.merchantStoreUrl, TEMPLATES.merchantImage],
      cause: [queryObject.dataType === 'number' ? TEMPLATES.causeName : TEMPLATES.causeId, TEMPLATES.causeJoinUrl, TEMPLATES.causeWebsiteUrl],
      universal: [TEMPLATES.causeName]
    }[queryObject.type];

    console.log('Building suggestions for..', templates, 'using..', model);

    // Loop around each template and fill in the required information
    templates.forEach(function(template) {
      var filledTemplate = createTemplate(template.template, model);
      var suggestion = Suggestion.create(template.content, filledTemplate);

      suggestions.push(suggestion);
    });

    return suggestions;
  }
};

module.exports = Suggestion;