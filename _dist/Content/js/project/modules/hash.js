/*
    // Init Page View
    Each page view must first initialize their page by passing in their hash string and the hash event
    window._hash.pushHashEvent("about", "EVENT_PAGE_ABOUT_US");

    // Default Page
    If you have a page that you want to be used when no hash exists set the page as default.
    window._hash.pushHashEvent("default", "EVENT_PAGE_ABOUT_US");
    
    // Set Hash To Current Page
    Whenever the program navigates to this page via an event for example. The page will then declare to
    the hash that we are on the page. Use ';' to separate additional params
    window._hash.setHash("#page=about;id=4");

    // Actual Hash Change
    If there is an actual hash change, _hash will loop through the pageModel object and will
    look for #page=[hashStr]. If it is found it will call the associated event and pass with it the hash 
    object. So any other additional parameters can be accessed. IE '#page=about;id=4' will call the event
    for 'about' and the object passed through the event will be '{page: "about", id: "4"}';
    
*/
define([
], 
function () {

    // ---------------------------------------------------------------
    //
    // HASH
    //
    // ---------------------------------------------------------------
   
    var constructor = function ()
    {   
        console.log(" * <hash>");

        var self = this;

        this.pageModel = {};
        this.allowHash = true;

        /*
            // page model child
            about:
            {
                event: "EVENT_PAGE_ABOUT_US"
            }
        */
    };
       
    var methods =
    {
        // --------------------------------------------------------------
        // METHODS
        // --------------------------------------------------------------

        // ______________________________________________________________
        //                                                           init
        /*
            Every time the hash change is called the event "EVENT_NEW_PAGE"
            is called. So any page views can react to the page change.

            this.allowHash is used to control whether the hash 
            is being set or whether it is being called.
        */
        init: function()
        {
            var self = this;

            this.allowHash = true;

            
            $(window).bind('hashchange', function() {
                self.dohashchange();
            });

            /*
            $(window).bind('hashchange', function() {
            */
            this.dohashchange();
        },

        
        // ______________________________________________________________
        //                                                   dohashchange
        dohashchange: function()
        {
            // call hash event
            var hashObj = this.parseHashObj();

            // call event for a new page is coming
            window.tEvent.fire(window.tEvent.eventStr.EVENT_NEW_PAGE, hashObj);

            // check for allowing updates based on hash                
            if (!this.allowHash) 
            {
                this.allowHash = true;
                return;
            }                

            if (typeof this.pageModel[hashObj.page] !== "undefined" ){
                window.tEvent.fire(this.pageModel[hashObj.page].event, hashObj); 
            } else if (typeof this.pageModel.default !== "undefined"){
                window.tEvent.fire(this.pageModel.default.event, hashObj);
            } else {
                window.location.hash = "";
            }  
        },

        // --------------------------------------------------------------
        // HELPERS
        // --------------------------------------------------------------
        // ______________________________________________________________
        //                                                   parseHashObj
        /*
            Parse hash to create a workable object
            ie #page=blogger;id=1 
            will return
            {page:"blogger", id:"1"}
        */
        parseHashObj: function()
        {
            var hash = window.location.hash;

            if (hash === "") return ({page:""});

            var hashArray = hash.split("#")[1].split("?")[0].split(";");
            var hashObj = {};

            for (var i = 0; i < hashArray.length; i++)
            {
                if (hashArray[i].split("=")[1] === undefined){
                    hashObj.page = hashArray[i].split("=")[0];
                } else {
                    hashObj[hashArray[i].split("=")[0]] = hashArray[i].split("=")[1];
                }
                 
            }

            return (hashObj);
        },

        // ______________________________________________________________
        //                                                    processHash
        // Will return false if no hash is used. This can be used to determine
        // anothe course of action.
        processHash: function()
        {
            return(window.onhashchange());
        },

        // ______________________________________________________________
        //                                                         setHash
        setHash: function(str)
        {
            this.allowHash = false;
            location.hash = str;
            this.allowHash = true;
        },


        // --------------------------------------------------------------
        // EVENTS
        // --------------------------------------------------------------  

        // ______________________________________________________________
        //                                                  pushHashEvent
        pushHashEvent: function(hashStr, eventStr)
        {            
            this.pageModel[hashStr] = 
            {
                event: eventStr
            };
        }


    };

    var Class = constructor;
    Class.prototype = methods;
    var oHash = new Class();
    /*if (window._hash === undefined)
        window._hash = oHash;*/

    return (oHash);

});