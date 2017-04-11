define([
    "common/view",
    "forms/form_login"  
], 

function (view, formLogin)
{

    // ---------------------------------------------------------------
    //
    // PAGE TESTIMONIALS
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
            console.log(" * <testimonials>");
            
            this.registerPage();
            this.assignListeners();
        },

        // ______________________________________________________________
        //                                                   registerPage
        registerPage: function()
        {  
            var evtStr = "EVENT_LOAD_TESTIMONIALS";
            this.oView.registerPage({
                events: [evtStr],
                routes: {
                    testimonials: {
                        hashString : "testimonials",
                        loadEvent  : evtStr
                    }
                }
            });
        },

        // ______________________________________________________________
        //                                                assignListeners
        assignListeners: function()
        {          
            var self = this;

            window.tEvent.addListener(window.tEvent.eventStr.EVENT_LOAD_TESTIMONIALS, function(evt)
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
            console.log(" * <testimonials.onPageLoad>");
            this.oView.loadPageTemplate(window.oTemplates.p_testimonials());
        }

    };

    var Class = constructor;
    Class.prototype = methods;
    
    var instance = new Class();
    
    return (Class);     
   
});