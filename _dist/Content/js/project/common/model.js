define([
    "spearfishHelpers"
], 

function (helpers) 
{

    // ---------------------------------------------------------------
    //
    // Model
    //
    // ---------------------------------------------------------------
   
    var constructor = function ()
    {   
        // events
        window.tEvent.eventStr.EVENT_JSON_LOADED = "EVENT_JSON_LOADED";

        // page events
        window.tEvent.eventStr.EVENT_NEW_PAGE          = "EVENT_NEW_PAGE";
        window.tEvent.eventStr.EVENT_PAGE_LOADED       = "EVENT_PAGE_LOADED";
        window.tEvent.eventStr.EVENT_RETRY_ANCHOR      = "EVENT_RETRY_ANCHOR";

        window.tEvent.eventStr.EVENT_LOAD_INDEX        = "EVENT_LOAD_INDEX";
        window.tEvent.eventStr.EVENT_LOAD_TESTIMONIALS = "EVENT_LOAD_TESTIMONIALS";
        window.tEvent.eventStr.EVENT_LOAD_DEVELOPMENT  = "EVENT_LOAD_DEVELOPMENT";
        window.tEvent.eventStr.EVENT_LOAD_ABOUT        = "EVENT_LOAD_ABOUT";
        window.tEvent.eventStr.EVENT_LOAD_CONTACT      = "EVENT_LOAD_CONTACT";
        window.tEvent.eventStr.EVENT_LOAD_DESIGN       = "EVENT_LOAD_DESIGN";
        

        // useful
        this.queryString = window.helpers.parseQuerystring();     

        // debug mode   
        this.debugMode = false;
        if (this.queryString.lbxdebug && this.queryString.lbxdebug === "1") this.debugMode = true; 

        this.jConfig = {};



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
            this.loadJson();
        },

        // ______________________________________________________________
        //                                                assignListeners
        assignListeners: function()
        {
            var self = this;

        }, 

        // ______________________________________________________________
        //                                                       loadJson
        loadJson: function()
        {
            var self = this;
            $.getJSON($("[data-json]").attr("data-json"), function(data)
            {   
                self.jConfig = data;
                self.manageEnv();
                window.tEvent.fire(window.tEvent.eventStr.EVENT_JSON_LOADED, data);
                
                console.log(" * <Model.loadJson>", data); 
            });    

        },

        // ______________________________________________________________
        //                                                      manageEnv
        manageEnv: function()
        {            
            // get environment
            var env = this.jConfig.environment;
            
            var targetEnv;
            if (document.URL.indexOf(env.development.url) != -1)
            {
                console.log(" * <model.manageEnv> using development environment");
                targetEnv = "development";
            }
            else if (document.URL.indexOf(env.stage.url) != -1)
            {
                console.log(" * <model.manageEnv> using stage environment");
                targetEnv = "stage";
            }
            else if (document.URL.indexOf(env.production.url) != -1)
            {
                console.log(" * <model.manageEnv> using production environment");
                targetEnv = "production";
            }
            else if (document.URL.indexOf(env.local.url) != -1)
            {
                console.log(" * <model.manageEnv> using local environment");
                targetEnv = "local";
            }
            else
            {                    
                console.warn("current Url:", document.URL, " does not match environment params in config file. Fallback to development settings");
                targetEnv = "local";
            }

            // block console log for production                   
            if (targetEnv === "production")
            {                        
                if (!this.debugMode)
                {            
                    console = 
                    {           
                        log   :function(){},
                        warn  :function(){},
                        error :function(){},
                        trace :function(){}
                    };
                }
                                 
            }

        }


        // --------------------------------------------------------------
        // HELPERS
        // --------------------------------------------------------------
       

        // --------------------------------------------------------------
        // EVENTS
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