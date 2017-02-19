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
    
    return (instance);  
});