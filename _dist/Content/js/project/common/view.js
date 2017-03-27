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

        // check if initial load has been completed
        this.siteLoaded = false;

        this.$main = $("main"); 

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

            // thumb anim for light gallery items
            $("body").on('mouseenter','.lightgallery img',function() {
                TweenLite.to($(this), 0.5, {
                  scale: 1,
                  force3D:true,
                  ease: Power4.easeOut
                });
            }).on('mouseleave', '.lightgallery img', function() {
                TweenLite.to($(this), 0.5, {
                  scale: 0.85,
                  force3D:true,
                  ease: Power4.easeOut
                });
            });

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
            TweenLite.to(this.$main, 1, {opacity: 1});

            this.pageLoaded();
        },


        // ______________________________________________________________
        //                                                     pageLoaded
        pageLoaded: function()
        { 
            window.tEvent.fire(window.tEvent.eventStr.EVENT_PAGE_LOADED);

            if (!this.siteLoaded) {
                this.backgroundLoadCheck();                
            }            
        },

        // ______________________________________________________________
        //                                            backgroundLoadCheck
        backgroundLoadCheck: function()
        { 

            var self = this;

            // notify when background images are loaded 
            // then fade in interface
            window.oNotify.registerTask(
            {
                groupName: "MainBackgroundLoaded",
                taskList: ["canvas", "paper"],             
                onDone: function()
                {      
                    // will prevent this call again.
                    self.siteLoaded = true;

                    // clear the fail safe timeout
                    clearTimeout(timer);

                    // hide the loader
                    $(".js-global-loader").css("display", "none");

                    // reveal the interface
                    TweenLite.to($(".js-content"), 1, {
                      opacity: 1
                    });
                }
            });

            // fail safe in case the loaders fail.
            var timer = setTimeout(function(){ window.oNotify.MainBackgroundLoaded.onDone(); }, 5000);            

            // test load the bg images
            $('<img/>').load("Content/images/global/paper.jpg", function() {
               $(this).remove(); // prevent memory leaks
               window.oNotify.MainBackgroundLoaded.update("paper");
            });
            $('<img/>').load("Content/images/global/canvas.jpg", function() {
               $(this).remove(); // prevent memory leaks
               window.oNotify.MainBackgroundLoaded.update("canvas");
            });
        }

    };

    var Class = constructor;
    Class.prototype = methods;

    var instance = new Class();
    
    return (instance);  
});