module.exports = {

	getTemplate: function getTemplate(key) {
	  return TEMPLATES[key];
	},

	// todo: use an actual templating engine
	createTemplate: function createTemplate(template, model) {
	  for(var key in model) {
	    template = template.split(TEMPLATE_START_TAG + key + TEMPLATE_END_TAG).join(model[key]);
	  }

	  return template;
	},

	determineQueryType: function determineQueryType(query) {
	  var types = {
	    NUMBER: 'number',
	    STRING: 'string'
	  };

	  return isNaN(parseInt(query, 10)) ? types.STRING : types.NUMBER;
	},

	query: function query(queryObject) {
	  var type = queryObject.type;
	  var searchQuery = queryObject.value;

	  if(queryObject.dataType === 'number') {
	    searchQuery = 'id:' + searchQuery;
	  }

	  return ENDPOINTS[type].split('{$query$}').join(searchQuery);
	},

	get: function get(url) {
	  return $.ajax({
	    method: 'GET',
	    url: url
	  });
	},

	transformers: {
		merchant: (function() {

			function MerchantApiResponseTransformer(response) {
			  this.response = response.result;
			}

			MerchantApiResponseTransformer.prototype.transform = function() {
			  return this.response.doc && this.response.doc.length ? this.response.doc : [this.response.doc];
			};

			return MerchantApiResponseTransformer;

		})(),
		cause: (function () {
			function CauseApiResponseTransformer(response) {
			  this.response = response;
			}

			CauseApiResponseTransformer.prototype.transform = function() {
			  if(this.response.doc) {
			    return this.response.doc.length ? this.response.doc : [this.response.doc];   
			  }
			};

			return CauseApiResponseTransformer;
		})() 
	},


};