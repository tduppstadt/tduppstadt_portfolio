define([ 
],

function () 
{
	var extendClass = function(Services)
	{ 
		// ---------------------------------------------------------------  
		// LOGIN SERVICES        
		// ---------------------------------------------------------------
		$.extend(Services,
		{	

			/*// ______________________________________________________________
			//                                                     createUser
			createUser: function(formData, callback) 
			{   
				$.ajax(
				{
					type     : "POST",
					url      : this.serviceUrl + "api/users/",
					async    : true,
					data     : formData,
					dataType : "json",
					success  : function(results)
					{
						console.log(" * <serviceLogin.createUser>", results);
						callback(results);
					},
					error: function (x, a, t) 
					{
						console.log(x, a, t);           
					}
				});
			}*/
			
		});

	};

	return(extendClass);
});
