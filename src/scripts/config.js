module.exports = {
  // Log what its doing?
  logging: true,
	API_TYPES: {
	  MERCHANT: 'merchant',
	  CAUSE: 'cause',
	  UNIVERSAL: 'universal'
	},
  DATA_TYPES: {
    NUMBER: 'number',
    STRING: 'string'
  },
	// A self-hosted proxy that fetches the API response (since CORS is not enabled on any endpoint)
	ENDPOINTS: {
	  merchant: 'https://moff.rocks/external/gayl-merchant',
	  cause: 'https://moff.rocks/external/gayl-cause',
	},
  // Templates for each omnibox item, I really dislike the embedded logic in here...
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
        'causeRegno',
        'causeGaylPage'
      ],
      causeStringTemplates: [
        'causeId',
        'causeRegno',
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
      template: '<match>Merchant API</match> <dim>(rates)</dim>: <% if(merchant && merchant.commissions) { merchant.commissions.forEach(function(c) {if(c["@category"]) { %><%= c["@category"] %> - <%= c["@value"] %> |<% }})} %>',
      content: '<% if(merchant && merchant.commissions) { %><%= merchant.name %><% } %>'
    },
	  'merchantName': {
	    template: '<match>Merchant API</match> <dim>(name)</dim>: <% if(merchant && merchant.name) { %><%= merchant.name %><% } else { %>None found!<% } %>',
	    content: '<% if(merchant && merchant.name) { %><%= merchant.name %><% } else { %>None found! merchantName<% } %>'
	  },
	  'merchantId': {
	    template: '<match>Merchant API</match> <dim>(id)</dim>: <% if(merchant && merchant.id) { %><%= merchant.id %><% } else { %>None found!<% } %>',
	    content: '<% if(merchant && merchant.id) { %><%= merchant.id %><% } else { %>None found! merchantName<% } %>'
	  },
	  'merchantImage': {
	    template: '<match>Merchant API</match> <dim>(logo)</dim>: https://www.giveasyoulive.com<% if(merchant && merchant.logo) { %><%=merchant.logo %><% } else { %>None found!<% } %>',
	    content: 'https://www.giveasyoulive.com<% if(merchant && merchant.logo) { %><%=merchant.logo %><% } %>'
	  },
	  'merchantStoreUrl': {
	    template: '<match>Merchant API </match><dim>(url)</dim>: https://www.giveasyoulive.com/stores/<% if(merchant && merchant.uri) { %><%=merchant.uri %><% } else { %>None found!<% } %>',
	    content: 'https://www.giveasyoulive.com/stores/<% if(merchant && merchant.uri) { %><%=merchant.uri %><% } %>',
	  },
	  'causeName': {
	    template: '<match>Cause API</match> <dim>(name)</dim>: <% if(cause && cause.name) { %><%= cause.name %><% } else { %>None found!<% } %>',
	    content: '<% if(cause && cause.name) { %><%= cause.name %><% } else { %>None found! causeName<% } %>'
	  },
    'causeRegno': {
      template: '<match>Cause API</match> <dim>(regno)</dim>: <% if(cause && cause.name) { %><%= cause.regno %><% } else { %>None found!<% } %>',
      content: '<% if(cause && cause.regno) { %><%= cause.regno %><% } else { %>None found! causeName<% } %>'
    },
	  'causeId': {
	    template: '<match>Cause API</match> <dim>(id)</dim>: <% if(cause && cause.id) { %><%= cause.id %><% } else { %>None found!<% } %>',
	    content: '<% if(cause && cause.id) { %><%= cause.id %><% } else { %>None found! causeId<% } %>'
	  },
	  'causeImage': {
	    template: '<match>Cause API</match> <dim>(image)</dim>: <% if(cause && cause.image) { %><%= cause.image %><% } else { %>None found!<% } %>',
	    content: '<% if(cause && cause.image) { %><%= cause.image %><% } %>'
	  },
	  'causeJoinUrl': {
	    template: '<match>Cause API</match> <dim>(url)</dim>: <% if(cause && cause.url) { %><%= cause.url %><% } else { %>None found!<% } %>',
	    content: '<% if(cause && cause.url) { %><%= cause.url %><% } else { %>None found!<% } %>'
	  },
	  'causeWebsiteUrl': {
	    template: '<match>Cause API</match> <dim>(seo)</dim>: <% if(cause && cause.seo) { %><%= cause.seo %><% } else { %>None found!<% } %>',
	    content: '<% if(cause && cause.seo) { %><%= cause.seo %><% } %>'
	  },
    'causeGaylPage': {
      template: '<match>Cause API</match> <dim>(GAYL join page)</dim>: <% if(cause && cause.id) { %>https://www.giveasyoulive.com/emails/<%= cause.id %><% } else { %>None found!<% } %>',
      content: '<% if(cause && cause.id) { %>https://www.giveasyoulive.com/emails/<%= cause.id %><% } %>'
    }
	}
};
