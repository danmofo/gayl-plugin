module.exports = {
	TEMPLATE_START_TAG: '{',
	TEMPLATE_END_TAG: '}',
	API_TYPES: {
	  MERCHANT: 'merchant',
	  CAUSE: 'cause',
	  UNIVERSAL: 'all'
	},
	// These are the only two endpoints with CORS enabled
	ENDPOINTS: {
	  merchant: 'https://www.giveasyoulive.com/merchants/select',
	  cause: 'https://workwithus.giveasyoulive.com/charity/select',
	},
	TEMPLATES:  {
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
	}
};