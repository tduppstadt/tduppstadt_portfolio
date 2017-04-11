define([

    "common/view",
    "forms/form_login"  
], 

function (view, formLogin)
{

    // ---------------------------------------------------------------
    //
    // PAGE DESIGN
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
            console.log(" * <design>");
            
            this.registerPage();
            this.assignListeners();
        },

        // ______________________________________________________________
        //                                                   registerPage
        registerPage: function()
        {  
            var evtStr = "EVENT_LOAD_DESIGN";
            this.oView.registerPage({
                events: [evtStr],
                routes: {
                    design: {
                        hashString : "design",
                        loadEvent  : evtStr
                    }
                }
            });
        },


        // ______________________________________________________________
        //                                                assignListeners
        assignListeners: function()
        {          
            var self = this;

            window.tEvent.addListener(window.tEvent.eventStr.EVENT_LOAD_DESIGN, function(evt, data)
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
            var self = this;
            console.log(" * <design.onPageLoad>");
            this.oView.loadPageTemplate(window.oTemplates.p_design());

            
            // notify when both galleries are loaded so 
            window.oNotify.registerTask({
                groupName: "Design_Galleries_Loaded",
                taskList: ["interface", "print"],             
                onDone: function(){                
                    window.tEvent.fire(window.tEvent.eventStr.EVENT_RETRY_ANCHOR);
                }
            });


            // interface gallery
            $(".interface-container").lightGallery({
                mode: 'lg-zoom-in-big',
                //cssEasing : 'cubic-bezier(0.25, 0, 0.25, 1)',
                preload: 2,
                download: false,
                hash: false
            }).justifiedGallery({
                rowHeight: 120,
                maxRowHeight: 120
            }).on('jg.complete', function (e) {
                window.oNotify.Design_Galleries_Loaded.update("interface");
            });


            // print gallery
            $(".print-container").lightGallery({
                mode: 'lg-zoom-in-big',
                //cssEasing : 'cubic-bezier(0.25, 0, 0.25, 1)',
                preload: 2,
                download: false,
                hash: false
            }).justifiedGallery({
                rowHeight: 120,
                maxRowHeight: 120
            }).on('jg.complete', function (e) {
                window.oNotify.Design_Galleries_Loaded.update("print");
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