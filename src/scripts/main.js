var $ = require('jquery');

// Extension configuration
var config = {
  minLength: 3
};

var API_TYPES = {
  MERCHANT: 'merchant',
  CAUSE: 'cause',
  UNIVERSAL: 'all'
};

var ENDPOINTS = {
  merchant: 'https://www.giveasyoulive.com/merchants/select?q={$query$}&wt=everyclick&fq=subscriber:1&facet=true&facet.mincount=1&facet.field=category&rows=5&start=0',
  cause: 'https://workwithus.giveasyoulive.com/charity/select?q={$query$}&rows=5&start=0',
  'asdf': ''
};


function Query(value, type) {
  this.type = type || API_TYPES.UNIVERSAL;
  this.value = value;
  this.dataType = this.determineDataType();
}

// Determine the data type of the query,
// this is useful when you need to differentiate between ids and strings (e.g. 111 vs "Starlight")
Query.prototype.determineDataType = function() {
  var types = {
    NUMBER: 'number',
    STRING: 'string'
  };

  return isNaN(parseInt(this.value, 10)) ? types.STRING : types.NUMBER;
};


// Static method for creating Query objects from an omnibox query
Query.parse = function parse(query) {
  if(!query || query === '') return;

  var bits = query.split(' ');
  var type = API_TYPES.UNIVERSAL;

  // Determine what 'type' of query this is
  if(bits.length > 1) {
    switch(bits[0]) {
      case 'm':
        type = API_TYPES.MERCHANT;
        break;
      case 'c':
        type = API_TYPES.CAUSE;
        break;
      default:
        type = API_TYPES.UNIVERSAL;
    }
  }

  // Return the new query object, todo: remove api type from the query...
  var q = new Query(query.split('m ').join('').split('c ').join(''), type);
  console.log(q);

  return q;
};

var TEMPLATES = {
  'merchantName': {
    template: '<match>Merchant API</match> (name): {name}',
    content: 'This is the content! 2',
  },
  'merchantId': {
    template: '<match>Merchant API</match> (id): {id}',
    content: 'This is the content! 3',
  },
  'merchantImage': {
    template: '<match>Merchant API</match> (logo): https://www.giveasyoulive.com/{logo}',
    content: 'This is the content! 4',
  },
  'merchantStoreUrl': {
    template: '<match>Merchant API </match><dim>(url)</dim>: https://www.giveasyoulive.com/store/{uri}',
    content: 'This is the content! 5',
  },
  'causeName': {
    template: '<match>Cause API</match> <dim>(name)</dim>: {name}',
    content: 'This is the content! 6',
  },
  'causeId': {
    template: '<match>Cause API</match> <dim>(id)</dim>: {id}',
    content: 'This is the content! 7',
  },
  'causeImage': {
    template: '<match>Cause API</match>: {image}',
    content: 'This is the content! 8',
  },
  'causeJoinUrl': {
    template: '<match>Cause API</match> (url): {url}',
    content: 'This is the content! 9',
  },
  'causeWebsiteUrl': {
    template: '<match>Cause API</match> (seo): {seo}',
    content: 'This is the content! 10',
  }
};

var TEMPLATE_START_TAG  = '{';
var TEMPLATE_END_TAG    = '}';

function getTemplate(key) {
  return TEMPLATES[key];
}

// todo: use an actual templating engine
function createTemplate(template, model) {
  for(var key in model) {
    template = template.split(TEMPLATE_START_TAG + key + TEMPLATE_END_TAG).join(model[key]);
  }

  return template;
}

// Object for creating suggestions
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
  buildSuggestions: function(model, queryObject, templates) {
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

function getCauses(queryObject) {
  queryObject.type = API_TYPES.CAUSE;
  return get(query(queryObject)).then(function(response) {
    return new CauseApiResponseTransformer(response).transform();
  });
}

function getMerchants(queryObject) {
  queryObject.type = API_TYPES.MERCHANT;
  return get(query(queryObject)).then(function(response) {
    return new MerchantApiResponseTransformer(response).transform();
  });
}

function getAll(queryObject) {
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
}


chrome.omnibox.onInputChanged.addListener(
  function(text, addSuggestions) {

    // Parse the user input into something useful
    var q = Query.parse(text);

    // Call different APIs based on the user input
    switch(q.type) {
      case API_TYPES.MERCHANT:
        getMerchants(q).then(function(response) {
          addSuggestions(Suggestion.buildSuggestions(response[0], q));
        });

        break;
      case API_TYPES.CAUSE:
        getCauses(q).then(function(response) {
          addSuggestions(Suggestion.buildSuggestions(response[0], q));
        });

        break;
      case API_TYPES.UNIVERSAL:
        getAll(q).then(function(response) {
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

function determineQueryType(query) {
  var types = {
    NUMBER: 'number',
    STRING: 'string'
  };

  return isNaN(parseInt(query, 10)) ? types.STRING : types.NUMBER;
}

function query(queryObject) {
  var type = queryObject.type;
  var searchQuery = queryObject.value;

  if(queryObject.dataType === 'number') {
    searchQuery = 'id:' + searchQuery;
  }

  return ENDPOINTS[type].split('{$query$}').join(searchQuery);
}

function get(url) {
  return $.ajax({
    method: 'GET',
    url: url
  });
}


function getTransformerFor(name) {
  var transformers = {
    merchant: MerchantApiResponseTransformer,
    cause: CauseApiResponseTransformer
  };

  return transformers[name];
}

function MerchantApiResponseTransformer(response) {
  this.response = response.result;
}

MerchantApiResponseTransformer.prototype.transform = function() {
  return this.response.doc && this.response.doc.length ? this.response.doc : [this.response.doc];
};

function CauseApiResponseTransformer(response) {
  this.response = response;
}

CauseApiResponseTransformer.prototype.transform = function() {
  if(this.response.doc) {
    return this.response.doc.length ? this.response.doc : [this.response.doc];   
  }
};