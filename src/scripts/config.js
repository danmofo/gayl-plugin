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
      // Templates list to use for each query and query type. We need this facility
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
      // Inpit: 'Amazon'
      // Template list used: universalStringTemplates
      merchantStringTemplates: [
        'merchantId',
        'merchantStoreUrl',
        'merchantImage'
      ],
      merchantNumberTemplates: [
        'merchantName',
        'merchantStoreUrl',
        'merchantImage'
      ],
      causeNumberTemplates: [
        'causeName',
        'causeJoinUrl',
        'causeWebsiteUrl'
      ],
      causeStringTemplates: [
        'causeId',
        'causeJoinUrl',
        'causeWebsiteUrl'
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
	  'merchantName': {
	    template: '<match>Merchant API</match> (name):<% if(merchant.name) { %> <%= merchant.name %> <% } %>',
	    content: 'This is the content! 2',
	  },
	  'merchantId': {
	    template: '<match>Merchant API</match> (id): <% if(merchant.id) { %> <%= merchant.id %> <% } %>',
	    content: 'This is the content! 3',
	  },
	  'merchantImage': {
	    template: '<match>Merchant API</match> (logo): https://www.giveasyoulive.com/<% if(merchant.logo) { %> <%=merchant.logo %> <% } %>',
	    content: 'This is the content! 4',
	  },
	  'merchantStoreUrl': {
	    template: '<match>Merchant API </match><dim>(url)</dim>: https://www.giveasyoulive.com/store/<% if(merchant.uri) { %> <%=merchant.uri %> <% } %>',
	    content: 'This is the content! 5',
	  },
	  'causeName': {
	    template: '<match>Cause API</match> <dim>(name)</dim>: <% if(cause.name) { %> <%= cause.name %> <% } %>',
	    content: 'This is the content! 6',
	  },
	  'causeId': {
	    template: '<match>Cause API</match> <dim>(id)</dim>:<% if(cause.id) { %> <%= cause.id %> <% } %>',
	    content: 'This is the content! 7',
	  },
	  'causeImage': {
	    template: '<match>Cause API</match>: <% if(cause.image) { %> <%= cause.image %> <% } %>',
	    content: 'This is the content! 8',
	  },
	  'causeJoinUrl': {
	    template: '<match>Cause API</match> (url): <% if(cause.url) { %> <%= cause.url %> <% } %>',
	    content: 'This is the content! 9',
	  },
	  'causeWebsiteUrl': {
	    template: '<match>Cause API</match> (seo): <% if(cause.seo) { %> <%= cause.seo %> <% } %>',
	    content: 'This is the content! 10',
	  }
	}
};
