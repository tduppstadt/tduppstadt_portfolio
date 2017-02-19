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

    var constructor = function ()
    {
        console.log(" * <globalNav>");
        this.oView = view;

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
            this.assignListeners();            
        },


        // ______________________________________________________________
        //                                                assignListeners
        assignListeners: function()
        {           
            var self = this;

            /*
            window.tEvent.addListener("FB_INIT", function(evt, data)
            {
                self.oFB = data;
            });
            */
        }

        


        // --------------------------------------------------------------
        // HELPERS
        // --------------------------------------------------------------


        // --------------------------------------------------------------
        // EVENTS
        // --------------------------------------------------------------


    };

    var Class = constructor;
    Class.prototype = methods;
    
    var instance = new Class();
    
    return (Class);        
   
});