define([
    "fbSdk",
    "EventTarget"
], 

function (FbJsSdk) 
{

    // ---------------------------------------------------------------
    //
    // SOCIAL
    //
    // ---------------------------------------------------------------
    /*
        // FACEBOOK META EXAMPLE
        <meta property="og:type" content="website"> 
        <meta property="og:url" content=""> 
        <meta property="og:image" content="">    
        <meta property="og:title" content="">
        <meta property="og:description" content="">
     */
    var Social = function (appID, channelUrl)
    {
        var self = this;  

        // social data
        this.social =
        {          
            facebookAppId : appID,
            channelUrl    : channelUrl // get this from data-hostUrl
        }; 

        this.oFB = null;
        this.fbAccessToken = null;
        this.fbUserId = null;

        this.init();
    };   
   
    Social.prototype =     
    {
         
        // --------------------------------------------------------------
        // METHODS
        // --------------------------------------------------------------

        // ______________________________________________________________
        //                                                           init
        init: function()
        {                          
            this.assignListeners(); 
            this.initFacebook();   
        },

        // ______________________________________________________________
        //                                                assignListeners
        assignListeners: function()
        {
            var self = this;    

            // fb login status
            window.tEvent.addListener("FB_INIT", function(evt, data)
            {        
                self.oFB = data;
            });

        }, 

        // --------------------------------------------------------------
        // SOCIAL
        // --------------------------------------------------------------
        
        // ______________________________________________________________
        //                                                   initFacebook     
        initFacebook: function()
        {
            console.log(" * <social.initFacebook> appId: ", this.social.facebookAppId, "channelUrl: ", this.social.channelUrl);
            this.fbSdk = new FbJsSdk(this.social.facebookAppId, this.social.channelUrl);
        },

        // ______________________________________________________________
        //                                                onFacebookLogin
        onFacebookLogin: function(callback)
        {
            var self = this;           

           this.oFb.login(function(response) 
            {
                console.log(" * <social.onFacebookClick> oFb.login:", response);

                if (response.authResponse) 
                {
                    self.fbAccessToken = response.authResponse.accessToken;
                    self.fbUserId = response.authResponse.userID;
                    
                    // call service getAccessFacebookToken the result from this service will tell you if they have 
                    // an account or not
                    callback(response);
                } 

            }, {scope: 'email,user_about_me,user_location'});

        },


        // ______________________________________________________________
        //                                                    fbGetStatus     
        fbGetStatus: function()
        { 
            this.fbSdk.getStatus();
        }, 

        // ______________________________________________________________
        //                                                    fbGetMyData     
        fbGetMyData: function()
        { 
            this.oFB.api('/me', function(response) 
            {
                console.log(" * <social.fbGetMyData>", response);
                return(response);
            });
        },


        // ______________________________________________________________
        //                                                  facebookPopUp
        /*
        var fbModel = 
            {
                title: "My Title",
                description: "My Description",
                link: "http://www.google.com/",
                imgUrl: "http://www.google.com/logos/2013/ella_fitzgeralds_96th_birthday-1212009-hp.jpg"

            }

            this.social.facebookPopUp(fbModel, function()
            {
                console.log("facebookPopUp - GOT IT!");
                // pop up is going through but the API is not working
            }); 
         */                                                      
        facebookPopUp: function(activeModel, callback)
        {       
            var publish = 
            {
                method      : 'feed',
                name        : activeModel.title,                
                description : activeModel.description,
                link        : activeModel.link, // link on the title
                picture     : activeModel.imgUrl // min: 50x50, recommended: 200px x 200px
                //caption   : 'The Facebook Connect JavaScript SDK',
                /* actions: 
                [
                    { name: 'fbrell', link: 'http://www.fbrell.com/' } // link next to Like and Connect
                ],*/
                //user_message_prompt: 'Share your thoughts about RELL'
            };

            FB.ui(publish, callback);
      
        },

        // ______________________________________________________________
        //                                                   twitterPopUp     
        twitterPopUp: function(activeModel)
        {  
            var url = this.social.url;
            var title = activeModel.title;

            // encode data
            url = encodeURIComponent(url);    
            title = encodeURIComponent(title);           

            var myText = "http://twitter.com/share?url=" + url + "&text=" + title;     

            var width  = 575,
                height = 400,
                left   = ($(window).width()  - width)  / 2,
                top    = ($(window).height() - height) / 2,               
                twopts = 'status=1' +
                         ',width='  + width  +
                         ',height=' + height +
                         ',top='    + top    +
                         ',left='   + left;
                
            window.open(myText, 'twitter', twopts);          
        },


        // ______________________________________________________________
        //                                                 pinterestPopUp     
        pinterestPopUp: function(activeModel)
        { 
     
            var link = encodeURIComponent(activeModel.link);
            var desc = encodeURIComponent(activeModel.description);
            var img = encodeURIComponent(activeModel.imgUrl);
            var url = "http://pinterest.com/pin/create/button/?url=" + link + "&media=" + img + "&description=" + desc;
            window.open(url, "_blank"); 
        }


        // --------------------------------------------------------------
        // HELPERS
        // --------------------------------------------------------------        


        // --------------------------------------------------------------
        // EVENTS
        // --------------------------------------------------------------      
        

    };
    return (Social); 

});