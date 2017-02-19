define([
	"services/services_login"
], 

function (serviceLogin)
{

	// ---------------------------------------------------------------
	//
	// SERVICES
	//
	// ---------------------------------------------------------------

	var Services = function()
	{       
		this.init();
	};

	Services.prototype =
	{    
		// --------------------------------------------------------------
		// METHODS
		// --------------------------------------------------------------
		
		// ______________________________________________________________
		//                                                           init
		init: function()
		{           
			console.log(" * <services>");
	
			this.assignListeners();

			// extend class
			serviceLogin(this);
		},

		// ______________________________________________________________
		//                                                assignListeners
		assignListeners: function()
		{          
			var self = this;

			/*
			window.tEvent.addListener("FB_INIT", function(evt, data)
			{
				self.oFB = data;
			});
			*/
		}


		// --------------------------------------------------------------
		// HELPERS
		// --------------------------------------------------------------


		// --------------------------------------------------------------
		// EVENTS
		// --------------------------------------------------------------


	};

	var oServices = new Services();	
	return (oServices);      
   
});