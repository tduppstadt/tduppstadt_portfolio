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

    var Class = constructor;
    Class.prototype = methods;
    
    var instance = new Class();
    
    return (Class);     
   
});