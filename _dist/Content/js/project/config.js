// Set the require.js configuration for your application.
require.config(
{
	paths: 
	{
		// folders          
		modules      : "modules",
		common       : "common",
		libs         : "../libs",

		// special
		Json         : "json/json-compiled", // window.oJson
		Templates    : "templates/templates-compiled", // window.oTemplates

		// libs
		spearfishHelpers : "../libs/spearfish.helpers",         
		gsCSSPlugin      : "../libs/greensock/plugins/CSSPlugin.min",
		gsTweenLite      : "../libs/greensock/TweenLite.min",   
		fbSdk            : "../libs/fb-js-sdk",   
		EventTarget      : "../libs/EventTarget",   
		modernizr        : "../libs/modernizr-2.6.2.min",   
		dot              : "../libs/doT",   
		notify           : "../libs/notify",
		validate         : "../libs/validate",
		videojs          : "../libs/video",
		bootstrap        : "../libs/bootstrap",
		hammer           : "../libs/hammer.min",
		jHammer          : "../libs/jquery.hammer",
		jquery           : "../libs/jquery"
	},

	shim: 
	{
		'jquery':
		{
			exports: "$"
		},
		
		'bootstrap': 
		{       
			deps: ['jquery']           
		},

		'jHammer':
		{
			deps: ['jquery', 'hammer'] 
		},



		'common/model':
		{
			deps: ['jquery'] 
		},

		'common/services':
		{
			deps: ['jquery'] 
		},

		'hammer': 
		{       
			deps: ['jquery']           
		},

		"modules/smoothScroll":
		{       
			deps: ['jquery']           
		},

		"common/router":
		{
			deps: ["spearfishHelpers", 
					"common/model",
					"globalNav",
					"index",
					"testimonials",		
					"portfolio",		
					"about",		
					"contact"	]
		}
	},

	// Initialize the application with the main application file
	deps: [     
		"jquery",
		"EventTarget",
		"Templates",
		"gsCSSPlugin",
		"gsTweenLite",
		"spearfishHelpers",

		//"notify",
		//"bootstrap",
		//"jHammer",		
		
		"globalNav",
		"index",
		"testimonials",		
		"portfolio",		
		"about",		
		//"contact",	

		"common/router" // keep last	
	]


});
