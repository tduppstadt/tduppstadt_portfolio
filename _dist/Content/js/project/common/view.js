define([
    "common/model",
    "common/services"
],

function (model, services) 
{

    // ---------------------------------------------------------------
    //
    // GLOBAL VIEW
    //
    // ---------------------------------------------------------------
   
    var constructor = function()
    {
        console.log(" * <view>");

        var self = this;
        
        // core objects
        this.oModel    = model;   
        this.oServices = services; 

        this.$main = $("main"); 
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
            this.assignListeners();    
          
        },


        // ______________________________________________________________
        //                                                assignListeners
        assignListeners: function()
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
        //                                          loadPageFrameTemplate
        loadPageTemplate: function(template)
        {       
            this.$main.css("opacity", "0");
            this.$main.html(template);
            TweenLite.to(this.$main, 0.5, {opacity: 1});

            this.pageLoaded();
        },


        // ______________________________________________________________
        //                                                     pageLoaded
        pageLoaded: function()
        { 
            window.tEvent.fire(window.tEvent.eventStr.EVENT_PAGE_LOADED);
        }

    };

    var Class = constructor;
    Class.prototype = methods;

    var instance = new Class();
    
    return (instance);  
});