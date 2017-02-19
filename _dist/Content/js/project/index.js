define([
    "common/view",
    "forms/form_login"  
], 

function (view, formLogin)
{

    // ---------------------------------------------------------------
    //
    // PAGE INDEX
    //
    // ---------------------------------------------------------------

    var constructor = function ()
    {
        this.oView = view;

        this.oForm = formLogin;
        
        this.init();
    };

    var methods =
    {    
        // --------------------------------------------------------------
        // METHODS
        // --------------------------------------------------------------
        
        // ______________________________________________________________
        //                                                           init
        init: function()
        {           
            console.log(" * <index>");
         
            this.assignListeners();
        },


        // ______________________________________________________________
        //                                                assignListeners
        assignListeners: function()
        {          
            var self = this;

            window.tEvent.addListener(window.tEvent.eventStr.EVENT_LOAD_INDEX, function(evt)
            {
                self.onPageLoad();   
            });            
        },

        // ______________________________________________________________
        //                                         assignDynamicListeners
        assignDynamicListeners: function()
        {          
            var self = this;
        },

        


        // --------------------------------------------------------------
        // HELPERS
        // --------------------------------------------------------------


        // --------------------------------------------------------------
        // EVENTS
        // --------------------------------------------------------------
        // ______________________________________________________________
        //                                                     onPageLoad
        onPageLoad: function()
        {   
            console.log(" * <index.onPageLoad>");
        }

    };

    var Class = constructor;
    Class.prototype = methods;
    
    var instance = new Class();
    
    return (Class);     
   
});