define([
    "common/view"
], 

function (view)
{

    // ---------------------------------------------------------------
    //
    // PAGE ABOUT
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
            console.log(" * <about>");
            
            this.registerPage();
            this.assignListeners();
        },

        // ______________________________________________________________
        //                                                   registerPage
        registerPage: function()
        {  
            var evtStr = "EVENT_LOAD_ABOUT";
            this.oView.registerPage({
                events: [evtStr],
                routes: {
                    about: {
                        hashString : "about",
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

            window.tEvent.addListener(window.tEvent.eventStr.EVENT_LOAD_ABOUT, function(evt, data)
            {
                self.onPageLoad(data);   
            }); 


            window.tEvent.addListener(window.tEvent.eventStr.EVENT_NEW_PAGE, function(evt, data)
            {
                // clean up for new page
                self.onCleanUp();
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
        onPageLoad: function(data)
        {   
            console.log(" * <about.onPageLoad>");
            this.oView.loadPageTemplate(window.oTemplates.p_about());

        },

        // ______________________________________________________________
        //                                                     onCleanUp
        // clean up when new page is loaded.
        onCleanUp: function()
        {   

        }

    };

    var Class = constr;
    Class.prototype = inheritObj;
    
    var instance = new Class();
    
    return (instance);     
   
});