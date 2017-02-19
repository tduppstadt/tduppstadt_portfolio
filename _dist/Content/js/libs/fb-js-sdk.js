define(
[
    "EventTarget"
], 

function () 
{
    // https://developers.facebook.com/docs/reference/javascript/
    /*    
        The channel file addresses some issues with cross-domain communications in certain browsers. The contents of the channel.html file can be just a single line:
        <script src="//connect.facebook.net/en_US/all.js"></script>
     */
    // ---------------------------------------------------------------
    //
    // FACEBOOK JAVASCRIPT SDK
    //
    // ---------------------------------------------------------------
    var FbJsSdk = function (appId, channelUrl)
    {
        this.appId        = appId;
        this.channelUrl   = channelUrl;

        window.tEvent.eventStr.FB_LOGIN_STATUS  = "FB_LOGIN_STATUS";
        window.tEvent.eventStr.FB_STATUS_CHANGE = "FB_STATUS_CHANGE";
        window.tEvent.eventStr.FB_INIT          = "FB_INIT";

        this.oFB = null;

        this.init();
    };

    FbJsSdk.prototype =     
    {
        // ______________________________________________________________
        //                                                           init
        init: function ()
        {
            var self = this;    
           
            window.fbAsyncInit = function() 
            {
                self.isInit = true;
                self.oFB = FB;

                // init the FB JS SDK
                FB.init(
                {
                    appId      : self.appId, // App ID from the App Dashboard
                    channelUrl : self.channelUrl, // Channel File for x-domain communication
                    status     : true, // check the login status upon init?
                    cookie     : true, // set sessions cookies to allow your server to access the session?
                    xfbml      : true  // parse XFBML tags on this page?
                });

                // turn on listeners
                self.activateListeners();                             
               
                // fire event for fb init
                window.tEvent.fire(window.tEvent.eventStr.FB_INIT, FB);

            };
            
            // Load the SDK's source Asynchronously
            // Note that the debug version is being actively developed and might 
            // contain some type checks that are overly strict. 
            // Please report such bugs using the bugs tool.
            (function(d)
            {
                var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
                if (d.getElementById(id)) {return;}
                js = d.createElement('script'); js.id = id; js.async = true;
                js.src = "//connect.facebook.net/en_US/all.js";
                ref.parentNode.insertBefore(js, ref);
            }(document));

        },


        // ______________________________________________________________
        //                                                          login
        //  https://developers.facebook.com/docs/reference/javascript/FB.api/   
        //  https://developers.facebook.com/docs/reference/login/#permissions                                                   
        login: function (redirectUrl, state, scope)
        {
           /* this.FB.login(function(response)     
            {
                if (response.authResponse) {
                    // connected
                    console.log("connected");
                } else {
                    // cancelled
                    console.log("cancelled");
                }
            });*/

            var myUrl = "https://www.facebook.com/dialog/oauth/?client_id=" + this.appId;             
                myUrl += "&redirect_uri=" + redirectUrl;
                myUrl += "&state=" + state;
                myUrl += "&scope=" + scope;

            window.open(myUrl, "_self");
        },


        // ______________________________________________________________
        //                                                   twitterPopUp
        activateListeners: function()
        {
            this.getStatus();

             // status change
            this.oFB.Event.subscribe('auth.statusChange', function(response)
            {
                window.tEvent.fire(window.tEvent.eventStr.FB_STATUS_CHANGE, response);
            });             
        },


        // ______________________________________________________________
        //                                                      getStatus
        getStatus: function()
        {
            // get init login status
            this.oFB.getLoginStatus(function(response) 
            {           
                window.tEvent.fire(window.tEvent.eventStr.FB_LOGIN_STATUS, response);               
            });
        },


        // ______________________________________________________________
        //                                                          getMe
        getMyData: function()
        {
            

        }
    };

    return(FbJsSdk);

});