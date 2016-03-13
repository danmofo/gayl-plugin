module.exports = {
	API_TYPES: {
	  MERCHANT: 'merchant',
	  CAUSE: 'cause',
	  UNIVERSAL: 'universal'
	},
  DATA_TYPES: {
    NUMBER: 'number',
    STRING: 'string'
  },
	// These are the only two endpoints with CORS enabled
	ENDPOINTS: {
	  merchant: 'https://www.giveasyoulive.com/merchants/select',
	  cause: 'https://workwithus.giveasyoulive.com/charity/select',
	},
  // Templates for each omnibox item
	TEMPLATES:  {
    conf: {
      // A template list is a list of keys (referencing templates in config.js/TEMPLATES)
      //
      // Template list to use for each query and query type. We need this facility
      // because it's pretty silly to waste an omnibox slot showing the ID you already know!
      //
      // Examples:
      //
      // Input: 'm 2000'
      // Template list used: merchantNumberTemplates
      //
      // Input: 'c Starlight'
      // Template list used: causeStringTemplates
      //
      // Input: 'Amazon'
      // Template list used: universalStringTemplates
      merchantStringTemplates: [
        'merchantId',
        'merchantStoreUrl',
        'merchantImage',
        'merchantRates'
      ],
      merchantNumberTemplates: [
        'merchantName',
        'merchantStoreUrl',
        'merchantImage',
        'merchantRates'
      ],
      causeNumberTemplates: [
        'causeName',
        'causeJoinUrl',
        'causeWebsiteUrl',
        'causeGaylPage'
      ],
      causeStringTemplates: [
        'causeId',
        'causeJoinUrl',
        'causeWebsiteUrl',
        'causeGaylPage'
      ],
      universalStringTemplates: [
        'causeId',
        'merchantId'
      ],
      universalNumberTemplates: [
        'causeName',
        'merchantName'
      ]
    },

    'merchantRates': {
      template: '<match>Merchant API</match> <dim>(rates)</dim>: <% if(merchant.commissions) { merchant.commissions.forEach(function(c) {if(c["@category"]) { %><%= c["@category"] %> - <%= c["@value"] %> |<% }})} %>',
      content: '<% if(merchant.commissions) { %><%= merchant.name %><% } %>'
    },
	  'merchantName': {
	    template: '<match>Merchant API</match> <dim>(name)</dim>: <% if(merchant.name) { %><%= merchant.name %><% } %>',
	    content: '<% if(merchant.name) { %><%= merchant.name %><% } %>'
	  },
	  'merchantId': {
	    template: '<match>Merchant API</match> <dim>(id)</dim>: <% if(merchant.id) { %><%= merchant.id %><% } %>',
	    content: '<% if(merchant.id) { %><%= merchant.id %><% } %>'
	  },
	  'merchantImage': {
	    template: '<match>Merchant API</match> <dim>(logo)</dim>: https://www.giveasyoulive.com<% if(merchant.logo) { %><%=merchant.logo %><% } %>',
	    content: 'https://www.giveasyoulive.com<% if(merchant.logo) { %><%=merchant.logo %><% } %>'
	  },
	  'merchantStoreUrl': {
	    template: '<match>Merchant API </match><dim>(url)</dim>: https://www.giveasyoulive.com/stores/<% if(merchant.uri) { %><%=merchant.uri %><% } %>',
	    content: 'https://www.giveasyoulive.com/stores/<% if(merchant.uri) { %><%=merchant.uri %><% } %>',
	  },
	  'causeName': {
	    template: '<match>Cause API</match> <dim>(name)</dim>: <% if(cause.name) { %><%= cause.name %><% } %>',
	    content: '<% if(cause.name) { %><%= cause.name %><% } %>'
	  },
	  'causeId': {
	    template: '<match>Cause API</match> <dim>(id)</dim>: <% if(cause.id) { %><%= cause.id %><% } %>',
	    content: '<% if(cause.id) { %><%= cause.id %><% } %>'
	  },
	  'causeImage': {
	    template: '<match>Cause API</match> <dim>(image)</dim>: <% if(cause.image) { %><%= cause.image %><% } %>',
	    content: '<% if(cause.image) { %><%= cause.image %><% } %>'
	  },
	  'causeJoinUrl': {
	    template: '<match>Cause API</match> <dim>(url)</dim>: <% if(cause.url) { %><%= cause.url %><% } %>',
	    content: '<% if(cause.url) { %><%= cause.url %><% } %>'
	  },
	  'causeWebsiteUrl': {
	    template: '<match>Cause API</match> <dim>(seo)</dim>: <% if(cause.seo) { %><%= cause.seo %><% } %>',
	    content: '<% if(cause.seo) { %><%= cause.seo %><% } %>'
	  },
    'causeGaylPage': {
      template: '<match>Cause API</match> <dim>(GAYL join link)</dim>: <% if(cause.seo) { %>https://www.giveasyoulive.com/join/<%= cause.seo %><% } %>',
      content: '<% if(cause.seo) { %>https://www.giveasyoulive.com/join/<%= cause.seo %><% } %>'
    }
	}
};
