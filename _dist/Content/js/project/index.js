define([
    "common/view" 
], 

function (view)
{

    // ---------------------------------------------------------------
    //
    // PAGE INDEX
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
            console.log(" * <index>");
            
            this.registerPage();
            this.assignListeners();
        },

        // ______________________________________________________________
        //                                                   registerPage
        registerPage: function()
        {  
            var evtStr = "EVENT_LOAD_INDEX";
            this.oView.registerPage({
                events: [evtStr],
                routes: {
                    index: {
                        hashString : "default",
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
            
            window.tEvent.addListener(window.tEvent.eventStr.EVENT_LOAD_INDEX, function(evt, data)
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
            console.log(" * <index.onPageLoad>");
            this.oView.loadPageTemplate(window.oTemplates.p_index());

            // design gallery
            $(".design-container").lightGallery({
                mode: 'lg-zoom-in-big',
                //cssEasing : 'cubic-bezier(0.25, 0, 0.25, 1)',
                preload: 2,
                download: false,
                hash: false
            }).justifiedGallery({
                rowHeight: 120,
                maxRowHeight: 120,
                lastRow: "justify"
            });

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