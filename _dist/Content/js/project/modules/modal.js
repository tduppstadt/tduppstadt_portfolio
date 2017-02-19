define([
    "gsCSSPlugin",
    "gsTweenLite"
], 

function () 
{

    // ---------------------------------------------------------------
    //
    // MODAL
    //
    // ---------------------------------------------------------------
    
    /*    
        // ----- USAGE 
        // INIT
        // init modal
        this.oModal.init({isTouch: false});
        self.oModal.onTriggerModal(
        {
            content :  "<div>hello</div>",
            css:
            {
                "width"      : "460px",
                "height"     : "390px",
                "margin-top" : "-200px"
            } 
        });
            

        // MARKUP
        <!-- MODAL -->
        <div id="modal-container">           
            <div id="modal"></div>
            <div id="modal-mask-overlay"></div>
        </div>
    */
   
    var Modal = function ()
    {
        var self = this;  
    
        this.TEMPLATE_CLOSE_BUTTON = "<a class='modal-close'>X</a>";      
        this.pModal              = $('#modal');
        this.pModalContainer     = $('#modal-container');
        this.pModalOverlay       = $('#modal-mask-overlay');
        this.modalCloseString    = 'a.modal-close';
        this.pModalClose = null;
    };   
   
    Modal.prototype =     
    {
         
        // --------------------------------------------------------------
        // METHODS
        // --------------------------------------------------------------

        // ______________________________________________________________
        //                                                           init
        init: function(config)
        {        
           
            this.assignListeners(); 
        },

        // ______________________________________________________________
        //                                                assignListeners
        assignListeners: function()
        {
            var self = this;    

            // resize modal bg to screen
            this.isMobile = 
            {
                Android: function() {
                    return navigator.userAgent.match(/Android/i);
                },
                BlackBerry: function() {
                    return navigator.userAgent.match(/BlackBerry/i);
                },
                iOS: function() {
                    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
                },
                Opera: function() {
                    return navigator.userAgent.match(/Opera Mini/i);
                },
                Windows: function() {
                    return navigator.userAgent.match(/IEMobile/i);
                },
                any: function() {
                    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
                }
            };  

            
            if (this.isMobile.iOS()) {} 
            else
            {
                $(window).resize(function () 
                { 
                    self.positionModal();
                });
            }

        }, 

        // --------------------------------------------------------------
        // HELPERS
        // --------------------------------------------------------------        
        /*
            config example:
            // show modal
            this.oModal.onTriggerModal(
            {
                content :  '<div>hello</div>',
                css:
                {
                    "width"      : "510px",
                    "height"     : "380px"
                },
                close: false 
            });
        */
        // ______________________________________________________________
        //                                                 onTriggerModal
        onTriggerModal: function(config)
        {       
            var content = config.content;

            var self = this;

            // set css   
            if (config.css)
            {    
                for(var propt in config.css)
                {
                    self.pModal.css(propt, config.css[propt]);                   
                }
            }

            // ------------ do close?
            var closeButtonHtml = "";

            // unbind close button
            if (this.pModalClose) this.pModalClose.unbind("click");
            this.pModalOverlay.unbind("click");

            if (config.close !== false || config.close === undefined)
            {            
                // get close button    
                closeButtonHtml = this.TEMPLATE_CLOSE_BUTTON;

                // Background overlay         
                this.pModalOverlay.bind("click", function () 
                {
                    TweenLite.to(self.pModalContainer, 0.3, {css:{autoAlpha:0}});
                });

            }
           

            // apply content
            this.pModal.html(content + closeButtonHtml);


            // assign close button listener  
            this.pModalClose = $('.modal-close', this.pModal);  
            if (this.pModalClose)
            {
                this.pModalClose.bind("click", function()
                {
                    self.close();
                });
            }                   

            // position modal 
            this.positionModal();

            // fade in
            this.pModalContainer.css("opacity", "0");
            this.pModalContainer.css("display", "block");
            TweenLite.to(this.pModalContainer, 0.3, {css:{autoAlpha:1}});
        },

        // ______________________________________________________________
        //                                                     closeModal
        close: function(emptyModalContent)
        {
            var self = this;
            TweenLite.to(self.pModalContainer, 0.3, {css:{autoAlpha:0}, onComplete: function()
            { 
                $(self.pModalContainer).css("display", "none");
                if(emptyModalContent)
                {
                    self.pModal.html("");
                }
            }});

            if (window.tEvent)
            {
                window.tEvent.fire("EVENT_MODAL_CLOSED");
            }            
        },

        // ______________________________________________________________
        //                                                  positionModal                                             
        positionModal: function()
        {   
            //var box        = pModalContainer.find('.window');
            var maskHeight = $(document).height();
            var maskWidth  = $(window).width();
            var winH       = $(window).height();
            var winW       = $(window).width();
        
            this.pModalOverlay.css({ 'width': maskWidth, 'height': maskHeight });       
            this.pModal.css('top', winH / 2 - this.pModal.height() / 2);
            this.pModal.css('left', winW / 2 - this.pModal.width() / 2);
        }




        // --------------------------------------------------------------
        // EVENTS
        // --------------------------------------------------------------      
        

    };
    
    var oModal = new Modal();    
    return (oModal); 

});