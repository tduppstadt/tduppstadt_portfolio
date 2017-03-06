define([
    "modules/hash",
    "common/view"  
], 

function (hash, view)
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
        this.oHash = hash;
        this.ui = {
            anchor: ".anchor-trigger"
        };


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
            this.hashCheck();
        },


        // ______________________________________________________________
        //                                                assignListeners
        assignListeners: function()
        {           
            var self = this;

            // new page action
            window.tEvent.addListener( window.tEvent.eventStr.EVENT_NEW_PAGE, function(evt, data)
            {   
                // close panels, modals
                self.onUpdateNav(data);
            });


            window.tEvent.addListener(window.tEvent.eventStr.EVENT_PAGE_LOADED, function(evt, data)
            {
                setTimeout(function(){ self.hashCheck(); }, 300);
            });

            window.tEvent.addListener(window.tEvent.eventStr.EVENT_RETRY_ANCHOR, function(evt, data)
            {
                setTimeout(function(){ self.hashCheck(); }, 300);
            });

            // add anchor click to the hash
            $("body").on("click", this.ui.anchor, function(){
                var anchor = $(this).attr("data-anchor");
                var myHash = location.hash.split("#")[1].split(";")[0];
                myHash += ";anchor=" + anchor;
                self.oHash.setHash(myHash);

                self.onScrollToAnchor(anchor);
            });

            /*
            window.tEvent.addListener("FB_INIT", function(evt, data)
            {
                self.oFB = data;
            });
            */
        },

        


        // --------------------------------------------------------------
        // HELPERS
        // --------------------------------------------------------------
        // ______________________________________________________________
        //                                                      hashCheck
        hashCheck: function()
        {
            var hashObj = this.oHash.parseHashObj();
            if (hashObj.anchor){
                this.onScrollToAnchor(hashObj.anchor);
            }

        },

        // --------------------------------------------------------------
        // EVENTS
        // --------------------------------------------------------------
        // ______________________________________________________________
        //                                                    onUpdateNav
        onUpdateNav: function(data)
        {
            var self = this;

            // if no hash set home page button active
            if (data.page === "") {
                data.page = "default";
            }

            $(".js-nav-button").each(function(){
                $(this).removeClass("active");
                if (data.page === $(this).attr("data-id")) {
                    $(this).addClass("active");
                } 
            });
        },

        // ______________________________________________________________
        //                                               onScrollToAnchor
        onScrollToAnchor: function(anchorName)
        {
            var target = $('[name=' + anchorName + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 40
                }, 1000);
                return false;
            }
        }

    };

    var Class = constructor;
    Class.prototype = methods;
    
    var instance = new Class();
    
    return (Class);        
   
});