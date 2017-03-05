/*
    INSTRUCTIONS:

    For Single Page apps:
    Use the pageModel to organize the hash and event strings.
    NOTE: pre-instantiate your page classes

    For Multi Page apps:
    Use the loadActivePage method to instantiate the active page.
    NOTE: Do not instantiate your page classes, the router will do this as needed 
*/

define([
    "modules/hash",
    "common/model"
],

function (hash, model) 
{

    // ---------------------------------------------------------------
    //
    // ROUTER
    //
    // ---------------------------------------------------------------

    var Router = function()
    {       
        console.log(" * <router>");

        var self = this;

        // defined in data-page-structure
        this.PAGE_STRUCTURE_SINGLE = "single";
        this.PAGE_STRUCTURE_MULTI  = "multi";
        this.PAGE_STRUCTURE_HYBRID = "hybrid";

        // core objects
        this.oModel = model;     
        this.oHash = hash;

        this.oActivePage = {};

        this.initPageModel();

        this.init();  
    };

    Router.prototype =
    {

        // --------------------------------------------------------------
        // METHODS
        // --------------------------------------------------------------

        // ______________________________________________________________
        //                                                           init
        init: function()
        {   
            
            /* 
                Used for single page apps,
                Use pageModel to define hash strings and page load events
                this.initHash();
            
                Used for multi page apps,
                instantiate  the class based on html data-pageId
                this.loadActivePage();  
            */ 

            var structure = $("[data-page-structure]").attr("data-page-structure");
            console.log(" * <router.init> data-page-structure: " + structure);
            switch(structure)
            {
                case this.PAGE_STRUCTURE_SINGLE:  
                    this.oHash.init();     
                    break;

                case this.PAGE_STRUCTURE_MULTI:
                    this.loadActivePage();  
                    break;

                case this.PAGE_STRUCTURE_HYBRID:
                    this.loadActivePage(); 
                    break;  
            }


        },
        
        // ______________________________________________________________
        //                                                  initPageModel
        /* 
                Used for multi page apps,
                instantiate the class based on html data-page-id
        */
        initPageModel: function()
        {
            this.pageModel = 
            {
                page: {
                    index:
                    {
                        hashString : "default",
                        loadEvent  : window.tEvent.eventStr.EVENT_LOAD_INDEX
                    },

                    testimonials:
                    {
                        hashString : "testimonials",
                        loadEvent  : window.tEvent.eventStr.EVENT_LOAD_TESTIMONIALS
                    } ,

                    portfolio:
                    {
                        hashString : "portfolio",
                        loadEvent  : window.tEvent.eventStr.EVENT_LOAD_PORTFOLIO
                    },

                    about:
                    {
                        hashString : "about",
                        loadEvent  : window.tEvent.eventStr.EVENT_LOAD_ABOUT
                    },

                    contact:
                    {
                        hashString : "contact",
                        loadEvent  : window.tEvent.eventStr.EVENT_LOAD_CONTACT
                    }
                }
                
            };

            // give model page model ref            
            this.oModel.pageModel = this.pageModel;

            // register hash
            var temp;
            for (var key in this.pageModel.page) {
                temp = this.pageModel.page[key];
                this.oHash.pushHashEvent(temp.hashString, temp.loadEvent);
            }

            
        },




        // ______________________________________________________________
        //                                                 loadActivePage
        /* 
                Used for multi page apps,
                instantiate the class based on html data-page-id
        */
        loadActivePage: function()
        {
            // load the appropriate page based on data-page-id attribute and call init();
            var self = this;

            this.oActivePage = {};
            var pageId = $("script[data-page-id]").attr("data-page-id");


            console.log(" * <router.loadActivePage> " + pageId);

            switch(pageId)
            {
                // init index page
                case "index":
                    self.oActivePage = new PageIndex();           
                    break;
            }
        }




        // --------------------------------------------------------------
        // HELPERS
        // --------------------------------------------------------------        
       


        // --------------------------------------------------------------
        // EVENTS
        // --------------------------------------------------------------      
        

    };


    var oRouter = new Router();
    
    return (oRouter);
});