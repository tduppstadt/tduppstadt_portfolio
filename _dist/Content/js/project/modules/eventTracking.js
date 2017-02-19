define(["EventTarget"], 

function () 
{

    // ---------------------------------------------------------------
    //
    // TRACKING
    //
    // ---------------------------------------------------------------
    
    /*  
        // USAGE:
        // --------------- Call from anywhere when you are ready to init tracking ('isDebugging' is optional)

        // this call is for standard first page, Event 1
        window.tEvent.fire(window.tEvent.eventStr.TRACKING_INIT_CHECK, {isDebugging:true}); 


        // this is for subpage callbacks (param can also be an array)
        window.tEvent.fire(window.tEvent.eventStr.TRACKING_INIT_CHECK, 
        {
            isDebugging : true,
            callback    : function()
            { 
                window.tEvent.fire(window.tEvent.eventStr.GENERIC_TRACKING_CALL, 
                {
                    id: "5", 
                    param: "My second callback!"
                });
            }
        });



        // --------------- Call from anywhere for a generic tracking call(param can also be an array)
        window.tEvent.fire(window.tEvent.eventStr.GENERIC_TRACKING_CALL, 
        {
            id: "12", 
            param: "my parameter"
        });


        // same as
        omnitureLbox.lbxEvent12("my parameter");
    */
   

    var Tracking = function ()
    {
        this.createEventSystem ();   
    };   
   
    Tracking.prototype =     
    {   
        // ______________________________________________________________
        //                                                           init
        createEventSystem: function()
        {            
            // declare tracking event Strings
            window.tEvent.eventStr.TRACKING_INIT_CHECK   = "TRACKING_INIT_CHECK"; // my check to see if tracking is ready
            window.tEvent.eventStr.TRACKING_READY        = "TRACKING_READY"; // frank sends when tracking is ready
            window.tEvent.eventStr.TRACKING_INIT         = "TRACKING_INIT"; // my call to init tracking       
            window.tEvent.eventStr.GENERIC_TRACKING_CALL = "GENERIC_TRACKING_CALL"; // genereic tracking call

            // tracking init check
            var self = this;
            window.tEvent.addListener (window.tEvent.eventStr.TRACKING_INIT_CHECK, function(e, data)
            {                       
                self.onInitTracking(data);  
            });

        },

       
        // --------------------------------------------------------------
        // EVENTS
        // --------------------------------------------------------------
               
        // ______________________________________________________________
        //                                                 onInitTracking
        onInitTracking: function(oData)
        {
            console.log(" * <global-tracking.onInitTracking>");

            if (window.omnitureLbox === undefined || !window.omnitureLbox.trackingReady)
            {
                // waiting for response then trigger init
                window.tEvent.addListener(window.tEvent.eventStr.TRACKING_READY, function()
                {   
                    window.tEvent.fire(window.tEvent.eventStr.TRACKING_INIT, oData); 
                });
            }
            else
            {     
                // immediate dispatch cause we are ready
                window.tEvent.fire(window.tEvent.eventStr.TRACKING_INIT, oData);          
            }
        }

    };   

    var oTracking = new Tracking(); 

});