/*
	How To use:

	In page object call this function passing in the form name that you wish to be 'listened' to.
	// init validation
    this.oForms.initOnBlurValidation("profile-email);


    Page Form Object Example:
    // ______________________________________________________________
    //                                                     updateUser
    updateUser: function (callback)
    {
        var self = this;   

        // hide error box
        this.oForms.prepareFormSubmit();

        // get values
        var formData = $("#profile-email").serializeArray();            
        formData = window.helpers.deserializeArray(formData);

        // validation
        var formName = "profile-email";
        var validateList = this.oForms.getFormValidationList(formName);

        this.oForms.validateForm(
        {   
            formName     : formName, 
            validateList : validateList, 
            callback     : function()
            {
                 // call service
                self.oForms.oServices.updateUser(formData, function(results)
                {
                    self.oForms.showSubmitError(results, "#profile-email");
                    callback(results);
                });
            }
        });

    },

*/

define([
	"common/model",  
	"common/services",  
	"validate"
], 

function (model, services) 
{
	// ---------------------------------------------------------------
	//
	// FORMS
	//
	// ---------------------------------------------------------------
	var constructor = function()
	{
		console.log(" * <forms>");

		var self = this;

		// core objects
		this.oModel = model;
		this.oServices = services;

		this.STR_ERROR_FIELDS       = "Please complete the fields highlighted above.";
		this.STR_ERROR_SUBMISSION   = "Your form is not complete.  Please update the missing fields.";
		this.STR_SUBMISSION_SUCCESS = "Your submission was successful.";

		this.CSS_COLOR_ERROR  = "red";
		this.CSS_COLOR_NORMAL = "#a09ba1";

		this.CLASS_ERROR_BOX   = ".error-box";
		this.CLASS_ERROR_MSG   = ".error-msg";
		this.CLASS_ERROR_FIELD = ".error-field";
		this.CLASS_LOADING     = ".loading";
		this.CLASS_FORM_LABEL  = ".form-label"; 
		this.CLASS_FORM_SUBMIT = ".form-submit-button";


		this.init();
	};
	
	var methods =
	{

		// ______________________________________________________________
		//                                                           init
		init: function()
		{
			this.assignListeners();
		},

		// ______________________________________________________________
		//                                                assignListeners
		assignListeners: function()
		{
			// custom checkboxes          
			$("body").on("click", ".checkbox", function(event) 
			{
				if ($(this).attr("data-value") === "checked")
				{
					$(this).val("");
					$(this).siblings("input[type='checkbox']").prop('checked', false); 
				}
				else
				{
					$(this).val("checked");
					$(this).siblings("input[type='checkbox']").prop('checked', true); 
				}
				$(this).attr("data-value", $(this).val());  
				$(this).siblings(".form-label-checkbox").attr("data-value", $(this).val());
			});
		},

		// --------------------------------------------------------------
		// HELPERS
		// --------------------------------------------------------------
		
		// ______________________________________________________________
		//                                                   showErrorMsg
		showErrorMsg: function (errorList, msg, parent, isInline)
		{
			console.log(" * <forms.showErrorMsg> ", errorList); 
			
			var self = this;        
			
			// get parent
			if (parent === undefined) 
			{
				parent = "";
			}
			else
			{
				parent = "[name='" + parent + "']";
			}

			var trackingErrorList = [];

			for (var i = 0; i < errorList.length; i++)
			{
				// input red outline
				$("#" + errorList[i].id, parent).addClass("error-field");

				//field error message
				$("#" + errorList[i].id, parent).siblings(".error-msg").html(errorList[i].message).css("display", "block");

				//add to tracking list
				trackingErrorList.push(errorList[i].name);                        
			}

			if (!isInline)
			{
				if (errorList.length > 0)
				{
					msg = self.STR_ERROR_SUBMISSION;                
				}

				var pErrorMsg = $(self.CLASS_ERROR_BOX, parent);
				pErrorMsg.css("display", "block");
				pErrorMsg.html(msg);
			}

			this.formReset();
		},

		// ______________________________________________________________
		//                                                showSubmitError
		showSubmitError: function (data, parent)
		{           
			var result = false;         

			if (parent === undefined) parent = "";

			this.formReset();
			if (data.error !== null && data.error !== "")
			{
				result = true;
				$(this.CLASS_ERROR_BOX, parent).html(data.error).css("display", "block");
			}
			else
			{
				$(this.CLASS_ERROR_BOX, parent).html(this.STR_SUBMISSION_SUCCESS).css("display", "block");
			}
			return (result);
		},

		// ______________________________________________________________
		//                                              prepareFormSubmit
		prepareFormSubmit: function (parent)
		{
			if (parent === undefined) parent = "";

			// hide submit button
			$(this.CLASS_FORM_SUBMIT, parent).css("display", "none");

			//show loading icon
			$(this.CLASS_LOADING, parent).css("display", "block");

			// clear error fields
			$(this.CLASS_ERROR_MSG, parent).css("display", "none");
			$(this.CLASS_ERROR_FIELD, parent).removeClass("error-field");
			$(this.CLASS_ERROR_BOX, parent).css("display", "none");
		},


		// ______________________________________________________________
		//                                                      formReset
		formReset: function (parent)
		{
			if (parent === undefined) parent = "";
			
			// hide submit button
			$(this.CLASS_FORM_SUBMIT, parent).css("display", "block");

			//show loading icon
			$(this.CLASS_LOADING, parent).css("display", "none");
		},

		// ______________________________________________________________
		//                                                 setCustomRules
		setCustomRules: function (validator)
		{
			var self = this;

			// require at least one number in password
			validator.registerCallback('check_password', function(value) 
			{               
				if (/\d+/.test(value)) 
				{                   
					return true;
				}
				return false;
			});
			validator.setMessage('check_password', 'Please choose a stronger password using at least 1 number.');



			// Disallow anything other than an alpabetic character
			validator.registerCallback('check_alphaspaceonly', function(value)
			{
				value = value || '';
				return !!value.match(/^[a-zA-Z ]+$/);
			});
			validator.setMessage('check_alphaspaceonly', 'You must use only alphabetic characters and spaces.');
			


			// Email validation
			validator.registerCallback('check_email', function(value)
			{
				var re = /\S+@\S+\.\S+/;
				return re.test(value);
			});
			validator.setMessage('check_email', 'You must use a valid email address.');


			// Phone validation
			validator.registerCallback('check_phone', function(value)
			{
				var str = self.extractPhoneNumber(value);

				// count string
				var isValid = false;
				if (str.length === 10)
					isValid = true;

				return (isValid);
			});
			validator.setMessage('check_phone', 'You must provide a valid 10 digit phone number.');

			return(validator);
		},

		// ______________________________________________________________
		//                                             extractPhoneNumber
		extractPhoneNumber: function (str)
		{
			// get numbers only
			str = str.replace(/[^0-9]/g, '');

			// remove 0 and 1
			if (str.charAt(0) === "0" || str.charAt(0) === "1")
			{
				str = str.substring(1);
			}
			
			return(str);
		},

		// ______________________________________________________________
		//                                                   validateForm
		validateForm: function (arg)
		{
			var self = this;

			// validate
			var validator = new FormValidator(arg.formName, arg.validateList, function(errors, event) 
			{  
				// hide  loading
				self.formReset();
				
				if (errors.length > 0) 
				{
					// show error message
					self.showErrorMsg(errors, errors[0].message, arg.formName, arg.inlineValidation);                 
				}       
				else
				{
					arg.callback();
				}        
			});
			this.setCustomRules(validator);
			validator._validateForm();
		},


		// ______________________________________________________________
		//                                          getFormValidationList
		getFormValidationList: function (formName)
		{
			var validateList = [];

			$("input", "[name='" + formName + "']").each(function()
            {
                if ($(this).attr("data-rules"))
                {
                    validateList.push(
                    {
                        name    : $(this).attr("name"),
                        display : $(this).attr("data-display"),
                        rules   : $(this).attr("data-rules")
                    });
                }
            });

            return(validateList);
		},

		// ______________________________________________________________
		//                                           initOnBlurValidation
		initOnBlurValidation: function (formName)
		{
			var self = this,
                temp,
                validateList = [];

            // create listeners for form input blur events
            $("input", "[name='" + formName + "']").each(function()
            {
                if ($(this).attr("data-rules"))
                {
                    $(this).blur(function()
                    {

                        validateList = 
                        [{ 
                            name    : $(this).attr("name"),
                            display : $(this).attr("data-display"),
                            rules   : $(this).attr("data-rules")
                        }];
                        
                        // add any dependencies
                        if ($(this).attr("data-dependency"))
                        {
                            temp = $("input[name='" + $(this).attr("data-dependency") + "']", "[name='" + formName + "']");
                            validateList.push(
                            {
                                name    : temp.attr("name"),
                                display : temp.attr("data-display"),
                                rules   : temp.attr("data-rules")
                            });
                        }

                        // clear existing error identifier
                        for (var i = 0; i < validateList.length; i++)
                        {
                            temp = $("input[name='" + validateList[i].name + "']", "[name='" + formName + "']");
                            temp.removeClass("error-field");
                            temp.siblings(".error-msg").html("");
                        }

                        // do validation
                        self.validateForm(
                        {   
							inlineValidation : true,
							formName         : formName, 
							validateList     : validateList, 
							callback         : function(e){}
                        });
                    });
                }
            });
		}
				
		// --------------------------------------------------------------
		// EVENTS
		// --------------------------------------------------------------
		
	};
	
	var Class = constructor;
	Class.prototype = methods;

	var instance = new Class();
	
	return (instance);

});
