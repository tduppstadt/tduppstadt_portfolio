define([
    "common/view"
], 

function (view)
{

    // ---------------------------------------------------------------
    //
    // PAGE TESTIMONIALS
    //
    // ---------------------------------------------------------------

    var constr = function ()
    {
        this.oView = view;

        this.init();
    };

    var inheritObj =
    {    
        // --------------------------------------------------------------
        // inheritObj
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

    var Class = constr;
    Class.prototype = inheritObj;
    
    var instance = new Class();
    
    return (instance);     
   
});