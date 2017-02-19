define([
    "common/forms"  
], 

function (forms)
{   
    // ---------------------------------------------------------------
    //
    //REGISTRATION CONTACT
    //
    // ---------------------------------------------------------------

    var constructor = function ()
    {
       
        this.oForms = forms;
    };

    var methods =
    {    
        // --------------------------------------------------------------
        // METHODS
        // --------------------------------------------------------------
                
        // ______________________________________________________________
        //                                                assignListeners
        assignListeners: function()
        {           
            var self = this;
        }
      
        /*// ______________________________________________________________
        //                                                          login
        login: function (callback)
        {  
            var self = this;   

            // hide error box
            this.oForms.prepareFormSubmit();

            // using the serialize method
            // var formData = $("#registration-contact").serializeArray();            
            // formData = window.helpers.deserializeArray(formData);

            var formData = 
            {
                email            : $("#email").val(),               
                password         : encodeURIComponent($("#password-login").val())              
            };

            var validateList = 
            [
                {
                    name: 'email',
                    display: 'Email',
                    rules: 'required|valid_email'
                },
                {
                    name: 'password',
                    display: 'Password',
                    rules: 'required'
                }
            ];

            this.oForms.validateForm(
            {   
                formName     : "form-login", 
                validateList : validateList, 
                callback     : function()
                {
                    // call service
                    self.oForms.oServices.login(formData, function(results)
                    {
                        self.oForms.showSubmitError(results);
                        callback(results);
                    });
                }
            });
        }
*/
     

        // --------------------------------------------------------------
        // EVENTS
        // --------------------------------------------------------------



    };


    var Class = constructor;
    Class.prototype = methods;

    var instance = new Class();
    
    return (instance);      
   
});